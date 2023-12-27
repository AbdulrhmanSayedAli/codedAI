const CheckerError = require("./CheckerError");
const ErrorMessages = require("./ErrorMessages");

const isValidName = (className) => {
  const classNameRegex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
  return classNameRegex.test(className);
};

const isTypeOf = (obj, cls) => {
  if (cls === "any") return true;
  if (cls === "array") return Array.isArray(obj);
  return typeof obj === cls;
};

const InitialChecks = (name, name_for_required, val, type, required) => {
  if (val === null || val === undefined) {
    if (!required) return;
    throw new CheckerError(ErrorMessages.NotFound(name_for_required));
  }

  if (!isTypeOf(val, type))
    throw new CheckerError(ErrorMessages.InvalidType(name, type));
};

const MainValidator = (prefname, name, json, List) => {
  for (let prop in List) {
    if (
      !List[prop].required &&
      (json[prop] === null || json[prop] === undefined)
    )
      continue;

    InitialChecks(
      `${prefname}${name ? `[${name}]` : ""}.${prop}=${json[prop]}`,
      `${prefname}.${prop}`,
      json[prop],
      List[prop].type,
      List[prop].required
    );

    if (List[prop].choices) {
      if (!List[prop].choices.includes(json[prop]))
        throw new CheckerError(
          ErrorMessages.NotInList(
            `${prefname}${name ? `[${name}]` : ""}.${prop}=${json[prop]}`,
            List[prop].choices
          )
        );
    }
  }
};

const findDuplicates = (arr) => {
  let uniqueValues = new Set();
  let duplicates = [];

  for (let value of arr) {
    if (uniqueValues.has(value)) {
      duplicates.push(value);
    } else {
      uniqueValues.add(value);
    }
  }

  return duplicates;
};

module.exports = {
  isValidName,
  isTypeOf,
  InitialChecks,
  findDuplicates,
  MainValidator,
};
