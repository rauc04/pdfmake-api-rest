import fs from 'fs';

export const getFileSVG = (url: string) => {
   const file = fs.readFileSync(url);
   return Buffer.from(file).toString('utf8');
}

export const getBase64Image = (url: string) => {
   const bitmap = fs.readFileSync(url);
   return Buffer.from(bitmap).toString('base64');
}