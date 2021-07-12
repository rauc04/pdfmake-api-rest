import { Request, Response } from 'express';
import { FileBase64, StudentPaymentData } from '../interface';
import { pdfCONVENIO, pdfREFERENCE } from '../shared/functions-doc';
import { createBase64 } from '../shared/write-file-pdf';

export async function getPaymentDocument(req: Request, res: Response): Promise<Response> {
   const studentPaymentData: StudentPaymentData = req.body;

   let pdf: any;

   studentPaymentData.products = JSON.parse(studentPaymentData.productos)

   if(Number(studentPaymentData.type) == 1 ) {
      /*if(Number(studentPaymentData.source) <= 2) {
         // generar datos para spei: extraordinario e intersemestrales
      } else if (Number(studentPaymentData.source) === 3){
         // datos para pagos pendientes de spei
      }*/
      pdf = pdfCONVENIO(studentPaymentData)
   } else if(Number(studentPaymentData.type) == 2) {
      /*if(Number(studentPaymentData.source) <= 2) {
        //extraordinario se intersemestrales
      }  else if (Number(studentPaymentData.source) === 3){
         // datos para pagos pendientes de spei
      }*/
      pdf = pdfREFERENCE(studentPaymentData)
   }

   const base64 = await createBase64(pdf);
   
   return res.status(200).send({ file: base64 } as FileBase64);
}