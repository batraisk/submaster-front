export const camelToSnakeCase = (str) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
export const toSnakeCaseObject = (obj) => {
  // Object.keys(obj).forEach(key =>)
  const newObject: any = {};
  // tslint:disable-next-line:forin
  for (const camel in obj) {
    newObject[camelToSnakeCase(camel)] = obj[camel];
  }
  return newObject;
};
