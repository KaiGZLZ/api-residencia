import { CustomHelpers } from 'joi';
import Joi from 'joi';

const paramsId = Joi.object({
  idResidente: Joi.number().integer().min(1).required().messages({
    'number.base': 'Error de validación: El campo {#label} debe ser un número',
    'number.integer':
      'Error de validación: El campo {#label} debe ser un entero',
    'number.min':
      'Error de validación: El campo {#label} debe ser mayor a {#limit}',
    'any.required': 'Error de validación: El campo {#label} es requerido',
  }),
});

const getManyReqQuery = Joi.object({
  // Campos genericos para todas las APIs
  page: Joi.number()
    .integer()
    .min(1)
    .custom((value: number, helpers: CustomHelpers) => {
      // Si se envía la página, debe estar definido el límite
      if (!helpers.state.ancestors[0].limit) {
        return helpers.error('page.pageWithoutLimit');
      }
      return value;
    })
    .messages({
      'number.base':
        'Error de validación: El campo {#label} debe ser un número',
      'number.integer':
        'Error de validación: El campo {#label} debe ser un entero',
      'number.min':
        'Error de validación: El campo {#label} debe ser mayor a {#limit}',
      'page.pageWithoutLimit':
        'Error de validación: Si se envía la página, debe estar definido el límite por pagina',
    }),
  limit: Joi.number()
    .integer()
    .min(1)
    .custom((value: number, helpers: CustomHelpers) => {
      // Si se envía el límite, debe estar definida la página
      if (!helpers.state.ancestors[0].page) {
        return helpers.error('limit.limitWithoutPage');
      }
      return value;
    })
    .messages({
      'number.base':
        'Error de validación: El campo {#label} debe ser un número',
      'number.integer':
        'Error de validación: El campo {#label} debe ser un entero',
      'number.min':
        'Error de validación: El campo {#label} debe ser mayor a {#limit}',
      'limit.limitWithoutPage':
        'Error de validación: Si se envía el límite, debe estar definida la página',
    }),
  sortBy: Joi.string().trim().default('idResidente').messages({
    'string.base': 'Error de validación: El campo {#label} debe ser un string',
    'string.empty':
      'Error de validación: El campo {#label} no puede estar vacío',
  }),
  sortOrder: Joi.string().trim().valid('ASC', 'DESC').default('ASC').messages({
    'string.base': 'Error de validación: El campo {#label} debe ser un string',
    'string.empty':
      'Error de validación: El campo {#label} no puede estar vacío',
    'any.only': 'Error de validación: El campo {#label} debe ser ASC o DESC',
  }),

  // Campos específicos para la API
  idResidente: Joi.alternatives()
    .try(
      Joi.number().integer().min(1),

      Joi.array().items(Joi.number().integer().min(1))
    )
    .messages({
      'alternatives.types':
        'Error de validación: El campo {#label} debe ser un número o un array de números',
      'number.base':
        'Error de validación: El campo {#label} debe ser un número',
      'number.integer':
        'Error de validación: El campo {#label} debe ser un entero',
    }),
  uuidResidente: Joi.alternatives()
    .try(
      Joi.string().trim().uuid({ version: 'uuidv4' }),
      Joi.array().items(Joi.string().trim().uuid({ version: 'uuidv4' }))
    )
    .messages({
      'alternatives.types':
        'Error de validación: El campo {#label} debe ser un UUID o un array de UUIDs',
      'string.base':
        'Error de validación: El campo {#label} debe ser un string',
      'string.empty':
        'Error de validación: El campo {#label} no puede estar vacío',
      'string.uuid':
        'Error de validación: El campo {#label} debe ser un UUIDv4',
    }),
  correo: Joi.alternatives()
    .try(
      Joi.string().trim().email(),
      Joi.array().items(Joi.string().trim().email())
    )
    .messages({
      'alternatives.types':
        'Error de validación: El campo {#label} debe ser un string o un array de strings',
      'string.base':
        'Error de validación: El campo {#label} debe ser un string',
      'string.empty':
        'Error de validación: El campo {#label} no puede estar vacío',
      'string.email':
        'Error de validación: El campo {#label} debe ser un correo electrónico',
    }),
  telefono: Joi.alternatives()
    // El telefono debe ser de 10 digitos y comenzar por 3
    .try(
      Joi.string()
        .trim()
        .regex(/^[3]\d{9}$/),
      Joi.array().items(
        Joi.string()
          .trim()
          .regex(/^[3]\d{9}$/)
      )
    )
    .messages({
      'alternatives.types':
        'Error de validación: El campo {#label} debe ser un string o un array de strings',
      'string.base':
        'Error de validación: El campo {#label} debe ser un string',
      'string.empty':
        'Error de validación: El campo {#label} no puede estar vacío',
      'string.pattern.base':
        'Error de validación: El campo {#label} debe ser un número de 10 digitos y comenzar con 3',
    }),
  cedula: Joi.alternatives()
    .try(
      Joi.string()
        .trim()
        .regex(/^[0-9]*$/), // Solo números
      Joi.array().items(
        Joi.string()
          .trim()
          .regex(/^[0-9]*$/)
      )
    )
    .messages({
      'alternatives.types':
        'Error de validación: El campo {#label} debe ser un string o un array de strings',
      'string.base':
        'Error de validación: El campo {#label} debe ser un string',
      'string.empty':
        'Error de validación: El campo {#label} no puede estar vacío',
      'string.pattern.base':
        'Error de validación: El campo {#label} debe ser un número',
    }),

  idSede: Joi.alternatives()
    .try(
      Joi.number().integer().min(1),
      Joi.array().items(Joi.number().integer().min(1))
    )
    .messages({
      'alternatives.types':
        'Error de validación: El campo {#label} debe ser un número o un array de números',
      'number.base':
        'Error de validación: El campo {#label} debe ser un número',
      'number.integer':
        'Error de validación: El campo {#label} debe ser un entero',
      'number.min':
        'Error de validación: El campo {#label} debe ser mayor a {#limit}',
    }),

  idHabitacion: Joi.alternatives()
    .try(
      Joi.number().integer().min(1),
      Joi.array().items(Joi.number().integer().min(1))
    )
    .messages({
      'alternatives.types':
        'Error de validación: El campo {#label} debe ser un número o un array de números',
      'number.base':
        'Error de validación: El campo {#label} debe ser un número',
      'number.integer':
        'Error de validación: El campo {#label} debe ser un entero',
      'number.min':
        'Error de validación: El campo {#label} debe ser mayor a {#limit}',
    }),

  activo: Joi.alternatives()
    .try(Joi.boolean(), Joi.array().items(Joi.boolean()))
    .messages({
      'alternatives.types':
        'Error de validación: El campo {#label} debe ser un booleano o un array de booleanos',
      'boolean.base':
        'Error de validación: El campo {#label} debe ser un booleano',
    }),
}).messages({
  'object.unknown': 'El parámetro {#label} no es permitido',
});

