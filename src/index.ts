import express from 'express';
const app = express();
app.use(express.json());
import routers from './routes/index';


const PORT = process.env.PORT || 3000;

app.use('/sedes', routers.sedesRouter);
// app.use('/pagos', routers.pagosRouter);
// app.use('/residentes', routers.residentesRouter);
// app.use('/habitaciones', routers.habitacionesRouter);
// app.use('*', routers.notFound);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    }
);