import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { unauthorizedError } from '../errors/index';
import { authenticationRepository } from '../repositories/authentication-repository';

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return next(unauthorizedError("access denied"));
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
  if (!token) {
    return next(unauthorizedError("access denied"));
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
    const session = await authenticationRepository.findSessionByToken(token);
    if (!session) {
      return next(unauthorizedError("access denied"));
    }

    req.userId = userId;
    next();
  } catch (error) {
    next(unauthorizedError("access denied"));
  }
}

export type AuthenticatedRequest = Request & {
  userId: number;
};

type JWTPayload = {
  userId: number;
};
