import Result from './Result.js';
import { JoinWithCommas, ParseValueToString } from './Utils/Utils.js';
import ColumnBuilder from './ColumnBuilder.js';

class ModelBuilder {
  static getImports (json) {
    let res = 'from django.db import models';
    if (json.timestambed) {
      res += '\nfrom model_utils.models import TimeStampedModel';
    }

    if (json.soft_delete) {
      res += '\nfrom model_utils.models import SoftDeletableModel';
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
    if (json.soft_delete) headers.push('SoftDeletableModel');

    if (headers.length === 0) { headers.push('models.Model'); }

    return `class ${name}(${JoinWithCommas(headers)}):`;
  }

  static getColumns (json) {
    let result = '';
    for (const col of json.columns) {
      result += '   ' + ColumnBuilder.build(col.name, col) + '\n';
    }
    return result;
  }

  static getMeta (json) {
    let result = '\n   class Meta:' + '\n';
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
    if (json.columns) code += this.getColumns(json);
    if (json.meta) code += this.getMeta(json);
    const title = `${name} model`;
    const message =
      'Insert the following code snippet into your models.py file:';

    const imports = this.getImports(json);

    return [new Result(title, message, imports + '\n\n' + code)];
  }
}

export default ModelBuilder;
