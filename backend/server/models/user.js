import { DataTypes, Model } from 'sequelize';
import sequelize from './index.js';

class User extends Model {

}
User.init(
  {
    userName: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    },
    lastPaidOn: {
      type: DataTypes.DATE
    },
    companyId: {
      type: DataTypes.INTEGER
    },
    companyName: {
      type: DataTypes.STRING
    },
    companyDescription: {
      type: DataTypes.STRING
    },
    isVerified: {
      type: DataTypes.BOOLEAN
    },
    isCompany: {
      type: DataTypes.BOOLEAN
    }

  },
  {
    sequelize,
    modelName: 'User'

  }
);

export default User;
