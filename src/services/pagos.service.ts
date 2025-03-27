import {
  GetManyPagosQuery,
  GetOnePago,
  PatchOnePago,
  PostOnePago,
} from '../types/pagos.types';
import CustomError from '../utils/customError';
import { Habitaciones, Pagos, Residentes } from '../models';

import crearWhereQuery from '../utils/querys';

const getOne = async (data: GetOnePago) => {
  const registro = await Pagos.findOne({
    where: {
      idPago: data.params.idPago,
    },
  });

  return {
    registro,
  };
};

const getMany = async (data: GetManyPagosQuery) => {
  const {
    // Campos genericos para todas las APIs
    limit,
    page,
    sortBy = 'idPago',
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

  const registros = await Pagos.findAll(params);

  return {
    registros,
  };
};

const postOne = async (data: PostOnePago) => {
  // En base a los datos del residente, se rellenan todos los datos
  const residente = await Residentes.findOne({
    where: {
      idResidente: data.body.idResidente,
    },
    include: [
      {
        model: Habitaciones,
        as: 'habitacion',
      },
    ],
  }).then((res) => res?.toJSON());

  if (!residente) {
    const error = new CustomError('Residente no encontrado', 404);
    throw error;
  }
  if (residente.idHabitacion === null) {
    const error = new CustomError(
      'Residente no tiene habitacion asignada',
      404
    );
    throw error;
  }

  const registro = await Pagos.create({
    uuidPago: data.body.uuidPago,
    idResidente: residente.idResidente,
    idHabitacion: residente.idHabitacion,
    idSede: residente.idSede,
    monto: residente.habitacion?.precio || 0,
  });

  return {
    registro,
  };
};

const patchOne = async (data: PatchOnePago) => {
  const registroExistente = await Pagos.findByPk(data.params.idPago);

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
