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
    nodes: {
      type: DataTypes.JSON
    },
    edges: {
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
    },
    isColse: {
      type: DataTypes.BOOLEAN
    }
  },
  {
    sequelize,
    modelName: 'CheckPoints'
  }
);

export default CheckPoints;
