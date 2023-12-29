import CheckerError from './CheckerError.js';
import ErrorMessages from './ErrorMessages.js';

export const isValidName = (className) => {
  const classNameRegex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
  return classNameRegex.test(className);
};

export const isTypeOf = (obj, cls) => {
  if (cls === 'any') return true;
  if (cls === 'array') return Array.isArray(obj);
  // eslint-disable-next-line valid-typeof
  return typeof obj === cls;
};

export const InitialChecks = (name, nameForRequired, val, type, required) => {
  if (val === null || val === undefined) {
    if (!required) return;
    throw new CheckerError(ErrorMessages.NotFound(nameForRequired));
  }

  if (!isTypeOf(val, type)) {
    throw new CheckerError(ErrorMessages.InvalidType(name, type));
  }
};

export const MainValidator = (prefname, name, json, List) => {
  for (const prop in List) {
    if (
      !List[prop].required &&
      (json[prop] === null || json[prop] === undefined)
    ) {
      continue;
    }

    InitialChecks(
      `${prefname}${name ? `[${name}]` : ''}.${prop}=${json[prop]}`,
      `${prefname}.${prop}`,
      json[prop],
      List[prop].type,
      List[prop].required
    );

    if (List[prop].choices) {
      if (!List[prop].choices.includes(json[prop])) {
        throw new CheckerError(
          ErrorMessages.NotInList(
            `${prefname}${name ? `[${name}]` : ''}.${prop}=${json[prop]}`,
            List[prop].choices
          )
        );
      }
    }
  }
};

export const findDuplicates = (arr) => {
  const uniqueValues = new Set();
  const duplicates = [];

  for (const value of arr) {
    if (uniqueValues.has(value)) {
      duplicates.push(value);
    } else {
      uniqueValues.add(value);
    }
  }

  return duplicates;
};
