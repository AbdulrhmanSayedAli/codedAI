import { DataTypes, Model } from 'sequelize';
import sequelize from './index.js';

class InviteToWorkSpace extends Model {
  static associate (models) {}
}
InviteToWorkSpace.init(
  {
    email: {
      type: DataTypes.STRING
    },
    isAccepted: {
      type: DataTypes.BOOLEAN
    },
    date: {
      type: DataTypes.DATE
    },
    hasEditAccess: {
      type: DataTypes.BOOLEAN
    }
  },
  {
    sequelize,
    modelName: 'InviteToWorkSpace'
  }
);

export default InviteToWorkSpace;
