const DBChecker = require("../checker/DBChecker");
const ModelBuilder = require("./ModelBuilder");
const Result = require("./Result");
class DBBuilder {
  //return Result[]
  static build(json) {
    DBChecker.check(json);
    let result = [];
    let addPackage = false;
    for (let model of json.models) {
      result.push(
        ...ModelBuilder.build(
          Object.keys(model)[0],
          model[Object.keys(model)[0]]
        )
      );
      if (model[Object.keys(model)[0]].timestambed) {
        addPackage = true;
      }
    }
    if (addPackage) {
      result = [
        new Result(
          "Package",
          "Execute the following command to install the necessary package:",
          "pip install django-model-utils"
        ),
        ...result,
      ];
    }

    let migrations =
      "python manage.py makemigrations\npython manage.py migrate";
    result.push(
      new Result(
        "Apply your migrations",
        "Run the following commands to make and apply all changes to your models:",
        migrations
      )
    );
    return result;
  }
}

module.exports = DBBuilder;
