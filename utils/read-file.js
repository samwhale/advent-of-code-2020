import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const readFile = (relativePath, encoding = 'utf8') => {
  return fs.readFileSync(path.resolve(__dirname, relativePath), encoding, (err, data) => {
    if (err) throw err;

    return data;
  });
};
