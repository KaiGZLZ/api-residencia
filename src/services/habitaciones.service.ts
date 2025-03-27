import {
  GetManyHabitacionesQuery,
  GetOneHabitacion,
  PatchOneHabitacion,
  PostOneHabitacion,
} from '../types/habitaciones.types';
import CustomError from '../utils/customError';
import { Habitaciones } from '../models';

import crearWhereQuery from '../utils/querys';

const getOne = async (data: GetOneHabitacion) => {
  const registro = await Habitaciones.findOne({
    where: {
      idHabitacion: data.params.idHabitacion,
    },
  });

  return {
    registro,
  };
};

const getMany = async (data: GetManyHabitacionesQuery) => {
  const {
    // Campos genericos para todas las APIs
    limit,
    page,
    sortBy = 'idHabitacion',
    sortOrder = 'ASC',
  } = data.query;

  const where = crearWhereQuery({ query: data.query });

  const params = {
    where,
    order: [[sortBy, sortOrder] as [string, 'ASC' | 'DESC']], // Aseguramos que el tipo sea correcto
    limit: limit && page ? limit : undefined,
    offset: limit && page ? (page - 1) * limit : undefined,
  };

  // Para la paginacion deben estar definidos limit y page
  if ((limit && !page) || (!limit && page)) {
    const error = new CustomError(
      'Se debe enviar el parametro limit y page para paginar',
      400
    );
    throw error;
  }

  const registros = await Habitaciones.findAll(params);

  return {
    registros,
  };
};

const postOne = async (data: PostOneHabitacion) => {
  const registro = await Habitaciones.create(data.body);

  return {
    registro,
  };
};

const patchOne = async (data: PatchOneHabitacion) => {
  const registroExistente = await Habitaciones.findByPk(
    data.params.idHabitacion
  );

  if (!registroExistente) {
    const error = new CustomError('Registro no encontrado', 404);
    throw error;
  }

  const registro = await registroExistente.update(data.body);

  return {
    registro,
  };
};

export default {
  getOne,
  getMany,
  postOne,
  patchOne,
};
