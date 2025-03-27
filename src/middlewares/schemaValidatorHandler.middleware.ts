import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import CustomError from '../utils/customError';

type RequestProperty = 'body' | 'params' | 'query';

// Función que recibe un esquema de validación de Joi y una propiedad del request (body, params, query) y retorna un middleware que valida los datos del request con el esquema recibido. Si hay errores, los envía al siguiente middleware.
const schemaValidatorHandler = (
  schema: ObjectSchema,
  property: RequestProperty
) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const data = req[property];
    const { error, value } = schema.validate(data, { abortEarly: false });
    req[property] = value;
    if (error) {
      const err = new CustomError(
        error.details.map((x) => x.message).join(', '),
        400
      );

      err.path =
        error.details.length > 1
          ? error.details.map((x) => x.path[0]).toString()
          : error.details[0].path[0].toString();
      err.value =
        error.details.length > 1
          ? error.details.map((x) => x.context?.value)?.toString()
          : error.details[0].context?.value?.toString();
      err.name = 'SchemaValidationError';
      next(err);
    }
    next();
  };
};

export default schemaValidatorHandler;
