import {
  GetManySedeQuery,
  GetOneSede,
  PatchOneSede,
  PostOneSede,
} from '../types/sedes.types';
import CustomError from '../utils/customError';
import { Sedes } from '../models';

import crearWhereQuery from '../utils/querys';

const getOne = async (data: GetOneSede) => {
  const registro = await Sedes.findOne({
    where: {
      idSede: data.params.idSede,
    },
  });

  return {
    registro,
  };
};

const getMany = async (data: GetManySedeQuery) => {
  const {
    // Campos genericos para todas las APIs
    limit,
    page,
    sortBy = 'idSede',
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

  const registros = await Sedes.findAll(params);

  return {
    registros,
  };
};

const postOne = async (data: PostOneSede) => {
  const registro = await Sedes.create({
    ...data.body,
  });

  return {
    registro,
  };
};

const patchOne = async (data: PatchOneSede) => {
  const registroExistente = await Sedes.findByPk(data.params.idSede);

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
