import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, Next: NextFunction) {
  console.error('Unhandled Application Error:', {
    message: err.message,
    code: err.code,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });

  // MySQL specific connection errors
  if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND' || err.code === 'ER_BAD_DB_ERROR' || err.code === 'PROTOCOL_CONNECTION_LOST') {
    return res.status(503).json({
      success: false,
      error: 'Database connection failed. MySQL service is currently unavailable. Please verify database connection settings.',
      code: err.code,
    });
  }

  // Duplicate key entry (e.g. unique email or application number)
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      success: false,
      error: 'A record with this information already exists.',
      code: err.code,
    });
  }

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(statusCode).json({
    success: false,
    error: message,
  });
}

export default errorHandler;
