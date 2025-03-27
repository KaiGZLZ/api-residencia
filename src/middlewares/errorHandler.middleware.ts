import CustomError from '../utils/customError';
import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line no-unused-vars
const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);
  if (err.message === 'Not found') {
    res.status(404).json({
      message: 'Ruta especificada no encontrada',
    });
    return;
  }

  // Error de validación de esquema
  if (err.name === 'SchemaValidationError') {
    res.status(400).json({
      message: err.message,
      path: err.path,
      value: err.value,
    });
    return;
  }

  // En caso de que sea un registro duplicado
  if (err.name === 'SequelizeUniqueConstraintError') {
    const error = err.errors[0];
    res.status(409).json({
      message: `Ya existe un registro con el valor ${error.value} en el campo ${error.path}`,
      path: error.path,
      value: error.value,
    });
    return;
  }

  // En caso de que la llave foranea no exista
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    res.status(409).json({
      message: `El valor ${err.value} no corresponde con el id de ningún elemento en la tabla ${err.table}`,
      path: err.fields?.[0],
      value: err.value,
    });
    return;
  }

  // En caso de que un valor no pueda ser nulo
  if (err.name === 'SequelizeValidationError') {
    const error = err.errors[0];
    res.status(400).json({
      message: `El campo ${error.path} no puede estar vacío`,
      path: error.path,
      value: error.value,
    });
    return;
  }

  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal-server-error',
  });
};

export default errorHandler;
