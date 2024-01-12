import { DataTypes, Model } from 'sequelize';
import sequelize from './index.js';

class Result extends Model {
  static associate (models) {}
}
Result.init(
  {
    message: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
    code: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: 'Result'
  }
);

export default Result;
