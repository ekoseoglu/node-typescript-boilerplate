import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'url';
import articlesRoute from './routes/articlesRoute.js';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// socket.io
const server = createServer(app);
const io = new Server(server);
// socket.io


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

app.get('/', (req: Request, res: Response) => {
  res.sendFile(join(__dirname, 'views', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

const router = express.Router();

// routes
articlesRoute(router);

app.use(router);

// set port
app.set('port', port);

// listen on specified port
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

//app.use((req: Request, res: Response, next: NextFunction) => {
//  res.status(404).send('404 Not Found');
//});


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
