import { Sequelize } from 'sequelize';
import SedeModel from '../models/Sedes.model';
import HabitacionModel from '../models/Habitaciones.model';
import PagosModel from '../models/Pagos.model';
import ResidentesModel from '../models/Residentes.model';

const sequelize = new Sequelize({
  host: process.env.DATABASE_HOST || '127.0.0.1',
  username: process.env.DATABASE_USERNAME || 'root',
  password: process.env.DATABASE_PASSWORD || 'root_password',
  database: process.env.DATABASE_NAME || 'residencia',
  dialect: 'mysql',
  logging: false,
});

// Inicializa los modelos
const Sedes = SedeModel(sequelize);
const Habitaciones = HabitacionModel(sequelize);
const Residentes = ResidentesModel(sequelize);
const Pagos = PagosModel(sequelize);

// Asociaciones
Sedes.hasMany(Habitaciones, { foreignKey: 'idSede', as: 'habitaciones' });
Sedes.hasMany(Residentes, { foreignKey: 'idSede', as: 'residentes' });
Sedes.hasMany(Pagos, { foreignKey: 'idSede', as: 'pagos' });

Habitaciones.belongsTo(Sedes, { foreignKey: 'idSede', as: 'sede' });
Habitaciones.hasMany(Residentes, {
  foreignKey: 'idHabitacion',
  as: 'residentes',
});

Residentes.belongsTo(Habitaciones, {
  foreignKey: 'idHabitacion',
  as: 'habitacion',
});
Residentes.belongsTo(Sedes, { foreignKey: 'idSede', as: 'sede' });
Residentes.hasMany(Pagos, { foreignKey: 'idResidente', as: 'pagos' });

Pagos.belongsTo(Residentes, { foreignKey: 'idResidente', as: 'residente' });
Pagos.belongsTo(Sedes, { foreignKey: 'idSede', as: 'sede' });

export { sequelize, Sedes, Habitaciones, Residentes, Pagos };
