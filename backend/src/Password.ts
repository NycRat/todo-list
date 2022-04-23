export const createKey = () => {
  let key = String.fromCharCode('a'.charCodeAt(0) + rand(0, 26));
  let startOff = key.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  for (let i = 0; i < startOff - 1; i++) {
    key += String.fromCharCode(rand(32, 127)); // good range of chars
  }
  let len = rand(8, 13);
  key += String.fromCharCode(32 + len);
  for (let i = 0; i <= len * 127 - 32; i++) {
    key += String.fromCharCode(rand(32, 127));
  }
  return key;
}

export const encryptPassword = (password: string, key: string) => {
  let encrypted = '';
  let startOff = key.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  let len = key[startOff].charCodeAt(0) - 32;

  for (let i = 0; i < password.length; i++) {

    if (password[i].charCodeAt(0) > 126 || password[i].charCodeAt(0) < 32) {
      return 'ERROR';
    }

    let startPos = startOff + 1 + (len * (password[i].charCodeAt(0) - 32));
    encrypted += key.substring(startPos, startPos + len);
  }
  return encrypted;
}

export const decryptPassword = (password: string, key: string) => {
  let decrypted = '';
  let startOff = key.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  let len = key[startOff].charCodeAt(0) - 32;

  let decryptMap: any = {} // fix tyhis laeter
  let cur = startOff + 1;
  for (let i = 32; i <= 126; i++) {
    decryptMap[key.substring(cur, cur + len)] = String.fromCharCode(i);
    cur += len;
  }

  for (let i = 0; i < password.length; i += len) {
    decrypted += decryptMap[password.substring(i, i + len)];
  }
  return decrypted;
}

const rand = (min: number, max: number) => {
  if (min > max) {
    let t = min;
    min = max;
    max = t;
  }
  return min + Math.floor(Math.random() * (max - min));
}
