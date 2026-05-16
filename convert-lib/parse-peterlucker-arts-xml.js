import fs from 'node:fs/promises';
import { XMLParser } from 'fast-xml-parser';

const options = {
    ignoreAttributes: false,
    parseTagValue: true, 
    trimValues: true,
    isArray: (tagName) => ['item', 'wp:postmeta', 'category'].includes(tagName)
};

/**
 * Transforms WordPress legacy content into clean HTML
 * Handles [caption] shortcodes, &nbsp;, and newlines
 */
function parseWordPressContent(content) {
    // Safety check: Ensure content is a string
    if (typeof content !== 'string') return "";

    const captionRegex = /\[caption[^\]]*\]([\s\S]*?)\[\/caption\]/g;

    return content
        // 1. Handle [caption] shortcodes[cite: 1, 2]
        .replace(captionRegex, (match, innerContent) => {
            const imgMatch = innerContent.match(/<img[^>]*\/>/);
            const imgTag = imgMatch ? imgMatch[0] : "";
            const captionText = innerContent.replace(imgTag, "").trim();

            return `
<figure class="wp-transformed-caption">
    ${imgTag}
    <figcaption>${captionText}</figcaption>
</figure>`.trim();
        })
        // 2. Turn non-breaking spaces into regular spaces
        .replace(/&nbsp;/g, ' ')
        // 3. Turn double new-lines (or more) into <br> tags
        .replace(/\n{2,}/g, '<br>')
        .trim();
}

async function convert() {
    try {
        const xmlData = await fs.readFile('export.xml', 'utf8');
        const parser = new XMLParser(options);
        const jsonObj = parser.parse(xmlData);

        const items = jsonObj.rss?.channel?.item || [];
        console.log(`Processing ${items.length} items from export.xml...`);

        const processedData = items.map(item => {
            const simplifiedMeta = {};
            const rawMeta = item['wp:postmeta'] || [];

            // Meta grouping logic[cite: 1, 2]
            rawMeta.forEach(meta => {
                const key = meta['wp:meta_key'];
                const value = meta['wp:meta_value'];
                if (key === undefined || value === undefined) return;

                if (Object.hasOwn(simplifiedMeta, key)) {
                    if (!Array.isArray(simplifiedMeta[key])) {
                        simplifiedMeta[key] = [simplifiedMeta[key]];
                    }
                    simplifiedMeta[key].push(value);
                } else {
                    simplifiedMeta[key] = value;
                }
            });

            const rawComments = item['wp:comment'] || [];
            const comments = rawComments.map(comment => ({
                id : comment['wp:comment_id'],
                author : comment['wp:comment_author'],
                email : comment['wp:comment_author_email'],
                url : comment['wp:comment_author_url'],
                ip : comment['wp:comment_author_IP'],
                date : comment['wp:comment_date'],
                date_gmt : comment['wp:comment_date_gmt'],
                content : comment['wp:comment_content'],
                approved : comment['wp:comment_approved'],
                type : comment['wp:comment_type'],
                arent : comment['wp:comment_parent'],
                user_id : comment['wp:comment_user_id']
            }));

            return {
                title: item.title,
                link: item.link,
                pubDate: item.pubDate,
                creator: item['dc:creator'],
                content: parseWordPressContent(item['content:encoded']),
                excerpt: item['excerpt:encoded'],
                post_id: item['wp:post_id'],
                post_date: item['wp:post_date'],
                post_name: item['wp:post_name'],
                status: item['wp:status'],
                post_type: item['wp:post_type'],
                categories: (item.category || []).map(cat => (typeof cat === 'object' ? cat['#text'] : cat)),
                meta: simplifiedMeta,
                comments: comments

            };
        });

        await fs.writeFile('output.json', JSON.stringify(processedData, null, 2));
        console.log("Success! Cleaned data saved to output.json");

    } catch (err) {
        console.error('Error:', err.message);
    }
}

convert();