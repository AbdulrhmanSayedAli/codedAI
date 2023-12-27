const { MainValidator, findDuplicates } = require("./Utils/Utils");
const ModelChecker = require("./ModelChecker");
const CheckerError = require("./Utils/CheckerError");
const ErrorMessages = require("./Utils/ErrorMessages");

const DBChecks = Object.freeze({
  models: {
    type: "array",
    required: true,
  },
});

const OnDeleteValues = Object.freeze([
  "CASCADE",
  "PROTECT",
  "SET_NULL",
  "SET_DEFAULT",
  "DO_NOTHING",
]);

const getRelationChecks = (require_on_delete) => {
  let res = {
    to: { type: "string", required: true },
  };
  if (require_on_delete) {
    res.on_delete = {
      type: "string",
      required: require_on_delete,
      choices: OnDeleteValues,
    };
  }
  return res;
};

class DBChecker {
  static check(json) {
    MainValidator("database", "root", json, DBChecks);

    for (let model of json.models) {
      if (Object.keys(model).length !== 1)
        throw new CheckerError(ErrorMessages.InvalidModel);
      ModelChecker.check(Object.keys(model)[0], model[Object.keys(model)[0]]);
    }

    let model_names = [];
    for (let model of json.models) model_names.push(Object.keys(model)[0]);
    const duplicates = findDuplicates(model_names);
    if (duplicates.length !== 0)
      throw new CheckerError(ErrorMessages.DuplicatedModels(duplicates[0]));

    //relationships checks

    const checkRelation = (model, column, relation_name, require_on_delete) => {
      if (column.type === relation_name) {
        if (!column[relation_name])
          throw new CheckerError(
            ErrorMessages.NotFound(
              `${Object.keys(model)[0]}.${column.name}.${relation_name}`
            )
          );

        MainValidator(
          `${Object.keys(model)[0]}.${column.name}.${relation_name}`,
          "",
          column[relation_name],
          getRelationChecks(require_on_delete)
        );
        if (!model_names.includes(column[relation_name].to))
          throw new CheckerError(
            ErrorMessages.ModelNameNotFound(
              column[relation_name].to,
              `${Object.keys(model)[0]}.${column.name}`
            )
          );
      }
    };


    let hasUser = false; 

    for (let model of json.models) {
      for (let column of model[Object.keys(model)[0]].columns) {
        checkRelation(model, column, "foreign_key", true);
        checkRelation(model, column, "one_to_one", true);
        checkRelation(model, column, "many_to_many", false);
      }

      if (model[Object.keys(model)[0]].isuser){
          if(hasUser){
            throw new CheckerError(ErrorMessages.DuplicatedUserModel);
          }

          hasUser = true;
      }



    }
  }
}

module.exports = DBChecker;
