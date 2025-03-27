import pagosService from '../services/pagos.service';
import { Request, Response, NextFunction } from 'express';

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = {
      params: {
        idPago: parseInt(req.params.idPago),
      },
    };
    const serviceResponse = await pagosService.getOne(data);
    res.status(200).json(serviceResponse);
  } catch (error) {
    next(error);
  }
};

const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = {
      query: req.query,
    };
    const serviceResponse = await pagosService.getMany(data);
    res.status(200).json(serviceResponse);
  } catch (error) {
    next(error);
  }
};

const postOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = {
      body: req.body,
    };
    const serviceResponse = await pagosService.postOne(data);
    res.status(201).json(serviceResponse);
  } catch (error) {
    next(error);
  }
};

const patchOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = {
      params: {
        idPago: parseInt(req.params.idPago),
      },
      body: req.body,
    };
    const serviceResponse = await pagosService.patchOne(data);
    res.status(200).json(serviceResponse);
  } catch (error) {
    next(error);
  }
};

export default {
  getOne,
  getMany,
  postOne,
  patchOne,
};
