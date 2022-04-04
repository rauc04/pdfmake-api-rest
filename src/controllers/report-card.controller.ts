import { Request, Response } from 'express';
import {
   BodyDocument,
   DataDocument,
   DataSchool,
   DataStudent,
   FileBase64,
   HeaderDocument,
   ReportCard
} from '../interface';
import { Black, footerText, watermarkText, White } from '../constants';
import {
   getAdicionalInformation,
   getHeaderDocument,
   getSignatureSection,
   getTableDocument
} from '../shared/functions-doc';
import { createBase64 } from '../shared/write-file-pdf';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { partition } from '../shared/array-functions';

export async function getReportCard(req: Request, res: Response): Promise<Response> {
   const newReportCard: ReportCard = req.body;
   
   const pdf: TDocumentDefinitions = {
      pageSize: 'LETTER',
      pageOrientation: 'portrait',
      /* [left, top, right, bottom] */
      // pageMargins: [ 13.03937007874, 9.0708661417323, 22.110236220472, 13.889763779528],
      watermark: !newReportCard.isValid ? watermarkText : undefined,
      footer: !newReportCard.isValid ? footerText : undefined,
      content: composeReportCard(newReportCard),
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
         tableDocument: {
            fontSize: 6.5,
         },
         tableHead: {
            fillColor: White,
            color: Black,
            bold: true,
            alignment: 'center'
         },
         secondTableHead: {
            fillColor: White,
            color: Black,
            alignment: 'center'
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
         signatureManager: {
            color: Black,
            fontSize: 9,
            alignment: 'center'
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
   return res.status(200).send({ file: base64 } as FileBase64);
}

export async function getManyReportCard(req: Request, res: Response): Promise<Response> {
   const reportCards: ReportCard[] = req.body;
   const reportCardPerPage = req.query?.reportCardPerPage ?? 1;

   const contentCollection: any[] = [];
   let isValid = false;

   if (reportCardPerPage == 1) {
      reportCards.forEach((newReportCard,index) => {
         const pageBreak = (index === reportCards.length - 1) ? {} : { text: '', pageBreak: 'before' };

         isValid = newReportCard.isValid;

         contentCollection.push(
            composeReportCard(newReportCard), 
            pageBreak
         );
      })
   } else {
      const reportCardPartitions = partition(reportCards);
      reportCardPartitions.forEach((reportCardPartition, index) => {
         const pageBreak = (index === reportCardPartitions.length - 1) ? {} : { text: '', pageBreak: 'before' };
         const contentPage = reportCardPartition.length > 1
            ? {
                  stack: [
                     ...composeReportCard(reportCardPartition[0]),
                     '\n\n\n',
                     ...composeReportCard(reportCardPartition[1])
                  ]
               }
            : composeReportCard(reportCardPartition[0]);

         if (reportCardPartition.length > 0) {
            isValid = reportCardPartition[0].isValid;
         }

         contentCollection.push(
            contentPage, 
            pageBreak
         );
      });
   }
   
   const pdf: TDocumentDefinitions = {
      pageSize: 'LETTER',
      pageOrientation: 'portrait',
      /* [left, top, right, bottom] */
      // pageMargins: [ 13.03937007874, 9.0708661417323, 22.110236220472, 13.889763779528],
      watermark: !isValid ? watermarkText : undefined,
      footer: !isValid ? footerText : undefined,
      content: contentCollection,
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
         tableDocument: {
            fontSize: 6.5,
         },
         tableHead: {
            fillColor: White,
            color: Black,
            bold: true,
            alignment: 'center'
         },
         secondTableHead: {
            fillColor: White,
            color: Black,
            alignment: 'center'
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
         signatureManager: {
            color: Black,
            fontSize: 9,
            alignment: 'center'
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
   return res.status(200).send({ file: base64 } as FileBase64);
}

function composeReportCard(reportCard: ReportCard): Array<any> {
   const tbody: any[][] = [];
   reportCard.reportCardStudyProgram.forEach(entity => {
      const { key, program, cp1, cp2, cp3, c, ext, fp1, fp2, fp3, tf } = entity;

      tbody.push([
         {
            text: key,
            alignment: 'center',
            fontSize: 6.5
         },
         {
            text: program,
            alignment: 'left',
            fontSize: 6.5
         },
         {
            text: cp1,
            alignment: 'center',
            fontSize: 6.5
         },
         {
            text: cp2,
            alignment: 'center',
            fontSize: 6.5
         },
         {
            text: cp3,
            alignment: 'center',
            fontSize: 6.5
         },
         {
            text: c,
            alignment: 'center',
            fontSize: 6.5
         },
         {
            text: ext,
            alignment: 'center',
            fontSize: 6.5
         },
         {
            text: fp1,
            alignment: 'center',
            fontSize: 6.5
         },
         {
            text: fp2,
            alignment: 'center',
            fontSize: 6.5
         },
         {
            text: fp3,
            alignment: 'center',
            fontSize: 6.5
         },
         {
            text: tf,
            alignment: 'center',
            fontSize: 6.5
         }
      ]);
   });

   const header: HeaderDocument = {
      title: 'BOLETA DE ALUMNO',
      date: new Date()
   }

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

   const widths = ['auto', '*', 19, 19, 19, 19, 19, 'auto', 'auto', 'auto', 22];

   const dataDocument: DataDocument = {
      tbody: tbody,
      widths
   };

   const dataSchool: DataSchool = {
      key: reportCard.schoolKey,
      name: reportCard.schoolName,
      schoolPrincipal: reportCard.schoolPrincipal
   };

   const dataStudent: DataStudent = {
      enrollment: reportCard.enrollment,
      name: reportCard.name,
      curp: reportCard.curp,
      study_plan: reportCard.studyPlanName,
      semester: reportCard.semester,
      group: reportCard.groupName,
      currentPeriod: reportCard.currentPeriod
   };

   const body: BodyDocument = {
      dataStudent,
      dataSchool,
      dataDocument
   };

   dataDocument.tbody = dataDocument.tbody.map(item => {
      return item.map((value, secondIndex) => {
         if (secondIndex === 1) {
            return {
               text: value,
               alignment: 'left',
               fontSize: 6.5
            };
         }
         return {
            text: value,
            alignment: 'center',
            fontSize: 6.5
         };
      });
   });

   dataDocument.tbody = thead.concat(dataDocument.tbody);

   return [
      /** @CreateHeaderReportCard Start */
      getHeaderDocument(header, dataSchool, true).map(data => data),
      /** @CreateHeaderReportCard End */
      /** @CreateBodyReportCard Start */
      getAdicionalInformation(body),
      getTableDocument(body.dataDocument),
      getSignatureSection(body),
      /** @CreateBodyReportCard End */
   ]
}