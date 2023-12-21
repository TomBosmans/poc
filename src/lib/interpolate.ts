import get from 'lodash-es/get';

export default function interpolate<T>(template: string, vars: object): T {
  return JSON.parse(template, (_, rawValue) => {
    if (rawValue[0] !== '$') {
      return rawValue;
    }

    const name = rawValue.slice(2, -1);
    const value = get(vars, name);

    if (typeof value === 'undefined') {
      throw new ReferenceError(`Variable ${name} is not defined`);
    }

    return value;
  });
};
