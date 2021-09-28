export const camelToSnakeCase = (str) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
// export const snakeToCamelCase = (str) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

export const snakeToCamelCase = (str) => str.replace(/(\_\w)/g, letter => `${letter[1].toUpperCase()}`);

export const toSnakeCaseObject = (obj) => {
  // Object.keys(obj).forEach(key =>)
  const newObject: any = {};
  // tslint:disable-next-line:forin
  for (const camel in obj) {
    newObject[camelToSnakeCase(camel)] = obj[camel];
  }
  return newObject;
};

export const toCamelCaseObject = (obj) => {
  // Object.keys(obj).forEach(key =>)
  const newObject: any = {};
  // tslint:disable-next-line:forin
  for (const camel in obj) {
    newObject[snakeToCamelCase(camel)] = obj[camel];
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
    obj.fileInput.nativeElement.value = '';
  }
};

export const makeYoutubeEmbed = (videoUrl) => {
  if (typeof videoUrl !== 'string') {
    return undefined;
  }
  const getId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return match[2];
    }
  };
  const id = getId(videoUrl);
  if (id) {
    return 'https://www.youtube.com/embed/' + id;
  }
};

export const matchYoutubeUrl = (url) => {
  const p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if (url.match(p)) {
    return url.match(p)[1];
  }
  return false;
};

export const kFormatter = (num) => {
  if (Math.abs(num) > 999) {
    return Math.sign(num) * Number(((Math.abs(num) / 1000).toFixed(1))) + 'K';
  } else {
    return Math.sign(num) * Number(Math.abs(num));
  }
};

export const findUserCountry = () => {
   return fetch('https://extreme-ip-lookup.com/json/').then( res => res.json());
};

export const  isValidUrl = (str: string) => {
  if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(str)) {
    return true;
  }
  return false;
};
// fetch('https://extreme-ip-lookup.com/json/')
//   .then( res => res.json())
//   .then(response => {
//     console.log("Country: ", response.country);
//   })
//   .catch((data, status) => {
//     console.log('Request failed');
//   })
