import { Request, Response, NextFunction } from 'express';

const cors = (_req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, token'
  );
  res.header(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'SAMEORIGIN');
  next();
};

export default { cors };
