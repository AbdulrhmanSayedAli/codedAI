import Result from './Result';
import { ParseValueToString } from './Utils/Utils';
import { build as _build } from './ColumnBuilder';

class ModelBuilder {
  static getHeader (name, json) {
    return `class ${name}(models.Model):`;
  }

  static getColumns (json) {
    let result = '';
    for (const col of json.columns) {
      result += '   ' + _build(col.name, col) + '\n';
    }
    return result;
  }

  static getMeta (json) {
    let result = '   class Meta:' + '\n';
    for (const prop in json.meta) {
      result +=
        '       ' + prop + ' = ' + ParseValueToString(json.meta[prop]) + '\n';
    }
    return result;
  }

  // return Result[]
  static build (name, json) {
    let code = '';
    code += this.getHeader(name, json) + '\n';
    if (json.columns) code += this.getColumns(json) + '\n';
    if (json.meta) code += this.getMeta(json) + '\n';
    const title = `${name} model`;
    const message =
      'Insert the following code snippet into your models.py file:';

    let imports = 'from django.db import models';
    if (json.timestambed) {
      imports += '\nfrom model_utils.models import TimeStampedModel';
    }
    if (json.isuser) {
      imports += '\nfrom django.contrib.auth.models import AbstractUser';
    }

    return [new Result(title, message, imports + '\n\n' + code)];
  }
}

export default ModelBuilder;
