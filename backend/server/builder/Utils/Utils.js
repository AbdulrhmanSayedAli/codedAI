export const removeLastComma = (text) => {
  if (text.endsWith(', ')) text = text.slice(0, text.length - 2);
  else if (text.endsWith(',')) text = text.slice(0, text.length - 1);
  return text;
};

export const joinWithCommas = (array) => {
  if (array.length === 0) return '';
  let result = '';
  for (const a of array)result += `${a}, `;
  return removeLastComma(result);
};

export const parseValueToString = (value) => {
  if (Array.isArray(value)) {
    const arrayString = value.map((v) => parseValueToString(v)).join(', ');
    return `[${arrayString}]`;
  } else if (typeof value === 'string') {
    return `"${value}"`;
  } else if (typeof value === 'boolean') {
    return value ? 'True' : 'False';
  } else {
    return String(value);
  }
};

export const capitalizeString = (str) => {
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
  return capitalizeString(type) + 'Field';
};
