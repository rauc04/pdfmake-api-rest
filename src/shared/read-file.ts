import fs from 'fs';

export const getFileSVG = (url: string) => {
   const file = fs.readFileSync(url);
   return Buffer.from(file).toString('utf8');
}