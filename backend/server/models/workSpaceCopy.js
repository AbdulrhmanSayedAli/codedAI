import { Model } from 'sequelize';
import sequelize from './index.js';

class WorkSpaceCopy extends Model {
  static associate (models) {}
}
WorkSpaceCopy.init(
  {

  },
  {
    sequelize,
    modelName: 'WorkSpaceCopy'
  }
);

export default WorkSpaceCopy;
