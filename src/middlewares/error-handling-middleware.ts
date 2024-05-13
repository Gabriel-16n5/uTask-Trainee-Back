import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { ApplicationError, RequestError } from '../protocols/error-protocol';

export function handleApplicationErrors(
  err: RequestError | ApplicationError | Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err.name === 'conflict') {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message,
    });
  }

  if (err.name === 'invalid') {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  }

  if (err.name === 'NotFound') {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  if (err.name === 'Forbidden') {
    return res.status(httpStatus.FORBIDDEN).send({
      message: err.message,
    });
  }

  if (err.name === 'ServiceUnavailable') {
    return res.status(httpStatus.SERVICE_UNAVAILABLE).send({
      message: err.message,
    });
  }

  if (err.name === 'Unauthorized') {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: 'InternalServerError',
    message: 'Internal Server Error',
  });
}