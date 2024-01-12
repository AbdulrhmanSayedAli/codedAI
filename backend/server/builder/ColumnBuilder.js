import { getColumnType, joinWithCommas, parseValueToString } from './Utils/Utils.js';

class ColumnBuilder {
  static build (name, json) {
    let result = name + ' = models.' + getColumnType(json.type) + '(';
    const columns = [];
    if (json.type === 'foreign_key') {
      columns.push(json.foreign_key.to);
      columns.push(`on_delete=models.${json.foreign_key.on_delete}`);
    }
    if (json.type === 'one_to_one') {
      columns.push(json.one_to_one.to);
      columns.push(`on_delete=models.${json.one_to_one.on_delete}`);
    }
    if (json.type === 'many_to_many') {
      columns.push(json.many_to_many.to);
    }

    for (const prop in json.properties) {
      columns.push(`${prop}=${parseValueToString(json.properties[prop])}`);
    }
    result += joinWithCommas(columns);
    result += ')';
    return result;
  }
}

export default ColumnBuilder;
