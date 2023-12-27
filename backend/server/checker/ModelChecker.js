import {
  isValidName,
  MainValidator,
  isTypeOf,
  findDuplicates
} from './Utils/Utils'
import {
  InvalidName,
  EmptyColumns,
  DuplicatedColumns,
  NotInList,
  InvalidType
} from './Utils/ErrorMessages'
import { check as _check } from './ColumnChecker'
import CheckerError from './Utils/CheckerError'

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
})

const ModelValidMetas = Object.freeze([
  'db_table',
  'ordering',
  'verbose_name',
  'verbose_name_plural',
  'abstract'
])

const TypeOfMeta = Object.freeze({
  db_table: 'string',
  ordering: 'string',
  verbose_name: 'string',
  verbose_name_plural: 'string',
  abstract: 'boolean'
})

class ModelChecker {
  static check (name, json) {
    MainValidator('model', name, json, ModelChecks)

    if (!isValidName(name)) {
      throw new CheckerError(InvalidName('model', name))
    }

    if (json.columns.length === 0) {
      throw new CheckerError(EmptyColumns)
    }
    for (const col of json.columns) _check(col.name, col)

    const columnNames = []
    for (const col of json.columns) columnNames.push(col.name)
    const duplicates = findDuplicates(columnNames)
    if (duplicates.length !== 0) {
      throw new CheckerError(DuplicatedColumns(name, duplicates[0]))
    }

    // checking model metas
    for (const prop in json.meta) {
      if (!ModelValidMetas.includes(prop)) {
        throw new CheckerError(
          NotInList(`model[${name}].meta.${prop}`, ModelValidMetas)
        )
      }

      if (!isTypeOf(json.meta[prop], TypeOfMeta[prop])) {
        throw new CheckerError(
          InvalidType(`model[${name}].meta.${prop}`, TypeOfMeta[prop])
        )
      }
    }
  }
}

export default ModelChecker
