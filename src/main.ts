import express, { Request, Response } from 'express';
import finalRoutes from './routes/index.js';
import Controller from './core/Controller.js';
import ControllerAdapter from './core/ControllerAdapter.js';

const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(express.json());
// middleware that is specific to this router
app.use((req: Request, res: Response, next) => {
//  console.log({
//    request: {
//      baseUrl: req.baseUrl,
//      body: req.body,
//      cookies: req.cookies,
//      fresh: req.fresh,
//      hostname: req.hostname,
//      ip: req.ip,
//      ips: req.ips,
//      method: req.method,
//      originalUrl: req.originalUrl,
//      params: req.params,
//      path: req.path,
//      protocol: req.protocol,
//      query: req.query,
//      route: req.route,
//      secure: req.secure,
//      signedCookies: req.signedCookies,
//      stale: req.stale,
//      subdomains: req.subdomains,
//      xhr: req.xhr,
//    },
//    response: {
//      headersSent: res.headersSent,
//      locals: res.locals,
//      statusCode: res.statusCode,
//      statusMessage: res.statusMessage,
//      append: res.append,
//      attachment: res.attachment,
//      cookie: res.cookie,

  const controller = new Controller(req, res);
  controller.validator();

//  return res.json({ status: 'success', message: 'OK' });
  next();
});

finalRoutes.forEach((route) => {
  const router = express.Router();
  route.children.forEach((child: { path: string, method: string, controller: string }) => {
    const controllerAdapter = (req: Request, res: Response):  Promise<Response<any, Record<string, any>>> => ControllerAdapter(req, res, child.controller);

    switch (child.method) {
      case 'GET':
        router.get(child.path, controllerAdapter);
        break;
      case 'POST':
        router.post(child.path, controllerAdapter);
        break;
      case 'PUT':
        router.put(child.path, controllerAdapter);
        break;
      case 'DELETE':
        router.delete(child.path, controllerAdapter);
        break;
      default:
        router.all(child.path, controllerAdapter);
    }
  });
  app.use(route.path, router);
});

app.use((req: Request, res: Response) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
