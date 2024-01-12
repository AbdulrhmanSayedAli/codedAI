import { DataTypes, Model } from 'sequelize';
import sequelize from './index.js';

class InviteToCompany extends Model {
  static associate (models) {}
}
InviteToCompany.init(
  {
    email: {
      type: DataTypes.STRING
    },
    isAccepted: {
      type: DataTypes.BOOLEAN
    },
    date: {
      type: DataTypes.DATE
    }

  },
  {
    sequelize,
    modelName: 'InviteToCompany'
  }
);

export default InviteToCompany;
