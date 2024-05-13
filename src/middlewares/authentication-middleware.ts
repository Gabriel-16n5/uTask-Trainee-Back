import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { unauthorizedError } from '../errors/index';
import {  authenticationRepository } from '../repositories/authentication-repository';

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization');
  if (!authHeader) throw unauthorizedError("access denied");

  const token = authHeader.split(' ')[1];
  if (!token) throw unauthorizedError("access denied");

  const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

  const session = await authenticationRepository.findSessionByToken(token);
  if (!session) throw unauthorizedError("access denied");

  req.userId = userId;
  next();
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
  userId: number;
};