import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import { SedeAttributes } from '../types/sedes.types';

export interface SedeCreationAttributes
  extends Optional<
    SedeAttributes,
    'idSede' | 'uuidSede' | 'createdAt' | 'updatedAt'
  > {}

export class Sede
  extends Model<SedeAttributes, SedeCreationAttributes>
  implements SedeAttributes
{
  public idSede!: number;
  public uuidSede!: string;
  public nombre!: string;
  public direccion!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

// Inicializa el modelo
export default (sequelize: Sequelize) => {
  Sede.init(
    {
      idSede: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      uuidSede: {
        type: DataTypes.UUID,
        unique: true,
        defaultValue: DataTypes.UUIDV4, // Se genera automáticamente
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      direccion: {
        type: DataTypes.STRING(255),
        defaultValue: '',
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
      tableName: 'Sedes',
      timestamps: true,
      indexes: [{ fields: ['uuidSede'] }],
    }
  );

  return Sede;
};
