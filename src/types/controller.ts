import { Request, Response } from 'express';


interface ControllerInterface {
  request: Request;
  response: Response;
  headers: {
    contentType: string,
    authorization: string,
    userAgent: string,
    accept: string,
    postmanToken: string | string[],
    host: string,
    acceptEncoding: string | string[],
    connection: string,
    contentLength: string,
  };
  validator(): void;
  responseCode: number;
  responseJson: { status: string, message: string};
}

export default ControllerInterface;
