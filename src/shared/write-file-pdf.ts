import PdfPrinter from 'pdfmake';
import path from 'path';

export const createBase64 = (document: any) => {   
   return new Promise<string>((resolve, reject) => {
      const fonts = {
         Verdana: {
            normal: path.join(__dirname, '..', 'fonts', '/verdana.ttf'),
            bold: path.join(__dirname, '..', 'fonts', '/verdanab.ttf'),
            italics: path.join(__dirname, '..', 'fonts', '/verdanai.ttf'),
            bolditalics: path.join(__dirname, '..', 'fonts', '/verdanaz.ttf')
         }
      };

      const printer = new PdfPrinter(fonts);

      const pdfDoc = printer.createPdfKitDocument(document);

      const chunks: any[] = [];
      let result;

      pdfDoc.on('data', function (chunk) {
         chunks.push(chunk);
      });

      pdfDoc.on('end', function () {
         result = Buffer.concat(chunks);
         resolve(`data:application/pdf;base64,${result.toString('base64')}`);
      });

      pdfDoc.end();
   });
}