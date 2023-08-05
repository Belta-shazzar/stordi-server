import { Request, Response, NextFunction } from 'express';
import {
  GenericException,
  ServiceException,
  NotFoundException,
  ValidationException,
  AuthenticationException,
  AuthorizationException,
} from '../exceptions/http';
import { errorLogger } from '../logger';
import config, { AppEnvironmentEnum } from '../../config';

const logError = (err: any, req: Request) => {
  errorLogger.error(err.message, {
    url: req.originalUrl,
    method: req.method,
    body: req.body,
    stack: err.stack,
  });
};

export default (
  err: GenericException,
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response => {
  if (res.headersSent) {
    return next(err);
  }
  logError(err, req);
  switch (err.name) {
    case ServiceException.name:
    case NotFoundException.name:
    case AuthenticationException.name:
    case AuthorizationException.name:
      // if (config.env.isTest) logError(err, req);
      return res.status(err.statusCode).send({
        status: 'error',
        message: err.message,
      });
    case ValidationException.name:
      // if (config.env.isTest) logError(err, req);
      return res.status(err.statusCode || 422).send({
        status: 'error',
        message: err.message,
        errors: (err as ValidationException).errors,
      });
    default:
      logError(err, req);
      return res.status(500).send({
        status: 'error',
        message: 'an error occurred',
        ...([AppEnvironmentEnum.LOCAL, AppEnvironmentEnum.DEVELOPMENT].includes(
          config.app.env,
        )
          ? { stack: err.stack }
          : {}),
      });
  }
};
