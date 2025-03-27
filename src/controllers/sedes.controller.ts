import sedesService from '../services/sedes.service';
import { Request, Response, NextFunction } from 'express';

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = {
      params: {
        idSede: parseInt(req.params.idSede),
      },
    };
    const serviceResponse = await sedesService.getOne(data);
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
    const serviceResponse = await sedesService.getMany(data);
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
    const serviceResponse = await sedesService.postOne(data);
    res.status(201).json(serviceResponse);
  } catch (error) {
    next(error);
  }
};

const patchOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = {
      params: {
        idSede: parseInt(req.params.idSede),
      },
      body: req.body,
    };
    const serviceResponse = await sedesService.patchOne(data);
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
