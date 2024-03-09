import { Response } from 'express';

const listRoleController = (req?: Response, res?: Response): { status: string, message: string } => {
  console.log('listRoleController');
  return { status: 'success123', message: 'OK123' };
};

export default listRoleController;
