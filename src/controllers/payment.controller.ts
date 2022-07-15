import e, { Request, Response } from 'express';
import { FileBase64, StudentPaymentData } from '../interface';
import { pdfCONVENIO, pdfREFERENCE, pdfREFERENCE_IRREGULAR } from '../shared/functions-doc';
import { createBase64 } from '../shared/write-file-pdf';
import axios from 'axios';

export async function getPaymentDocument(req: Request, res: Response): Promise<Response> {
  /*const reference = req.params['reference'];
   const type = req.params['type'];
   const datos: any  = {
      reference, type
   } as any;

   const alumno_data = await axios.post<any>('https://v7-dot-api-rest-dot-cecytec.appspot.com/api/pdf/query', datos)
        .then(e => e.data);*/
   const all_data_  = req.body;
   console.log("campusid: " + all_data_.campusId);
   console.log("cycleId: " + all_data_.cycleId);
   console.log("studentId: " + all_data_.studentId);

   // const api = "https://api-rest-dot-cecytec.appspot.com/api/enrolled-students/enrollable-students?campusId=" 
   // + alumno_data.campusId +"&scholarCycleId=" + alumno_data.cycleId + "&studentId=" + alumno_data.studentId;
   // reference_irregular: 20113044

   const api = "https://api-rest-dot-cecytec.appspot.com/api/enrolled-students/enrollable-students?campusId=" 
    + all_data_.campusId +"&scholarCycleId=vW0vl4BvVmPHWougYiis&studentId=" + all_data_.studentId;

   const data_irregular = await axios.get<any>(api)
        .then(e => e.data);
   const estatus = data_irregular.status;
   const studentPaymentData: StudentPaymentData = req.body;
   
   let pdf: any;
   studentPaymentData.products = JSON.parse(studentPaymentData.productos)
   if(Number(studentPaymentData.type) == 1 ) {
      pdf = pdfCONVENIO(studentPaymentData)
   } else if(Number(studentPaymentData.type) == 2) {
      if (estatus == "enrollable") {
         pdf = pdfREFERENCE(studentPaymentData)
      } else {
         pdf = pdfREFERENCE_IRREGULAR(studentPaymentData)
      }
   }

   const base64 = await createBase64(pdf);
   
   return res.status(200).send({ file: base64 } as FileBase64);
}

/**
 *  {
            image: leyendaIrregular,
            width: 440,
            margin: [40, 10, 0, 0]
          }, 
 */