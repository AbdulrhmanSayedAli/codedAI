import { MainValidator, isValidName, isTypeOf } from './Utils/Utils';
import {
  InvalidName,
  NotInList,
  InvalidType,
  DefaultValueNotInChoices
} from './Utils/ErrorMessages';
import CheckerError from './Utils/CheckerError';

const ColumnValidTypes = Object.freeze([
  'char',
  'text',
  'date',
  'datetime',
  'decimal',
  'email',
  'file',
  'image',
  'integer',
  'positiveinteger',
  'positivesmallinteger',
  'boolean',
  'url',
  'foreign_key',
  'many_to_many',
  'one_to_one',
  'uuid'
]);

const ColumnChecks = Object.freeze({
  name: {
    type: 'string',
    required: true
  },
  type: {
    type: 'string',
    choices: ColumnValidTypes,
    required: true
  }
});

const ColumnValidProprties = Object.freeze([
  'null',
  'blank',
  'unique',
  'default',
  'max_length',
  'editable',
  'db_column',
  'choices',
  'max_digits',
  'decimal_places',
  'help_text',
  'auto_now_add',
  'auto_now',
  'autoincrement',
  'serialize',
  'related_name',
  'primary_key'
]);

const TypeOfProprtie = Object.freeze({
  null: 'boolean',
  blank: 'boolean',
  unique: 'boolean',
  default: 'any',
  max_length: 'number',
  editable: 'boolean',
  db_column: 'string',
  choices: 'array',
  max_digits: 'number',
  decimal_places: 'number',
  help_text: 'string',
  auto_now_add: 'boolean',
  auto_now: 'boolean',
  autoincrement: 'boolean',
  serialize: 'boolean',
  primary_key: 'boolean',
  related_name: 'string'
});

class ColumnChecker {
  static check (name, json) {
    // checking for values
    MainValidator('column', name, json, ColumnChecks);

    if (!isValidName(name)) {
      throw new CheckerError(InvalidName('column', name));
    }

    // checking column properties
    for (const prop in json.properties) {
      if (!ColumnValidProprties.includes(prop)) {
        throw new CheckerError(
          NotInList(`column[${name}].properties.${prop}`, ColumnValidProprties)
        );
      }

      if (!isTypeOf(json.properties[prop], TypeOfProprtie[prop])) {
        throw new CheckerError(
          InvalidType(
            `column[${name}].properties.${prop}`,
            TypeOfProprtie[prop]
          )
        );
      }
    }

    // checking if default value exists in choices

    if (json.properties && json.properties.default && json.properties.choices) {
      if (!json.properties.choices.includes(json.properties.default)) {
        throw new CheckerError(
          DefaultValueNotInChoices(
            `${name}=${json.properties.default}`,
            json.properties.choices
          )
        );
      }
    }
  }
}

export default ColumnChecker;
