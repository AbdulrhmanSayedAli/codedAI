import { DataTypes, Model } from 'sequelize';
import sequelize from './index.js';

class News extends Model {
  static associate (models) {}
}
News.init(
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
    modelName: 'News'
  }
);

export default News;
