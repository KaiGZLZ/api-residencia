import { CustomHelpers } from 'joi';
import Joi from 'joi';

const paramsId = Joi.object({
  idSede: Joi.number().integer().min(1).required().messages({
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
  sortBy: Joi.string().trim().default('idSede').messages({
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
    }),
  uuidSede: Joi.alternatives()
    .try(
      Joi.string().trim().uuid({ version: 'uuidv4' }),
      Joi.array().items(Joi.string().trim().uuid({ version: 'uuidv4' }))
    )
    .messages({
      'alternatives.types':
        'Error de validación: El campo {#label} debe ser un string o un array de strings',
      'string.base':
        'Error de validación: El campo {#label} debe ser un string',
      'string.uuid':
        'Error de validación: El campo {#label} debe ser un UUIDv4',
      'string.empty':
        'Error de validación: El campo {#label} no puede estar vacío',
    }),

  createdAt: Joi.alternatives()
    .try(Joi.date().iso(), Joi.array().items(Joi.date().iso()))
    .messages({
      'alternatives.types':
        'Error de validación: El campo {#label} debe ser una fecha o un array de fechas',
      'date.base': 'Error de validación: El campo {#label} debe ser una fecha',
      'date.iso':
        'Error de validación: El campo {#label} debe ser una fecha ISO 8601',
    }),
  updatedAt: Joi.alternatives()
    .try(Joi.date().iso(), Joi.array().items(Joi.date().iso()))
    .messages({
      'alternatives.types':
        'Error de validación: El campo {#label} debe ser una fecha o un array de fechas',
      'date.base': 'Error de validación: El campo {#label} debe ser una fecha',
      'date.iso':
        'Error de validación: El campo {#label} debe ser una fecha ISO 8601',
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
  direccion: Joi.string().trim().required().messages({
    'string.base': 'Error de validación: El campo {#label} debe ser un string',
    'string.empty':
      'Error de validación: El campo {#label} no puede estar vacío',
    'any.required': 'Error de validación: El campo {#label} es requerido',
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
  direccion: Joi.string().trim().messages({
    'string.base': 'Error de validación: El campo {#label} debe ser un string',
    'string.empty':
      'Error de validación: El campo {#label} no puede estar vacío',
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
