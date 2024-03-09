import { Request, Response } from 'express';
import ControllerInterface from '../types/controller.js';
import Joi from 'joi';

const schema = Joi.object({
  path: Joi.string().regex(/^[0-9]*$/).required().messages({
    'string.base': 'Path should be a type of string',
    'string.empty': 'Path should not be empty',
    'string.pattern.base': 'Path should be a number',
    'any.required': 'Path is required',
  }),
  baudRate: Joi.number().required(),
});

class Controller implements ControllerInterface {
  request: ControllerInterface['request'];
  response: ControllerInterface['response'];
  headers: ControllerInterface['headers'];
  responseCode: ControllerInterface['responseCode'];
  responseJson: ControllerInterface['responseJson'];

  constructor(req: Request, res: Response) {
    this.request = req;
    this.response = res;
    this.headers = {
      contentType: req.headers['content-type'],
      authorization: req.headers['authorization'],
      userAgent: req.headers['user-agent'],
      accept: req.headers['accept'],
      postmanToken: req.headers['postman-token'],
      host: req.headers['host'],
      acceptEncoding: req.headers['accept-encoding'],
      connection: req.headers['connection'],
      contentLength: req.headers['content-length'],
    };
  }

  validator(): Controller {
    const { error } = schema.validate(this.request.body);

    if (error) {
      this.responseCode = 401;
      this.responseJson = { status: 'error', message: error.details[0].message };
      return this;
    } else {
      this.responseCode = 200;
      this.responseJson = { status: 'success', message: 'OK' };
      return this;
    }
  }

  init(): void {
    console.log('core/controller/init');
    this.validator();
  }
//    const { error, value } = schema.validate(this.request.body);
//
//    if (error) {
//      this.responseCode = 401;
//      this.responseJson = { status: 'error', message: error.details[0].message };
//      return this;
//    } else {
//      this.responseCode = 200;
//      this.responseJson = { status: 'success', message: 'OK' };
//      return this;
//    }
//  }
//  constructor(req, res) {
//    console.log('Controller');
//  }


}

export default Controller;
