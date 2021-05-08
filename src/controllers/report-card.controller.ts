import { Request, Response } from 'express';
import { FileBase64, ReportCard } from '../interface';
import PdfPrinter from 'pdfmake';
import path from 'path';
const fs = require('fs');

export async function getReportCard(req: Request, res: Response): Promise<Response> {
   const newReportCard: ReportCard = req.body;
   
   const docDefinition = {
      content: [
         'First paragraph',
         'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
      ],
      defaultStyle: {
         font: 'Verdana'
      }
   };

   const thead = [
      [
         { text: 'Clave', style: 'tableHead', fontSize: 6.5, rowSpan: 2 },
         { text: 'Asignatura', style: 'tableHead', fontSize: 6.5, rowSpan: 2 },
         { text: 'Calificaciones', style: 'tableHead', fontSize: 6.5, colSpan: 3 }, {}, {},
         { text: 'Final', style: 'tableHead', fontSize: 6.5, colSpan: 2 }, {},
         { text: 'Faltas', style: 'tableHead', fontSize: 6.5, colSpan: 3 }, {}, {},
         { text: 'Total', style: 'tableHead', fontSize: 6.5, border: [true, true, true, false] }
      ],
      [
         { text: '', style: 'secondTableHead', fontSize: 6.5 },
         { text: '', style: 'secondTableHead', fontSize: 6.5 },
         { text: 'P1', style: 'secondTableHead', fontSize: 6.5 },
         { text: 'P2', style: 'secondTableHead', fontSize: 6.5 },
         { text: 'P3', style: 'secondTableHead', fontSize: 6.5 },
         { text: 'C', style: 'secondTableHead', fontSize: 6.5 },
         { text: 'EXT', style: 'secondTableHead', fontSize: 6.5 },
         { text: 'P1', style: 'secondTableHead', fontSize: 6.5 },
         { text: 'P2', style: 'secondTableHead', fontSize: 6.5 },
         { text: 'P3', style: 'secondTableHead', fontSize: 6.5 },
         { text: 'Faltas', style: 'tableHead', fontSize: 6.5, border: [true, false, true, true] }
      ]
   ] as any;

   const widths = ['auto', 230, 19, 19, 19, 19, 19, 'auto', 'auto', 'auto', 22];

   
   /*pdfDoc.pipe(fs.createWriteStream('pdfs/basics.pdf'));
   pdfDoc.end();*/

   const base64 = await createBase64(docDefinition);

   return res.json({ file: base64 } as FileBase64);
}

function createBase64(document: any) {   
   return new Promise<string>((resolve, reject) => {
      const fonts = {
         Verdana: {
            normal: path.join(__dirname, '..', 'fonts', '/verdana.ttf'), //'../fonts/verdana.ttf',
            bold: path.join(__dirname, '..', 'fonts', '/verdanab.ttf'), // '../fonts/verdanab.ttf',
            italics: path.join(__dirname, '..', 'fonts', '/verdanai.ttf'), // '../fonts/verdanai.ttf',
            bolditalics: path.join(__dirname, '..', 'fonts', '/verdanaz.ttf') // '../fonts/verdanaz.ttf'
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