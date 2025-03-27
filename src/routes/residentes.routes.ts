import express from 'express';

const router = express.Router();

// Validadores o schemas
import residentesSchemas from '../schemas/residentes.schemas';

// Controladores
import residentesController from '../controllers/residentes.controller';

// // Middlewares
import schemaValidatorHandler from '../middlewares/schemaValidatorHandler.middleware';
import authHandler from '../middlewares/authHandler.middleware';

// // Rutas
router.get(
  '/:idResidente',
  authHandler(),
  schemaValidatorHandler(residentesSchemas.paramsId, 'params'),
  residentesController.getOne
);

router.get(
  '/',
  authHandler(),
  schemaValidatorHandler(residentesSchemas.getManyReqQuery, 'query'),
  residentesController.getMany
);

router.post(
  '/',
  authHandler(),
  schemaValidatorHandler(residentesSchemas.postReqBody, 'body'),
  residentesController.postOne
);

router.patch(
  '/:idResidente',
  schemaValidatorHandler(residentesSchemas.paramsId, 'params'),
  schemaValidatorHandler(residentesSchemas.patchReqBody, 'body'),
  authHandler(),
  residentesController.patchOne
);

export default router;
