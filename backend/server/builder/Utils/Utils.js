const ParseValueToString = (value) => {
  let result = ''
  if (Array.isArray(value)) {
    result += '['
    for (const v of value) {
      result += ParseValueToString(v) + ','
    }
    result += ']'
  } else if (typeof value === 'string') {
    result = '"' + value + '"'
  } else {
    result += value
  }

  return result
}

const CapitalizeString = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const getColumnType = (type) => {
  if (type === 'url') return 'URLField'
  if (type === 'datetime') return 'DateTimeField'
  if (type === 'positiveinteger') return 'PositiveIntegerField'
  if (type === 'positivesmallinteger') return 'PositiveSmallIntegerField'
  if (type === 'foreign_key') return 'ForeignKey'
  if (type === 'many_to_many') return 'ManyToManyField'
  if (type === 'one_to_one') return 'OneToOneField'
  if (type === 'uuid') return 'UUIDField'
  return CapitalizeString(type) + 'Field'
}

export default { ParseValueToString, CapitalizeString, getColumnType }
