import express from 'express';

const router = express.Router();

// Validadores o schemas
import habitacionesSchemas from '../schemas/habitaciones.schemas';

// Controladores
import habitacionesController from '../controllers/habitaciones.controller';

// // Middlewares
import schemaValidatorHandler from '../middlewares/schemaValidatorHandler.middleware';
import authHandler from '../middlewares/authHandler.middleware';

// // Rutas
router.get(
  '/:idHabitacion',
  authHandler(),
  schemaValidatorHandler(habitacionesSchemas.paramsId, 'params'),
  habitacionesController.getOne
);

router.get(
  '/',
  authHandler(),
  schemaValidatorHandler(habitacionesSchemas.getManyReqQuery, 'query'),
  habitacionesController.getMany
);

router.post(
  '/',
  authHandler(),
  schemaValidatorHandler(habitacionesSchemas.postReqBody, 'body'),
  habitacionesController.postOne
);

router.patch(
  '/:idHabitacion',
  schemaValidatorHandler(habitacionesSchemas.paramsId, 'params'),
  schemaValidatorHandler(habitacionesSchemas.patchReqBody, 'body'),
  authHandler(),
  habitacionesController.patchOne
);

export default router;
