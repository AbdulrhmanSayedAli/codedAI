const Result = require("./Result");
const { ParseValueToString } = require("./Utils/Utils");
const ColumnBuilder = require("./ColumnBuilder");

class ModelBuilder {
  static getHeader(name, json) {
    return `class ${name}(models.Model):`;
  }
  static getColumns(json) {
    let result = "";
    for (let col of json.columns) {
      result += "   " + ColumnBuilder.build(col.name, col) + "\n";
    }
    return result;
  }
  static getMeta(json) {
    let result = "   class Meta:" + "\n";
    for (let prop in json.meta) {
      result +=
        "       " + prop + " = " + ParseValueToString(json.meta[prop]) + "\n";
    }
    return result;
  }

  //return Result[]
  static build(name, json) {
    let code = "";
    code += this.getHeader(name, json) + "\n";
    if (json.columns) code += this.getColumns(json) + "\n";
    if (json.meta) code += this.getMeta(json) + "\n";
    const title = `${name} model`;
    const message = "Insert the following code snippet into your models.py file:";

    let imports = "from django.db import models";
    if (json.timestambed)
      imports += "\nfrom model_utils.models import TimeStampedModel";
    if (json.isuser)
      imports += "\nfrom django.contrib.auth.models import AbstractUser";

    return [new Result(title, message, imports + "\n\n" + code)];
  }
}

module.exports = ModelBuilder;
