import { Request,Response, NextFunction } from 'express';
import { ApplicationErrors } from '../errors';

export default function exceptionsHandle(
  err:Error, 
  req:Request, 
  res:Response, 
  next:NextFunction){

    if(err instanceof ApplicationErrors){
      return res.status(err.statusCode).json({error: err.message});
    }

    return res.status(500).json({
      status:"Error",
      message: err.message });
  }