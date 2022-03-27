export const isString = (value: any) => typeof value === 'string';
export const isNumber = (value: any) => typeof value === 'number';
export const isJsonPath = (value: any) =>
  isString(value) ? value.substring(0, 7) === 'json://' : false;
export const isNumeric = (value: any) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

export const isUndefined = (value: any) => value === undefined;
export const isNull = (value: any) => value === null;

// two aliases
export const isNullOrUndefined = (value: any) =>
  isUndefined(value) || isNull(value);
export const isNullish = (value: any) => isUndefined(value) || isNull(value);
