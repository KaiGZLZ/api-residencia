import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/customError';

const authHandler = () => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      // Se obtiene el token del header
      if (!req.headers.token) {
        const error = new CustomError(
          'La variable "token" es requerida en el header',
          400
        );
        return next(error);
      }

      // Se agregan los datos del usuario a en la petición para que los controladores los puedan usar
      next();
    } catch (error) {
      const errorValidacion = new CustomError('Error al validar el token: ');
      errorValidacion.statusCode = 401;
      return next(errorValidacion);
    }
  };
};

export default authHandler;
