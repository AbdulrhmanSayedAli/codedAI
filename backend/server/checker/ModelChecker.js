const {
  isValidName,
  MainValidator,
  isTypeOf,
  findDuplicates,
} = require("./Utils/Utils");
const ErrorMessages = require("./Utils/ErrorMessages");
const ColumnChecker = require("./ColumnChecker");
const CheckerError = require("./Utils/CheckerError");

const ModelChecks = Object.freeze({
  columns: {
    type: "array",
    required: true,
  },
  timestambed: {
    type: "boolean",
  },
  isuser: {
    type: "boolean",
  },
  soft_delete: {
    type: "boolean",
  },
});

const ModelValidMetas = Object.freeze([
  "db_table",
  "ordering",
  "verbose_name",
  "verbose_name_plural",
  "abstract",
]);

const TypeOfMeta = Object.freeze({
  db_table: "string",
  ordering: "string",
  verbose_name: "string",
  verbose_name_plural: "string",
  abstract: "boolean",
});

class ModelChecker {
  static check(name, json) {
    MainValidator("model", name, json, ModelChecks);

    if (!isValidName(name))
      throw new CheckerError(ErrorMessages.InvalidName("model", name));

    if (json.columns.length == 0)
      throw new CheckerError(ErrorMessages.EmptyColumns);
    for (let col of json.columns) ColumnChecker.check(col.name, col);

    let column_names = [];
    for (let col of json.columns) column_names.push(col.name);
    const duplicates = findDuplicates(column_names);
    if (duplicates.length !== 0)
      throw new CheckerError(
        ErrorMessages.DuplicatedColumns(name, duplicates[0])
      );

    // checking model metas
    for (let prop in json.meta) {
      if (!ModelValidMetas.includes(prop))
        throw new CheckerError(
          ErrorMessages.NotInList(
            `model[${name}].meta.${prop}`,
            ModelValidMetas
          )
        );

      if (!isTypeOf(json.meta[prop], TypeOfMeta[prop]))
        throw new CheckerError(
          ErrorMessages.InvalidType(
            `model[${name}].meta.${prop}`,
            TypeOfMeta[prop]
          )
        );
    }
  }
}

module.exports = ModelChecker;
