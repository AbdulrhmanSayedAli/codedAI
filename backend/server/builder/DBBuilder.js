import { check } from '../checker/DBChecker'
import { build as _build } from './ModelBuilder'
import Result from './Result'
class DBBuilder {
  // return Result[]
  static build (json) {
    check(json)
    let result = []
    let addPackage = false
    for (const model of json.models) {
      result.push(
        ..._build(Object.keys(model)[0], model[Object.keys(model)[0]])
      )
      if (model[Object.keys(model)[0]].timestambed) {
        addPackage = true
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
      ]
    }

    const migrations =
      'python manage.py makemigrations\npython manage.py migrate'
    result.push(
      new Result(
        'Apply your migrations',
        'Run the following commands to make and apply all changes to your models:',
        migrations
      )
    )
    return result
  }
}

export default DBBuilder
