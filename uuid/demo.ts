// https://github.com/tangqipeng/uuid-js/blob/master/uuid.js
const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

// uuid(15) : 'C71F8B802CDCD94'
// uuid(8, 2) : '01100110'
// uuid(8, 10) : '33542692'
// uuid(8, 16) : 'A4FAE1F9'
export const uuid = (len = 8, radix = 16): string => {
  const value: string[] = [];
  radix = radix || CHARS.length;

  if (len) {
    // Compact form
    for (let i = 0; i < len; i++) value[i] = CHARS[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    let r;

    // rfc4122 requires these characters
    /* eslint-disable-next-line */
    value[8] = value[13] = value[18] = value[23] = '-';
    value[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (let i = 0; i < 36; i++) {
      if (!value[i]) {
        r = 0 | (Math.random() * 16);
        value[i] = CHARS[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return value.join('');
};

// A more performant, but slightly bulkier, RFC4122v4 solution.  We boost performance
// by minimizing calls to random()
// uuidFast() : 'CBA7F508-0EDD-46CC-91F4-27E267B9AA38'
export const uuidFast = () => {
  const uuid = new Array(36);
  let rnd = 0;
  let r;
  for (let i = 0; i < 36; i++) {
    if (i == 8 || i == 13 || i == 18 || i == 23) {
      uuid[i] = '-';
    } else if (i == 14) {
      uuid[i] = '4';
    } else {
      if (rnd <= 0x02) rnd = (0x2000000 + Math.random() * 0x1000000) | 0;
      r = rnd & 0xf;
      rnd = rnd >> 4;
      uuid[i] = CHARS[i == 19 ? (r & 0x3) | 0x8 : r];
    }
  }
  return uuid.join('');
};

// A more compact, but less performant, RFC4122v4 solution:
// uuidCompact() : 'ec3db24f-5edd-4e08-be32-89275a34561e'
export const uuidCompact = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Generate four random hex digits.
// uuidGen() : 'demo-8108444b-506f-69da-74b7-9c2bbd4bd8d3'
const hex = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
export const uuidGen = (prefix = 'demo-') =>
  `${prefix}${hex()}${hex()}-${hex()}-${hex()}-${hex()}-${hex()}${hex()}${hex()}`;

export const uuidGen1 = () => {
  const s = [];
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-';

  const uuid = s.join('');
  return uuid;
};
