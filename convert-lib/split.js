import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

async function splitJsonByType() {
  try {
    // 1. Load the data
    const dataPath = new URL('./output.json', import.meta.url);
    const rawData = await readFile(dataPath, 'utf-8');
    const allEntries = JSON.parse(rawData);

    // 2. Group entries by post_type
    const grouped = allEntries.reduce((acc, item) => {
      const type = item.post_type || 'other';
      if (!acc[type]) acc[type] = [];
      acc[type].push(item);
      return acc;
    }, {});

    // 3. Create output directory
    const outputDir = './organized_json';
    if (!existsSync(outputDir)) {
      await mkdir(outputDir);
    }

    // 4. Write files asynchronously
    const savePromises = Object.entries(grouped).map(([type, data]) => {
      const filePath = path.join(outputDir, `${type}.json`);
      return writeFile(filePath, JSON.stringify(data, null, 2));
    });

    await Promise.all(savePromises);
    
    console.log(`✅ Success! Created ${Object.keys(grouped).length} files in ${outputDir}`);
  } catch (err) {
    console.error('❌ Error processing JSON:', err.message);
  }
}

splitJsonByType();