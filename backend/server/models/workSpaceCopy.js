import { DataTypes, Model } from 'sequelize';
import sequelize from './index.js';

class WorkSpaceCopy extends Model {
  static associate (models) {}
}
WorkSpaceCopy.init(
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
    modelName: 'WorkSpaceCopy'
  }
);

export default WorkSpaceCopy;
