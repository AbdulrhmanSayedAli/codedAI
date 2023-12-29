import { MainValidator, findDuplicates } from './Utils/Utils.js';
import ModelChecker from './ModelChecker.js';
import CheckerError from './Utils/CheckerError.js';
import ErrorMessages from './Utils/ErrorMessages.js';

const DBChecks = Object.freeze({
  models: {
    type: 'array',
    required: true
  }
});

const OnDeleteValues = Object.freeze([
  'CASCADE',
  'PROTECT',
  'SET_NULL',
  'SET_DEFAULT',
  'DO_NOTHING'
]);

const getRelationChecks = (requireOnDelete) => {
  const res = {
    to: { type: 'string', required: true }
  };
  if (requireOnDelete) {
    res.on_delete = {
      type: 'string',
      required: requireOnDelete,
      choices: OnDeleteValues
    };
  }
  return res;
};

class DBChecker {
  static check (json) {
    MainValidator('database', 'root', json, DBChecks);

    for (const model of json.models) {
      if (Object.keys(model).length !== 1) {
        throw new CheckerError(ErrorMessages.InvalidModel);
      }
      ModelChecker.check(Object.keys(model)[0], model[Object.keys(model)[0]]);
    }

    const modelNames = [];
    for (const model of json.models) modelNames.push(Object.keys(model)[0]);
    const duplicates = findDuplicates(modelNames);
    if (duplicates.length !== 0) {
      throw new CheckerError(ErrorMessages.DuplicatedModels(duplicates[0]));
    }

    // relationships checks

    const checkRelation = (model, column, relationName, requireOnDelete) => {
      if (column.type === relationName) {
        if (!column[relationName]) {
          throw new CheckerError(
            ErrorMessages.NotFound(
              `${Object.keys(model)[0]}.${column.name}.${relationName}`
            )
          );
        }

        MainValidator(
          `${Object.keys(model)[0]}.${column.name}.${relationName}`,
          '',
          column[relationName],
          getRelationChecks(requireOnDelete)
        );
        if (!modelNames.includes(column[relationName].to)) {
          throw new CheckerError(
            ErrorMessages.ModelNameNotFound(
              column[relationName].to,
              `${Object.keys(model)[0]}.${column.name}`
            )
          );
        }
      }
    };

    let hasUser = false;

    for (const model of json.models) {
      for (const column of model[Object.keys(model)[0]].columns) {
        checkRelation(model, column, 'foreign_key', true);
        checkRelation(model, column, 'one_to_one', true);
        checkRelation(model, column, 'many_to_many', false);
      }

      if (model[Object.keys(model)[0]].isuser) {
        if (hasUser) {
          throw new CheckerError(ErrorMessages.DuplicatedUserModel);
        }

        hasUser = true;
      }
    }
  }
}

export default DBChecker;
