import e, { Request, Response } from 'express';
import { FileBase64, StudentPaymentData } from '../interface';
import { pdfCONVENIO, pdfREFERENCE } from '../shared/functions-doc';
import { createBase64 } from '../shared/write-file-pdf';
import axios from 'axios';
const formatCurrency = require('format-currency');

export async function getPaymentDocument(req: Request, res: Response): Promise<Response> {
   const reference = req.params['reference'];
   const type = req.params['type'];
   const datos: any  = {
      reference, type
   } as any;

   const alumno_data = await axios.post<any>('https://v7-dot-api-rest-dot-cecytec.appspot.com/api/pdf/query', datos)
        .then(e => e.data);

   console.log(alumno_data);
   const studentPaymentData: StudentPaymentData = alumno_data//req.body;
   
   let pdf: any;
   studentPaymentData.products = JSON.parse(studentPaymentData.productos)
   console.log( studentPaymentData.products[0]);
   if(Number(studentPaymentData.type) == 1 ) {
      pdf = pdfCONVENIO(studentPaymentData)
   } else if(Number(studentPaymentData.type) == 2) {
      pdf = pdfREFERENCE(studentPaymentData)
   }

   const base64 = await createBase64(pdf);
   
   return res.status(200).send({ file: base64 } as FileBase64);
}

