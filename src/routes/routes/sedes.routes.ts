import express from 'express';

const router = express.Router();

// // Validadores o schemas
// const sedesSchemas = require('../../schemas/sedes.schemas');

// // Controladores
// const sedesController = require('../../controllers/sedes.controller');

// // Middlewares
// const schemaValidatorHandler = require('../../middlewares/schemaValidatorHandler.middleware');
// const authHandler = require('../../middlewares/authHandler.middleware');

// // Rutas
// router.get(
//   '/:idSede',
//   schemaValidatorHandler(sedesSchemas.paramsId, 'params'),
//   authHandler(),
//   sedesController.getOne
// );

// router.get(
//   '/',
//   authHandler(),
//   schemaValidatorHandler(sedesSchemas.getManyReqQuery, 'query', true),
//   sedesController.getMany
// );

// router.post(
//   '/',
//   authHandler(),
//   schemaValidatorHandler(sedesSchemas.postReqBody, 'body'),
//   sedesController.postOne
// );

// router.patch(
//   '/:idSede',
//   schemaValidatorHandler(sedesSchemas.paramsId, 'params'),
//   schemaValidatorHandler(sedesSchemas.patchReqBody, 'body'),
//   authHandler(),
//   sedesController.patchOne
// );

export default router;
