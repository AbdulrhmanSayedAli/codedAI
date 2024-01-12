import { DataTypes, Model } from 'sequelize';
import sequelize from './index.js';

class Project extends Model {
  static associate (models) {}
}
Project.init(
  {
    name: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: 'Project'
  }
);

export default Project;
