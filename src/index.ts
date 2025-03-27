import express from 'express';
const app = express();
import 'dotenv/config';
import routers from './routes/index';
import errorHandler from './middlewares/errorHandler.middleware';
import fileUpload from 'express-fileupload';

// Middlewares
app.use(express.json());
app.use(fileUpload());

// Rutas
app.use('/sedes', routers.sedesRouter);
app.use('/pagos', routers.pagosRouter);
app.use('/residentes', routers.residentesRouter);
app.use('/habitaciones', routers.habitacionesRouter);
app.use('*', routers.notFound);

// Middleware de manejo de errores
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
