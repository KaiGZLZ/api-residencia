import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import { PagoAttributes } from '../types/pagos.types';

export interface PagoCreationAttributes
  extends Optional<PagoAttributes, 'idPago' | 'createdAt' | 'updatedAt'> {}

export class Pago
  extends Model<PagoAttributes, PagoCreationAttributes>
  implements PagoAttributes
{
  public idPago!: number;
  public uuidPago!: string;
  public idHabitacion!: number;
  public idResidente!: number;
  public idSede!: number;
  public monto!: number;
  public urlComprobante!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  public static associate(models: any) {
    Pago.belongsTo(models.Residente, {
      foreignKey: 'idResidente',
      as: 'residente',
    });
    Pago.belongsTo(models.Sede, { foreignKey: 'idSede', as: 'sede' });
  }
}

export default (sequelize: Sequelize) => {
  Pago.init(
    {
      idPago: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      uuidPago: {
        type: DataTypes.UUID,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
      },
      monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      idHabitacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Habitaciones',
          key: 'idHabitacion',
        },
      },
      idResidente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Residentes',
          key: 'idResidente',
        },
      },
      idSede: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Sedes',
          key: 'idSede',
        },
      },
      urlComprobante: {
        type: DataTypes.STRING,
        allowNull: false,
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
      tableName: 'Pagos',
      timestamps: true,
    }
  );

  return Pago;
};
