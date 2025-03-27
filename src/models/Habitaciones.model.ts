import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import { HabitacionAttributes } from '../types/habitaciones.types';

export interface HabitacionCreationAttributes
  extends Optional<
    HabitacionAttributes,
    'idHabitacion' | 'createdAt' | 'updatedAt'
  > {}

export class Habitacion
  extends Model<HabitacionAttributes, HabitacionCreationAttributes>
  implements HabitacionAttributes
{
  public idHabitacion!: number;
  public numeroHabitacion!: number;
  public precio!: number;
  public idSede!: number;
  public activo!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

// Inicializa el modelo
export default (sequelize: Sequelize) => {
  Habitacion.init(
    {
      idHabitacion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      numeroHabitacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      idSede: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Sedes',
          key: 'idSede',
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
      tableName: 'Habitaciones',
      timestamps: true,
      indexes: [{ fields: ['idSede'] }],
    }
  );

  return Habitacion;
};
