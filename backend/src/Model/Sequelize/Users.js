import { DataTypes, Sequelize } from 'sequelize';
import { sequelizeInstance } from '../../Utils/DbConnector/sequelize';
import { USERS_TABLE } from '../../Config/tableConfig';

export const UserSchema = {
  uid: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  fullname: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'user',
  },
  photo: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  pwd_hash: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  pwd_salt: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  created_on: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('now()'),
  },
  updated_on: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('now()'),
  },
};

export default sequelizeInstance.define(USERS_TABLE, UserSchema, {
  timestamps: true,
  createdAt: 'created_on',
  updatedAt: 'updated_on',
});
