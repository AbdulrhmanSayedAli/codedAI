import { DataTypes, Model } from 'sequelize';
import sequelize from './index.js';

class CheckPoints extends Model {
  static associate (models) {}
}
CheckPoints.init(
  {
    json: {
      type: DataTypes.JSON
    },
    name: {
      type: DataTypes.STRING
    },
    descriprion: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    modelName: 'CheckPoints'
  }
);

export default CheckPoints;
