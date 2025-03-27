import express from 'express';

const router = express.Router();

// Validadores o schemas
import pagosSchemas from '../schemas/pagos.schemas';

// Controladores
import pagosController from '../controllers/pagos.controller';

// // Middlewares
import schemaValidatorHandler from '../middlewares/schemaValidatorHandler.middleware';
import authHandler from '../middlewares/authHandler.middleware';

// // Rutas
router.get(
  '/:idPago',
  authHandler(),
  schemaValidatorHandler(pagosSchemas.paramsId, 'params'),
  pagosController.getOne
);

router.get(
  '/',
  authHandler(),
  schemaValidatorHandler(pagosSchemas.getManyReqQuery, 'query'),
  pagosController.getMany
);

router.post(
  '/',
  authHandler(),
  schemaValidatorHandler(pagosSchemas.postReqBody, 'body'),
  pagosController.postOne
);

router.patch(
  '/:idPago',
  schemaValidatorHandler(pagosSchemas.paramsId, 'params'),
  schemaValidatorHandler(pagosSchemas.patchReqBody, 'body'),
  authHandler(),
  pagosController.patchOne
);

export default router;
