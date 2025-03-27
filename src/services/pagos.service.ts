import {
  GetManyPagosQuery,
  GetOnePago,
  PatchOnePago,
  PostOnePago,
} from '../types/pagos.types';
import CustomError from '../utils/customError';
import { Habitaciones, Pagos, Residentes } from '../models';
import s3 from '../utils/s3';
import { Op } from 'sequelize';

import crearWhereQuery from '../utils/querys';
import { UploadedFile } from 'express-fileupload';

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
  // Se comprueba que venga la infomacion del comprobante
  if (!data.files?.comprobante) {
    const error = new CustomError('Comprobante no encontrado', 400);
    throw error;
  }

  // Se verifica que no haya habido un pago previo en los ultimos 20 dias
  const pagoExistente = await Pagos.findOne({
    where: {
      idResidente: data.body.idResidente,
      createdAt: {
        [Op.gte]: new Date(new Date().getTime() - 20 * 24 * 60 * 60 * 1000),
      },
    },
  });

  if (pagoExistente) {
    const error = new CustomError(
      'Ya se ha realizado un pago en los ultimos 20 dias. Si desea siente que esto es un error, por favor contacte a soporte',
      400
    );
    throw error;
  }

  // Se busca al residente y toda su informacion
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

  //  Posteriormente se guarda el archivo en S3
  const comprobante = data.files?.comprobante as UploadedFile;

  // Se guarda en el path public/comprobantes/(habitacion-idHabitacion)/(fecha).(extension)
  const keyComprobante = `public/comprobantes/habitacion-${
    residente.idHabitacion
  }/${new Date().toISOString().split('T')[0]}.${
    comprobante.mimetype.split('/')[1]
  }`;

  // Se guarda el archivo en S3
  await s3.uploadFile({
    BucketName: process.env.S3_BUCKET_NAME || '',
    Key: keyComprobante,
    ContentType: comprobante.mimetype,
    BufferData: comprobante.data,
  });

  // En base a los datos del residente, se rellenan todos los datos
  const registro = await Pagos.create({
    uuidPago: data.body.uuidPago,
    idResidente: residente.idResidente,
    idHabitacion: residente.idHabitacion,
    idSede: residente.idSede,
    monto: residente.habitacion?.precio || 0,
    urlComprobante: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${keyComprobante}`,
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
