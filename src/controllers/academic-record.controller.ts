import { Request, Response } from 'express';
import {
   BodyDocument,
   DataSchool,
   DataStudent,
   FileBase64,
   HeaderDocument,
   StudentAcademicRecord
} from '../interface';
import { Black } from '../constants';
import {
   getAdicionalInformation,
   getFinalParagraphAcademicRecord,
   getHeaderDocument,
   getSignatureSection,
   getTableAcademicRecord
} from '../shared/functions-doc';
import { createBase64 } from '../shared/write-file-pdf';

export async function getAcademicRecord(req: Request, res: Response): Promise<Response> {
   const studentAcademicRecord: StudentAcademicRecord = req.body;

   const header: HeaderDocument = {
      title: 'HISTORIAL ACADÉMICO DEL ALUMNO'
   }

   const dataSchool: DataSchool = {
      key: studentAcademicRecord.schoolKey,
      name: studentAcademicRecord.schoolName,
      schoolPrincipal: studentAcademicRecord.schoolPrincipal,
      scholarControlManager: studentAcademicRecord.scholarControlManager,
      address: studentAcademicRecord.address
   };

   const dataStudent: DataStudent = {
      enrollment: studentAcademicRecord.enrollment,
      name: studentAcademicRecord.name,
      curp: studentAcademicRecord.curp,
      key_plan: studentAcademicRecord.studyPlanKey,
      study_plan: studentAcademicRecord.studyPlanName,
      semester: studentAcademicRecord.semester,
      group: studentAcademicRecord.groupName,
      currentPeriod: studentAcademicRecord.currentPeriod
   };

   const body: BodyDocument = {
      dataStudent,
      dataSchool,
      studentAcademicRecord,
      need_photo: true,
      need_stamp: true 
   };

   const pdf = {
      pageSize: 'LETTER',
      pageOrientation: 'portrait',
      /* [left, top, right, bottom] */
      // pageMargins: [ 13.03937007874, 9.0708661417323, 22.110236220472, 13.889763779528],
      content: [
         /** @CreateHeaderAcademicRecord Start */
         getHeaderDocument(header, dataSchool, true).map(data => data),
         /** @CreateHeaderAcademicRecord End */
         /** @CreateBodyAcademicRecord Start */
         '\n',
         getAdicionalInformation(body),
         '\n',
         getTableAcademicRecord(studentAcademicRecord.academicRecords),
         '\n',
         getFinalParagraphAcademicRecord(studentAcademicRecord, body.dataSchool?.address || ""),
         getSignatureSection(body)
         /** @CreateBodyAcademicRecord End */
      ],
      /** @settingsStyle start */
      styles: {
         textHeaderDocument: {
            color: Black,
            fontSize: 7,
            alignment: 'center'
         },
         dateOfFormat: {
            color: Black,
            fontSize: 8,
            alignment: 'right'
         },
         tableComplement: {
            fontSize: 6,
         },
         /** Text Key Adicional Information */
         textKeyAI: {
            color: Black,
            fontSize: 8,
            alignment: 'center',
            bold: true
         },
         /** Text Value Adicional Information */
         textValueAI: {
            color: Black,
            fontSize: 8
         },
         /** Final Paragraph Academic Record */
         paragraph: {
            color: Black,
            fontSize: 8
         },
         signatureManager: {
            color: Black,
            fontSize: 9,
            alignment: 'center',
            bold: true
         },
         signatureCharge: {
            color: Black,
            fontSize: 8,
            alignment: 'center'
         }
      },
      defaultStyle: {
         font: 'Verdana'
      }
      /** @settingsStyle end */
   };

   const base64 = await createBase64(pdf);
   
   return res.json({ file: base64 } as FileBase64);
}

