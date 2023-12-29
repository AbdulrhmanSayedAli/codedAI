import Result from './Result.js';
import { ParseValueToString } from './Utils/Utils.js';
import ColumnBuilder from './ColumnBuilder.js';

class ModelBuilder {
  static getImports (json) {
    let res = 'from django.db import models\n';
    if (json.timestambed) {
      res += '\nfrom model_utils.models import TimeStampedModel';
    }
    if (json.isuser) {
      res += '\nfrom django.contrib.auth.models import AbstractUser';
    }
    return res;
  }

  static getHeader (name, json) {
    const headers = [];
    if (json.timestambed) headers.push('TimeStampedModel');
    if (json.isuser) headers.push('AbstractUser');

    if (headers.length === 0) { return `class ${name}(models.Model):`; } else {
      let headersStr = '';
      for (let i = 0; i < headers.length - 1; i++)headersStr += headers[i] + ' , ';
      headersStr += headers[headers.length - 1];
      return `class ${name}(${headersStr}):`;
    }
  }

  static getColumns (json) {
    let result = '';
    for (const col of json.columns) {
      result += '   ' + ColumnBuilder.build(col.name, col) + '\n';
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

    const imports = this.getImports(json);

    return [new Result(title, message, imports + '\n\n' + code)];
  }
}

export default ModelBuilder;
