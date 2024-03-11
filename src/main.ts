import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import articlesRoute from './routes/articlesRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(join(__dirname, 'public')));

// CORS
app.all('/*', (req: Request, res: Response, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


// Security
app.disable('x-powered-by');

/*
 * START SERVER
 */

// middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const path = req.path;
  const method = req.method;

  if (path === '/articles' && method === 'GET') {
    console.log('authorization passed');
    next();
    return;
  }

  console.log('authorization middleware');
  next();
});

const router = express.Router();

// routes
articlesRoute(router);

app.use(router);

// set port
app.set('port', port);

// listen on specified port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send('404 Not Found');
});


export default app;

//// middleware that is specific to this router
//app.use((req: Request, res: Response, next) => {
//  next();
//});
//
//

//
//app.listen(port, () => {
//  console.log(`Server is running at http://localhost:${port}`);
//});
