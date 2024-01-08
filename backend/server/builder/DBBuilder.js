import DBChecker from '../checker/DBChecker.js';
import ModelBuilder from './ModelBuilder.js';
import Result from './Result.js';
class DBBuilder {
  static addPackageResult (json, result) {
    let addPackage = false;
    for (const model of json.models) {
      if (model[Object.keys(model)[0]].timestambed) {
        addPackage = true;
      }
    }
    if (addPackage) {
      result = [
        new Result(
          'Package',
          'Execute the following command to install the necessary package:',
          'pip install django-model-utils'
        ),
        ...result
      ];
    }
    return result;
  }

  static addMigrationsResult (result) {
    const migrations =
      'python manage.py makemigrations\npython manage.py migrate';
    result.push(
      new Result(
        'Apply your migrations',
        'Run the following commands to make and apply all changes to your models:',
        migrations
      )
    );
    return result;
  }

  static addUserModelResult (json, result) {
    let UserModel = null;
    for (const model of json.models) {
      if (model[Object.keys(model)[0]].isuser) {
        UserModel = Object.keys(model)[0];
      }
    }
    if (UserModel) {
      result.push(
        new Result(
          'Configure your User Model',
          'Add the following line to your settings.py file:',
          `AUTH_USER_MODEL = "yourapp.${UserModel}"`
        )
      );
    }
    return result;
  }

  // return Result[]
  static build (json) {
    DBChecker.check(json);
    let result = [];
    for (const model of json.models) {
      result.push(
        ...ModelBuilder.build(Object.keys(model)[0], model[Object.keys(model)[0]])
      );
    }
    result = this.addPackageResult(json, result);
    result = this.addUserModelResult(json, result);
    result = this.addMigrationsResult(result);

    return result;
  }
}

export default DBBuilder;
