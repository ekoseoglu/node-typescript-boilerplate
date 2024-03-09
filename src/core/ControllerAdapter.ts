import { Request, Response } from 'express';
import Controller from './Controller.js';
import fs from 'fs';
import path from 'path';

const ControllerAdapter = async (req: Request, res: Response, controllerPath: string): Promise<Response<any, Record<string, any>>> => {
  const controller = new Controller(req, res);
  controller.init();

//  process.env.NODE_ENV === 'development' && console.log('controllerPath', controllerPath);
  const controllerFile = path.resolve(process.cwd(), `src/controllers/${controllerPath}.js`);
  if (!fs.existsSync(controllerFile)) {
    res.status(404);
    return res.json({ status: 'error', message: 'Controller Not Found' });
  }

  // get method from controller
  const module: {
    readonly default: (req: Request, res: Response) => { status: string; message: string }
  } = await import(controllerFile);

  // return response
  res.status(200);
  return res.json(module.default(req, res));
};

export default ControllerAdapter;
