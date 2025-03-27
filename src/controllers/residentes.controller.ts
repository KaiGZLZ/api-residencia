import residentesService from '../services/residentes.service';
import { Request, Response, NextFunction } from 'express';

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = {
      params: {
        idResidente: parseInt(req.params.idResidente),
      },
    };
    const serviceResponse = await residentesService.getOne(data);
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
    const serviceResponse = await residentesService.getMany(data);
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
    const serviceResponse = await residentesService.postOne(data);
    res.status(201).json(serviceResponse);
  } catch (error) {
    next(error);
  }
};

const patchOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = {
      params: {
        idResidente: parseInt(req.params.idResidente),
      },
      body: req.body,
    };
    const serviceResponse = await residentesService.patchOne(data);
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
