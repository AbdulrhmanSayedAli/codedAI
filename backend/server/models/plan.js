import { DataTypes, Model } from 'sequelize';
import sequelize from './index.js';

class Plan extends Model {

}
Plan.init(
  {
    name: {
      type: DataTypes.STRING
    },
    months: {
      type: DataTypes.INTEGER
    },
    price: {
      type: DataTypes.DOUBLE
    }
  },
  {
    sequelize,
    modelName: 'Plan'
  }
);

export default Plan;
