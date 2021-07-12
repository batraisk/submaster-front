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

export const selectFile = (event: any, obj: any) => {
  if (event.target.files && event.target.files[0]) {
    obj.file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (e) => {
      obj.url = e.target.result;
    };
    console.log('obj', obj)
    obj.fileInput.nativeElement.value = '';
  }
};
