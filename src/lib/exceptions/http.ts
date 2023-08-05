import { StatusCodes } from "http-status-codes";

export class GenericException extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ServiceException extends GenericException {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export class AuthorizationException extends GenericException {
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN);
  }
}

export class NotFoundException extends GenericException {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export class AuthenticationException extends GenericException {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export class ValidationException extends GenericException {
  public errors: string[];

  constructor(errors: string[] = []) {
    const message = `${errors[0]}`;
    super(message, StatusCodes.UNPROCESSABLE_ENTITY);
    this.errors = errors;
  }
}
