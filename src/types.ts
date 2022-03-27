export type ValueSymbolObject =
  | string
  | number
  | boolean
  | symbol
  | object
  | null
  | undefined
  | void;

export type ValueOrElement = ValueSymbolObject | Element | any;

export type FunctionOrValueOrElement = Function | ValueOrElement;

export const fnOrValue = (
  element: FunctionOrValueOrElement,
  ...params: any[]
) => {
  if (typeof element === 'function') {
    return (element as Function)(...params);
  }
  return element;
};
