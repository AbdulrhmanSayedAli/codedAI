import { getColumnType, ParseValueToString } from './Utils/Utils'

class ColumnBuilder {
  static build (name, json) {
    let result = name + ' = models.' + getColumnType(json.type) + '('
    if (json.type === 'foreign_key') {
      result += json.foreign_key.to + ','
      result += 'on_delete=models.' + json.foreign_key.on_delete + ','
    }
    if (json.type === 'one_to_one') {
      result += json.one_to_one.to + ','
      result += 'on_delete=models.' + json.one_to_one.on_delete + ','
    }
    if (json.type === 'many_to_many') {
      result += json.many_to_many.to + ','
    }

    for (const prop in json.properties) {
      result += prop + '=' + ParseValueToString(json.properties[prop]) + ','
    }
    result += ')'
    return result
  }
}

export default ColumnBuilder
