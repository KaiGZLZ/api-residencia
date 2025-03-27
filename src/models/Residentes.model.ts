import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import { ResidenteAttributes } from '../types/residentes.types';
import { Habitacion } from './Habitaciones.model';

export interface ResidenteCreationAttributes
  extends Optional<
    ResidenteAttributes,
    'idResidente' | 'activo' | 'createdAt' | 'updatedAt'
  > {}

export class Residente
  extends Model<ResidenteAttributes, ResidenteCreationAttributes>
  implements ResidenteAttributes
{
  public idResidente!: number;
  public uuidResidente!: string;
  public nombre!: string;
  public telefono!: string;
  public correo!: string;
  public cedula!: string;
  public idSede!: number;
  public idHabitacion!: number;
  public activo!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;

  // Relaciones
  public habitacion?: Habitacion;

  public static associate(models: any) {
    Residente.belongsTo(models.Habitacion, {
      foreignKey: 'idHabitacion',
      as: 'habitacion',
    });
    Residente.belongsTo(models.Sede, { foreignKey: 'idSede', as: 'sede' });
    Residente.hasMany(models.Pago, { foreignKey: 'idResidente', as: 'pagos' });
  }
}

export default (sequelize: Sequelize) => {
  Residente.init(
    {
      idResidente: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      uuidResidente: {
        type: DataTypes.UUID,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      telefono: {
        type: DataTypes.STRING(20),
        defaultValue: '',
      },
      correo: {
        type: DataTypes.STRING(100),
        defaultValue: '',
      },
      cedula: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      idSede: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Sedes',
          key: 'idSede',
        },
      },
      idHabitacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Habitaciones',
          key: 'idHabitacion',
        },
      },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: 'Residentes',
      timestamps: true,
    }
  );

  return Residente;
};
