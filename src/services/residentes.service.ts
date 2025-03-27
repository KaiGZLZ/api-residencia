import { Sedes, Residentes, Habitaciones } from '../models';
import {
  GetManyResidentesQuery,
  GetOneResidente,
  PatchOneResidente,
  PostOneResidente,
} from '../types/residentes.types';
import CustomError from '../utils/customError';

import crearWhereQuery from '../utils/querys';

const getOne = async (data: GetOneResidente) => {
  const registro = await Residentes.findOne({
    where: {
      idResidente: data.params.idResidente,
    },
  });

  return {
    registro,
  };
};

const getMany = async (data: GetManyResidentesQuery) => {
  const {
    // Campos genericos para todas las APIs
    limit,
    page,
    sortBy = 'idResidente',
    sortOrder = 'ASC',
  } = data.query;

  const where = crearWhereQuery({ query: data.query });

  const params = {
    where,
    include: [
      {
        model: Sedes,
        as: 'sede',
      },
    ],
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

  const registros = await Residentes.findAll(params);

  return {
    registros,
  };
};

const postOne = async (data: PostOneResidente) => {
  // Por medio de la habitacion se obtiene la sede
  const habitacion = await Habitaciones.findOne({
    where: {
      idHabitacion: data.body.idHabitacion,
    },
  });

  if (!habitacion) {
    const error = new CustomError('Habitacion no encontrada', 404);
    throw error;
  }

  const registro = await Residentes.create({
    ...data.body,
    idSede: habitacion.idSede,
  });

  return {
    registro,
  };
};

const patchOne = async (data: PatchOneResidente) => {
  const registroExistente = await Residentes.findByPk(data.params.idResidente);

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
