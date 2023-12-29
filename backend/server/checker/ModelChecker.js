import {
  isValidName,
  MainValidator,
  isTypeOf,
  findDuplicates
} from './Utils/Utils.js';
import ErrorMessages from './Utils/ErrorMessages.js';
import ColumnChecker from './ColumnChecker.js';
import CheckerError from './Utils/CheckerError.js';

const ModelChecks = Object.freeze({
  columns: {
    type: 'array',
    required: true
  },
  timestambed: {
    type: 'boolean'
  },
  isuser: {
    type: 'boolean'
  },
  soft_delete: {
    type: 'boolean'
  }
});

const ModelValidMetas = Object.freeze([
  'db_table',
  'ordering',
  'verbose_name',
  'verbose_name_plural',
  'abstract'
]);

const TypeOfMeta = Object.freeze({
  db_table: 'string',
  ordering: 'string',
  verbose_name: 'string',
  verbose_name_plural: 'string',
  abstract: 'boolean'
});

class ModelChecker {
  static check (name, json) {
    MainValidator('model', name, json, ModelChecks);

    if (!isValidName(name)) {
      throw new CheckerError(ErrorMessages.InvalidName('model', name));
    }

    if (json.columns.length === 0) {
      throw new CheckerError(ErrorMessages.EmptyColumns);
    }
    for (const col of json.columns) ColumnChecker.check(col.name, col);

    const columnNames = [];
    for (const col of json.columns) columnNames.push(col.name);
    const duplicates = findDuplicates(columnNames);
    if (duplicates.length !== 0) {
      throw new CheckerError(ErrorMessages.DuplicatedColumns(name, duplicates[0]));
    }

    // checking model metas
    for (const prop in json.meta) {
      if (!ModelValidMetas.includes(prop)) {
        throw new CheckerError(
          ErrorMessages.NotInList(`model[${name}].meta.${prop}`, ModelValidMetas)
        );
      }

      if (!isTypeOf(json.meta[prop], TypeOfMeta[prop])) {
        throw new CheckerError(
          ErrorMessages.InvalidType(`model[${name}].meta.${prop}`, TypeOfMeta[prop])
        );
      }
    }
  }
}

export default ModelChecker;
