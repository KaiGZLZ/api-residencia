import express from 'express';

const router = express.Router();

// Validadores o schemas
import sedesSchemas from '../schemas/sedes.schemas';

// Controladores
import sedesController from '../controllers/sedes.controller';

// // Middlewares
import schemaValidatorHandler from '../middlewares/schemaValidatorHandler.middleware';
import authHandler from '../middlewares/authHandler.middleware';

// // Rutas
router.get(
  '/:idSede',
  authHandler(),
  schemaValidatorHandler(sedesSchemas.paramsId, 'params'),
  sedesController.getOne
);

router.get(
  '/',
  authHandler(),
  schemaValidatorHandler(sedesSchemas.getManyReqQuery, 'query'),
  sedesController.getMany
);

router.post(
  '/',
  authHandler(),
  schemaValidatorHandler(sedesSchemas.postReqBody, 'body'),
  sedesController.postOne
);

router.patch(
  '/:idSede',
  schemaValidatorHandler(sedesSchemas.paramsId, 'params'),
  schemaValidatorHandler(sedesSchemas.patchReqBody, 'body'),
  authHandler(),
  sedesController.patchOne
);

export default router;
