import CheckerError from './CheckerError';
import { NotFound, InvalidType, NotInList } from './ErrorMessages';

const isValidName = (className) => {
  const classNameRegex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
  return classNameRegex.test(className);
};

const isTypeOf = (obj, cls) => {
  if (cls === 'any') return true;
  if (cls === 'array') return Array.isArray(obj);
  return Object.prototype.toString.call(obj) === cls;
};

const InitialChecks = (name, nameForRequired, val, type, required) => {
  if (val === null || val === undefined) {
    if (!required) return;
    throw new CheckerError(NotFound(nameForRequired));
  }

  if (!isTypeOf(val, type)) {
    throw new CheckerError(InvalidType(name, type));
  }
};

const MainValidator = (prefname, name, json, List) => {
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
          NotInList(
            `${prefname}${name ? `[${name}]` : ''}.${prop}=${json[prop]}`,
            List[prop].choices
          )
        );
      }
    }
  }
};

const findDuplicates = (arr) => {
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

export default {
  isValidName,
  isTypeOf,
  InitialChecks,
  findDuplicates,
  MainValidator
};
