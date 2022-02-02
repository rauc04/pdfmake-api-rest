import { Request, Response } from 'express';
import { FileBase64, StudentPaymentData } from '../interface';
import { pdfCONVENIO, pdfREFERENCE } from '../shared/functions-doc';
import { createBase64 } from '../shared/write-file-pdf';

export async function getPaymentDocument(req: Request, res: Response): Promise<Response> {
   const studentPaymentData: StudentPaymentData = req.body;

   let pdf: any;

   studentPaymentData.products = JSON.parse(studentPaymentData.productos)

   if(Number(studentPaymentData.type) == 1 ) {
      pdf = pdfCONVENIO(studentPaymentData)
   } else if(Number(studentPaymentData.type) == 2) {
      pdf = pdfREFERENCE(studentPaymentData)
   }

   const base64 = await createBase64(pdf);
   
   return res.status(200).send({ file: base64 } as FileBase64);
}