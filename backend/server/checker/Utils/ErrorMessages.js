let ErrorMessages = {
  CheckerErrorName: "Tastify checker error",
  EmptyColumns: "Columns cannot be empty. Please provide at least one column.",
  InvalidType: (name, type) =>
    `Invalid '${name}' type. Please make sure to provide the correct data type (${type}) for '${name}'.`,
  NotFound: (name) =>
    `Unable to find the '${name}' field. Please make sure to include the required '${name}' field in your json file.`,
  InvalidName: (name, currentVal) =>
    `Invalid ${name} name '${currentVal}'. Please use a valid ${name} name.`,
  NotInList: (name, list) => {
    let types = "";
    for (let i of list) {
      types += `"${i}", `;
    }
    return `'${name}' doesn't match with these keys (${types}).`;
  },
  DuplicatedColumns: (model, name) => {
    return `Duplicate column name '${name}' in model '${model}'`;
  },
  DuplicatedModels: (name) => {
    return `Duplicate model name '${name}' in database`;
  },

  InvalidModel: "Invalid model structure.",
  ModelNameNotFound: (name, path) => {
    return `Model '${name}' not found for foreign key in [${path}].`;
  },

  DuplicatedUserModel: "Specify 'isuser=true' for a single model only.",

  DefaultValueNotInChoices: (name, list) => {
    let choices = "";
    for (let i of list) {
      choices += `"${i}", `;
    }

    return `The default value for '${name}' does not align with the valid choices for this column [${choices}].`;
  },
};

module.exports = ErrorMessages;
