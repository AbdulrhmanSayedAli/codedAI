import { DataTypes, Model } from 'sequelize';
import sequelize from './index.js';

class WorkSpace extends Model {
  static associate (models) {}
}
WorkSpace.init(
  {
    name: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    isPublic: {
      type: DataTypes.BOOLEAN
    }
  },
  {
    sequelize,
    modelName: 'WorkSpace'
  }
);

export default WorkSpace;
