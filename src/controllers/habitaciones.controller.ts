import habitacionesService from '../services/habitaciones.service';
import { Request, Response, NextFunction } from 'express';

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = {
      params: {
        idHabitacion: parseInt(req.params.idHabitacion),
      },
    };
    const serviceResponse = await habitacionesService.getOne(data);
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
    const serviceResponse = await habitacionesService.getMany(data);
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
    const serviceResponse = await habitacionesService.postOne(data);
    res.status(201).json(serviceResponse);
  } catch (error) {
    next(error);
  }
};

const patchOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = {
      params: {
        idHabitacion: parseInt(req.params.idHabitacion),
      },
      body: req.body,
    };
    const serviceResponse = await habitacionesService.patchOne(data);
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
