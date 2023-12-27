import { DataTypes, Model } from 'sequelize'
import sequelize from './index.js'


 class News extends Model {
  static associate(models) {

  }
}
News.init(
  {
      image:
      {
          type: DataTypes.STRING,
      },
      title:
      {
          type: DataTypes.STRING,
      },
      body:
      {
          type: DataTypes.STRING,

      }

  },
  {
      sequelize,
      modelName: "News",
  }
)

export default News