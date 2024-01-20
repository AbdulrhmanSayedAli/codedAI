export const ON_DELETE_OPTIONS = [
  "CASCADE",
  "PROTECT",
  "SET_NULL",
  "SET_DEFAULT",
  "DO_NOTHING",
] as const;

export const VALID_COLUMN_TYPES = [
  "char",
  "text",
  "date",
  "datetime",
  "decimal",
  "email",
  "file",
  "image",
  "integer",
  "positiveinteger",
  "positivesmallinteger",
  "boolean",
  "url",
  "foreign_key",
  "many_to_many",
  "one_to_one",
  "uuid",
] as const;

export const EDGE_MARKER_OPTIONS = ["one", "many"] as const;

export const NODE_HEIGHT = 40;
export const NODE_WIDTH = 150;
