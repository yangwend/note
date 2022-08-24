const decode = (input: string) => {
  try {
    return decodeURIComponent(input.replace(/\+/g, ' '));
  } catch (e) {
    return null;
  }
};

const encode = (input) => {
  try {
    return encodeURIComponent(input);
  } catch (e) {
    return null;
  }
};

export const parse = (query: string) => {
  const parser = /([^=?#&]+)=?([^&]*)/g;
  const result = {};
  let part;

  while ((part = parser.exec(query))) {
    const key = decode(part[1]);
    const value = decode(part[2]);

    if (key === null || value === null || key in result) continue;
    result[key] = value;
  }

  return result;
};

export const stringify = (obj: Object, prefix: boolean | string | undefined) => {
  let finalPrefix = prefix || '';

  const pairs: string[] = [];

  // 为 boolean 则前缀为?
  if (typeof finalPrefix !== 'string') {
    finalPrefix = '?';
  }

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      let value = obj[key];

      if (!value && (value === null || value === undefined || isNaN(value))) {
        value = '';
      }

      const encodeKey = encode(key);
      const encodeValue = encode(value);

      if (encodeKey === null || encodeValue === null) continue;
      pairs.push(`${encodeKey}=${encodeValue}`);
    }
  }

  return pairs.length ? finalPrefix + pairs.join('&') : '';
};
