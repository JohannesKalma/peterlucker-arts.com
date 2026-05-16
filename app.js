import express from 'express';
import httpError from 'http-errors';
import logger from 'morgan';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import debug from 'debug'
import { readFile } from 'node:fs/promises';
import { title } from 'node:process';

const app = express();
const port = process.env.PORT;

app.use(logger('combined'));

// Enable 'trust proxy' so Express looks at X-Forwarded-For headers
app.set('trust proxy', true);

// Set EJS as the template engine
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const viewsPath = path.join(__dirname, 'views');
app.set('views', viewsPath);
app.set('view engine', 'ejs');

// Serve static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public')));

const pageContent = async (postId) => {
  const data = await readFile('./organized_json/page.json', 'utf8');
  const jsonData = JSON.parse(data);
  const frontpage = jsonData.find(item => item.post_id === postId);
  return frontpage
}

//submenu handling
// 1. Define your page mapping
const pageMap = {
  '/': 5,
  '/info': 2,
  '/contact': 10
};

// 2. Create a generic handler
const handlePageRequest = async (req, res) => {
  const pageId = pageMap[req.path];
  const fpdat = await pageContent(pageId);

  // Build data object safely
  const data = {
    content: fpdat?.content || '',
    // Only include comments if they exist (or if it's the contact page)
    ...(fpdat?.comments && { comments: fpdat.comments })
  };

  res.render('page', data);
};

// 3. Apply the handler to the routes
app.get(['/', '/info', '/contact'], handlePageRequest);


//Single post
// Numeric value: single page
// This uses a RegEx constraint (\d+) to ensure :value is only digits
app.get(/^\/(\d+)$/, async (req, res) => {
  const postId = req.params[0];
  const data = await readFile('./organized_json/post.json', 'utf8');
  const filtered = JSON.parse(data).find(item => item.post_id === Number(postId));
  const formattedDate = filtered.post_date.split(' ')[0].split('-').reverse().join('-');
  res.render('singlePost', { title: filtered.title, content: filtered.content, date: formattedDate, extra: filtered.meta?.extra, jaar: filtered.meta?.jaar });
});


// Function to get post content based on category
const postContent = async (category) => {
  const data = await readFile('./organized_json/post.json', 'utf8');
  const jsonData = JSON.parse(data);
  const filtered = jsonData.filter(item => item.status === 'publish' && item.categories.includes(category));
  console.log(filtered)
  const finalData = filtered.map(item => ({
    title: item.title || '',
    extra: item.meta?.extra || '',
    jaar: item.meta?.jaar || '',
    content: item.content || '',
    date: item.post_date.split(' ')[0].split('-').reverse().join('-') || '',
    pageSort: item.meta?.psort_ || 999 // Default to 999 if psort_ is not defined
  })).sort((a, b) => a.pageSort - b.pageSort); // Ascending sort;

  return finalData
}

// Non numeric values (not catched by previous step), implied as category name
app.get('/:category', async (req, res, next) => {
  const { category } = req.params;
  //console.log(cat)
  const fpdat = await postContent(category);
  console.log(fpdat.length)
  if (fpdat.length === 0) {
    return next();
  }
  res.render('post', {
    data: fpdat || [],
    title: category
  });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  //Shorthand for httpError(404)
  next(httpError.NotFound(`page ${req.originalUrl} does not exist, please try another option from the menu!`));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  const status = err.status || 500

  res.status(status).render('error', { message: err.message, status: status, type: err.name });

});

/**
 * Event listener for HTTP server "error" event.
 * New notation for function onError(error) {}
 */
const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 * New notation for //function onListening() {}
*/
const onListening = () => {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  const message = `Listening on ${bind}`
  debug(message)
  console.log(message)
}

const server = app.listen(port);
server.on('error', onError);
server.on('listening', onListening);