import { Response } from 'express-serve-static-core';
import HTTPCode from './types';

export default abstract class Routes {
  protected static buildResponse(
    response: Response,
    httpCode: HTTPCode,
    message: string,
    content?: unknown,
  ) {
    response.status(httpCode).json({ message, content });
  }
}
