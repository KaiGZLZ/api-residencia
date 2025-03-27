import { CustomHelpers } from 'joi';
import Joi from 'joi';

const paramsId = Joi.object({
  idHabitacion: Joi.number().integer().min(1).required().messages({
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
  sortBy: Joi.string().trim().default('idHabitacion').messages({
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
    }),
  numeroHabitacion: Joi.alternatives()
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
  precio_gte: Joi.number().min(0).messages({
    'number.base': 'Error de validación: El campo {#label} debe ser un número',
    'number.min':
      'Error de validación: El campo {#label} debe ser mayor a {#limit}',
  }),
  precio_lte: Joi.number().min(0).messages({
    'number.base': 'Error de validación: El campo {#label} debe ser un número',
    'number.min':
      'Error de validación: El campo {#label} debe ser mayor a {#limit}',
  }),
}).messages({
  'object.unknown': 'El parámetro {#label} no es permitido',
});

const postReqBody = Joi.object({
  numeroHabitacion: Joi.number().integer().min(1).required().messages({
    'number.base': 'Error de validación: El campo {#label} debe ser un número',
    'number.integer':
      'Error de validación: El campo {#label} debe ser un entero',
    'number.min':
      'Error de validación: El campo {#label} debe ser mayor a {#limit}',
    'any.required': 'Error de validación: El campo {#label} es requerido',
  }),
  precio: Joi.number().min(0).required().messages({
    'number.base': 'Error de validación: El campo {#label} debe ser un número',
    'number.min':
      'Error de validación: El campo {#label} debe ser mayor a {#limit}',
    'any.required': 'Error de validación: El campo {#label} es requerido',
  }),
  idSede: Joi.number().integer().min(1).required().messages({
    'number.base': 'Error de validación: El campo {#label} debe ser un número',
    'number.integer':
      'Error de validación: El campo {#label} debe ser un entero',
    'number.min':
      'Error de validación: El campo {#label} debe ser mayor a {#limit}',
    'any.required': 'Error de validación: El campo {#label} es requerido',
  }),
}).messages({
  'object.unknown': 'El parámetro {#label} no es permitido',
});

const patchReqBody = Joi.object({
  precio: Joi.number().min(0).messages({
    'number.base': 'Error de validación: El campo {#label} debe ser un número',
    'number.min':
      'Error de validación: El campo {#label} debe ser mayor a {#limit}',
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
