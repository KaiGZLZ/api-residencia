const { Router } = require('express');
const router = Router();
import { Request, Response, NextFunction } from 'express';

router.all('/', (_req: Request, _res: Response, next: NextFunction) => {
  const newError = new Error('Not found');
  next(newError);
});

export default router;