const postReqBody = Joi.object({
  nombre: Joi.string().trim().required().messages({
    'string.base': 'Error de validación: El campo {#label} debe ser un string',
    'string.empty':
      'Error de validación: El campo {#label} no puede estar vacío',
    'any.required': 'Error de validación: El campo {#label} es requerido',
  }),
  telefono: Joi.string()
    .trim()
    .regex(/^[3]\d{9}$/)
    .messages({
      'string.base':
        'Error de validación: El campo {#label} debe ser un string',
      'string.empty':
        'Error de validación: El campo {#label} no puede estar vacío',
      'string.pattern.base':
        'Error de validación: El campo {#label} debe ser un número de 10 digitos y comenzar con 3',
    }),
  correo: Joi.string().trim().email().required().messages({
    'string.base': 'Error de validación: El campo {#label} debe ser un string',
    'string.empty':
      'Error de validación: El campo {#label} no puede estar vacío',
    'string.email':
      'Error de validación: El campo {#label} debe ser un correo electrónico',
    'any.required': 'Error de validación: El campo {#label} es requerido',
  }),
  cedula: Joi.string()
    .trim()
    .regex(/^[0-9]*$/)
    .required()
    .messages({
      'string.base':
        'Error de validación: El campo {#label} debe ser un string',
      'string.empty':
        'Error de validación: El campo {#label} no puede estar vacío',
      'string.pattern.base':
        'Error de validación: El campo {#label} debe ser un número',
      'any.required': 'Error de validación: El campo {#label} es requerido',
    }),
  idHabitacion: Joi.number().integer().min(1).required().messages({
    'number.base': 'Error de validación: El campo {#label} debe ser un número',
    'number.integer':
      'Error de validación: El campo {#label} debe ser un entero',
    'number.min':
      'Error de validación: El campo {#label} debe ser mayor a {#limit}',
    'any.required': 'Error de validación: El campo {#label} es requerido',
  }),
  activo: Joi.boolean().default(true).messages({
    'boolean.base':
      'Error de validación: El campo {#label} debe ser un booleano',
  }),
}).messages({
  'object.unknown': 'El parámetro {#label} no es permitido',
});

const patchReqBody = Joi.object({
  nombre: Joi.string().trim().messages({
    'string.base': 'Error de validación: El campo {#label} debe ser un string',
    'string.empty':
      'Error de validación: El campo {#label} no puede estar vacío',
  }),
  telefono: Joi.string()
    .trim()
    .regex(/^[3]\d{9}$/)
    .messages({
      'string.base':
        'Error de validación: El campo {#label} debe ser un string',
      'string.empty':
        'Error de validación: El campo {#label} no puede estar vacío',
      'string.pattern.base':
        'Error de validación: El campo {#label} debe ser un número de 10 digitos y comenzar con 3',
    }),
  correo: Joi.string().trim().email().messages({
    'string.base': 'Error de validación: El campo {#label} debe ser un string',
    'string.empty':
      'Error de validación: El campo {#label} no puede estar vacío',
    'string.email':
      'Error de validación: El campo {#label} debe ser un correo electrónico',
  }),
  cedula: Joi.string()
    .trim()
    .regex(/^[0-9]*$/)
    .messages({
      'string.base':
        'Error de validación: El campo {#label} debe ser un string',
      'string.empty':
        'Error de validación: El campo {#label} no puede estar vacío',
      'string.pattern.base':
        'Error de validación: El campo {#label} debe ser un número',
    }),
  idSede: Joi.number().integer().min(1).messages({
    'number.base': 'Error de validación: El campo {#label} debe ser un número',
    'number.integer':
      'Error de validación: El campo {#label} debe ser un entero',
    'number.min':
      'Error de validación: El campo {#label} debe ser mayor a {#limit}',
  }),
  idHabitacion: Joi.number().integer().min(1).messages({
    'number.base': 'Error de validación: El campo {#label} debe ser un número',
    'number.integer':
      'Error de validación: El campo {#label} debe ser un entero',
    'number.min':
      'Error de validación: El campo {#label} debe ser mayor a {#limit}',
  }),
  activo: Joi.boolean().messages({
    'boolean.base':
      'Error de validación: El campo {#label} debe ser un booleano',
  }),
}).messages({
  'object.unknown': 'El parámetro {#label} no es permitido',
});

export default {
  paramsId,
  getManyReqQuery,
  postReqBody,
  patchReqBody,
};
