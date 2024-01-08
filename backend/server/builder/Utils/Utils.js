export const removeLastComma = (text) => {
  if (text.endsWith(', ')) text = text.slice(0, text.length - 2);
  else if (text.endsWith(',')) text = text.slice(0, text.length - 1);
  return text;
};

export const JoinWithCommas = (array) => {
  if (array.length === 0) return '';
  let result = '';
  for (const a of array)result += `${a}, `;
  return removeLastComma(result);
};

export const ParseValueToString = (value) => {
  let result = '';
  if (Array.isArray(value)) {
    result += '[';
    for (const v of value) {
      result += ParseValueToString(v) + ', ';
    }
    result = removeLastComma(result);
    result += ']';
  } else if (typeof value === 'string') {
    result = '"' + value + '"';
  } else {
    result += value;
  }

  return result;
};

export const CapitalizeString = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getColumnType = (type) => {
  if (type === 'url') return 'URLField';
  if (type === 'datetime') return 'DateTimeField';
  if (type === 'positiveinteger') return 'PositiveIntegerField';
  if (type === 'positivesmallinteger') return 'PositiveSmallIntegerField';
  if (type === 'foreign_key') return 'ForeignKey';
  if (type === 'many_to_many') return 'ManyToManyField';
  if (type === 'one_to_one') return 'OneToOneField';
  if (type === 'uuid') return 'UUIDField';
  return CapitalizeString(type) + 'Field';
};
