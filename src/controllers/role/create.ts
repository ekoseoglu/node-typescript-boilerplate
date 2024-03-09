import { Request, Response } from 'express';

const createRoleController = (req?: Request, res?: Response): { status: string, message: string } => {
  console.log('i am here');
//  console.log({
//    req,
//    res,
//  });
  return { status: 'success', message: 'OK' };
};

export default createRoleController;
