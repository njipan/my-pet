import {encode} from 'base-64';

export const encodeFromBuffer = async (buffer = []) => {
  return encode(String.fromCharCode(...new Uint8Array(buffer)));
};
