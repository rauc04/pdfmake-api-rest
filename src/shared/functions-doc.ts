import moment from 'moment';
import path from 'path';
import { INSTITUTION, Silver } from '../constants';
import { AcademicRecord, BodyDocument, DataDocument, DataSchool, HeaderDocument, StudentAcademicRecord, StudentPaymentData } from '../interface';
import { getFileSVG, getBase64Image } from './read-file';

/**
 * Documentation: https://www.npmjs.com/package/format-currency
 */
const formatCurrency = require('format-currency');

// Def variables Images
let img_CECYTEC_: string = getFileSVG(path.join(__dirname, '..', 'img', '/cecyteclogo_report.svg'));
let img_SEP_: string = getFileSVG(path.join(__dirname, '..', 'img', '/sep_logotipo.svg'));
let img_SEDUC_: string;
let photo_section: string = getFileSVG(path.join(__dirname, '..', 'img', '/photo_section.svg'));
let stamp_section: string = getFileSVG(path.join(__dirname, '..', 'img', '/stamp_section.svg'));
let yellowImage: string = "data:image/png;base64," + getBase64Image(path.join(__dirname, '..', 'img', '/vineta.png'));
let newLogoCECyTEC: string = "data:image/png;base64," + getBase64Image(path.join(__dirname, '..', 'img', '/new_logo_cecytec.png'));


export const drawLine = () => {
   return {
      type: 'line',
      x1: 0, y1: 40,
      x2: 200, y2: 40,
      lineWidth: 0.7
   };
}

export const getHeaderDocument = (header: HeaderDocument, data_campus: DataSchool, isFormat: boolean = false) => {
   /**
    * cct and name school
    *
    * Example `CCT 04ETC0009U PLANTEL CAMPECHE`
    */
   const campus = isFormat
      ? `CCT ${(data_campus.key).toUpperCase()} PLANTEL ${(data_campus.name).toUpperCase()}`
      : null;
   /**
    * title document
    *
    * Example `Lista de alumnos`
    *
    */
   const title = (header.title).toUpperCase();
   const CECyTECs_ = isFormat && INSTITUTION;
   /**
    * dateOfFormat
    *
    * Example `San Francisco de Campeche, a 25 de Agosto del 2020`
    *
    * San Francisco de Campeche, a ${moment(date).format('DD')}
    * de ${moment(date).locale('es').format('MMMM')} del ${moment(date).format('YYYY')
    *
    */
   const dateOfFormat = (isFormat && header.date)
      ? `\n\n Campeche, Campeche, a ${dateFormat(header.date, ['de', 'del'])}`
      : null;

   let elementsReceipt = null;
   let invoice = null;

   if (header.invoice) {
      /**
       * School Cycle
       *
       * Example `Ciclo Escolar 2019-2020`
       *
       */
      const schoolCycle = header.schoolCycle ? `Ciclo escolar: ${header.schoolCycle}` : null;
      const date = header.date ? `Fecha: ${header.date}` : null;

      elementsReceipt = {
         text: [
            '\n',
            {
               text: schoolCycle,
               style: 'textHeaderDocument'
            },
            '\n',
            {
               text: date,
               style: 'textHeaderDocument'
            }
         ]
      };

      invoice = {
         text: [
            {
               text: 'Folio: ',
               style: 'textHeaderDocument'
            },
            {
               text: header.invoice,
               style: 'invoiceText'
            }
         ]
      };
   }

   return [
      {
         table: {
            widths: ['auto', '*', 'auto'],
            body: [
               [
                  getImageCecytec(100, 100),
                  [
                     {
                        text: CECyTECs_,
                        style: 'textHeaderDocument',
                     },
                     {
                        text: campus,
                        style: 'textHeaderDocument',
                     },
                     {
                        text: title,
                        style: 'textHeaderDocument'
                     },
                     elementsReceipt
                  ],
                  invoice ? getImageSeduc() : getImageSEP()
               ]
            ]
         },
         layout: 'noBorders'
      },
      invoice,
      {
         text: dateOfFormat,
         style: 'dateOfFormat'
      }
   ];
}

export const getAdicionalInformation = (body_document: BodyDocument) => {
   const photo = body_document.need_photo ? getPhotoSection(body_document.dataStudent?.photo || '') : null;
   const semester = body_document.dataStudent?.semester || null;
   const group = body_document.dataStudent?.group || null;
   const teacher = body_document.dataStudent?.teacher || null;
   const key_plan = body_document.dataStudent?.key_plan || null;
   const study_plan = body_document.dataStudent?.study_plan || null;
   const study_program = body_document.dataStudent?.study_program || null;
   const current_period = body_document.dataStudent?.currentPeriod || null;
   const shift = body_document.dataSchool?.shift || null;
   const generation = body_document.dataStudent?.generation || null;
   const student_name = body_document.dataStudent?.name || null;
   const student_curp = body_document.dataStudent?.curp || null;
   const student_enrollment = body_document.dataStudent?.enrollment || null;
   const total_data = !student_name ? body_document.dataDocument?.tbody.length : null;
   const propaedeutic_area = body_document.dataStudent?.propaedeuticArea || null;

   const textLeft = {
      text: [
         {
            text: student_name ? 'Alumno: ' : null,
            alignment: 'left',
            style: 'textKeyAI'
         },
         {
            text: student_name,
            alignment: 'left',
            style: 'textValueAI'
         },
         student_name ? '\n' : null,
         {
            text: key_plan ? 'Clave: ' : null,
            alignment: 'left',
            style: 'textKeyAI'
         },
         {
            text: key_plan,
            alignment: 'left',
            style: 'textValueAI'
         },
         key_plan ? '\n' : null,
         {
            text: study_plan ? 'Bachillerato: ' : null,
            alignment: 'left',
            style: 'textKeyAI'
         },
         {
            text: study_plan,
            alignment: 'left',
            style: 'textValueAI'
         },
         study_plan ? '\n' : null,
         {
            text: semester ? 'Semestre: ' : null,
            alignment: 'left',
            style: 'textKeyAI'
         },
         {
            text: semester,
            alignment: 'left',
            style: 'textValueAI'
         },
         {
            text: group ? ' Grupo: ' : null,
            alignment: 'left',
            style: 'textKeyAI'
         },
         {
            text: group,
            alignment: 'left',
            style: 'textValueAI'
         },
         group ? '\n' : null,
         {
            text: teacher ? 'Profesor: ' : null,
            alignment: 'left',
            style: 'textKeyAI'
         },
         {
            text: teacher,
            alignment: 'left',
            style: 'textValueAI'
         },
         teacher ? '\n' : null,
         {
            text: study_program ? 'Asignatura: ' : null,
            alignment: 'left',
            style: 'textKeyAI'
         },
         {
            text: study_program,
            alignment: 'left',
            style: 'textValueAI'
         },
         study_program ? '\n' : null,
         {
            text: propaedeutic_area ? 'Área propedéutica: ' : null,
            alignment: 'left',
            style: 'textKeyAI'
         },
         {
            text: propaedeutic_area,
            alignment: 'left',
            style: 'textValueAI'
         }
      ]
   };

   const textRight = {
      alignment: 'right',
      text: [
         {
            text: student_enrollment ? 'Matricula: ' : null,
            alignment: 'right',
            style: 'textKeyAI'
         },
         {
            text: student_enrollment,
            alignment: 'right',
            style: 'textValueAI'
         },
         student_enrollment ? '\n' : null,
         {
            text: student_curp ? 'CURP: ' : null,
            alignment: 'right',
            style: 'textKeyAI'
         },
         {
            text: student_curp,
            alignment: 'right',
            style: 'textValueAI'
         },
         student_curp ? '\n' : null,
         {
            text: current_period ? 'Ciclo: ' : null,
            alignment: 'right',
            style: 'textKeyAI'
         },
         {
            text: current_period,
            alignment: 'right',
            style: 'textValueAI'
         },
         current_period ? '\n' : null,
         {
            text: generation ? 'Generación: ' : null,
            alignment: 'right',
            style: 'textKeyAI'
         },
         {
            text: generation,
            alignment: 'right',
            style: 'textValueAI'
         },
         generation ? '\n' : null,
         {
            text: shift ? 'Turno: ' : null,
            alignment: 'right',
            style: 'textKeyAI'
         },
         {
            text: shift,
            alignment: 'right',
            style: 'textValueAI'
         },
         shift ? '\n' : null,
         {
            text: !student_name ? 'Alumnos: ' : null,
            alignment: 'right',
            style: 'textKeyAI'
         },
         {
            text: total_data,
            alignment: 'right',
            style: 'textValueAI'
         }
      ]
   };

   return {
      alignment: 'justify',
      columns: [
         {
            width: 'auto',
            columns: [photo]
         },
         {
            width: '*',
            text: textLeft
         },
         {
            width: '*',
            text: textRight
         }
      ],
      columnGap: photo ? 10 : null
   };
}

export const getTableAcademicRecord = (academicRecord: AcademicRecord[]) => {
   const primaryBody: any[] = [];
   const tableComplement = {};

   arrayGroup(academicRecord).map(row => {
      const rows = row.map(academic => {
         const body = [];

         const theadTableComplement = [
            {
               text: academic.schoolCycle,
               alignment: 'center'
            },
            'CALIF'
         ];

         body.push(theadTableComplement);

         academic.subjects.map(sub => {
            body.push([
               {
                  text: sub.name,
                  alignment: sub.external ? 'center' : 'left'
               },
               {
                  text: sub.score,
                  alignment: 'center',
                  noWrap: true
               }
            ]);
         });

         return {
            style: 'tableComplement',
            table: {
               widths: ['*', 'auto'],
               body
            },
            layout: {
               hLineWidth: (i: number, node: any) => (i === 0 || i === node.table.body.length) ? 0.5 : 0.5,
               vLineWidth: (i: number, node: any) => (i === 0 || i === node.table.widths.length) ? 0.5 : 0.5
            }
         };
      });
      if (rows.length == 1) rows.push(tableComplement as any);
      primaryBody.push(rows);
   });

   return {
      layout: 'noBorders',
      table: {
         widths: '*',
         body: primaryBody
      }
   };
}

export const getFinalParagraphAcademicRecord = (data: StudentAcademicRecord, address: string) => {
   const { accumulatedCredits, numberCreditsPlan, average } = data;
   const campus_address = address.toUpperCase();
   const avgToString = numberText(average).toUpperCase();
   const expedition_date = moment().locale('es').format('DD [de] MMMM [del] YYYY');

   return {
      text: [
         {
            // tslint:disable-next-line: max-line-length
            text: `SE EXPIDE EL PRESENTE HISTORIAL ACADÉMICO CON ${accumulatedCredits} CRÉDITOS CURSADOS DE UN TOTAL DE ${numberCreditsPlan}`,
            alignment: 'justify',
            style: 'paragraph'
         },
         '\n',
         {
            text: `CON UN PROMEDIO GENERAL DE ${average} (${avgToString})`,
            alignment: 'justify',
            style: 'paragraph'
         },
         '\n',
         {
            text: `EN ${campus_address}`,
            alignment: 'justify',
            style: 'paragraph'
         },
         '\n',
         {
            text: `EL ${expedition_date.toUpperCase()}, PARA LOS FINES DE CARÁCTER INFORMATIVO QUE AL INTERESADO CONVENGA.`,
            alignment: 'justify',
            style: 'paragraph'
         }
      ],
      style: 'paragraph',
   };
}

export const getSignatureSection = (body_: BodyDocument) => {
   const columns = [];
   const stamp = body_.need_stamp ? getStampSection() : null;
   let teacher = null;
   let schoolPrincipal = null;
   let scholarControlManager = null;
   let person_signing;
   let CEO;

   if (body_.dataSchool?.schoolPrincipal) {
      schoolPrincipal = {
         text: [
            {
               text: body_.dataSchool.schoolPrincipal,
               style: 'signatureManager'
            },
            '\n',
            {
               text: 'Director de Plantel',
               style: 'signatureCharge'
            },
         ]
      };
   }

   if (body_.dataSchool?.person_signing) {
      person_signing = {
         text: [
            {
               text: body_.dataSchool.person_signing,
               style: 'signatureManager'
            },
            '\n',
            {
               text: 'Firma',
               style: 'signatureCharge'
            },
         ]
      };
   }

   if (body_.dataSchool?.scholarControlManager) {
      scholarControlManager = {
         text: [
            {
               text: body_.dataSchool.scholarControlManager,
               style: 'signatureManager'
            },
            '\n',
            {
               text: 'Responsable de control escolar',
               style: 'signatureCharge'
            },
         ]
      };
   }

   if (body_.CEOSignature) {
      CEO = {
         text: [
            {
               text: body_.CEOSignature,
               style: 'signatureManager'
            },
            '\n',
            {
               text: 'Director General',
               style: 'signatureCharge'
            },
         ]
      };
   }

   if (body_.dataStudent?.teacher) {
      teacher = {
         text: [
            {
               text: body_.dataStudent.teacher,
               style: 'signatureManager'
            },
            '\n',
            {
               text: 'Profesor',
               style: 'signatureCharge'
            },
         ]
      };
   }

   const column_left = {
      width: '*',
      alignment: 'center',
      columns: [
         [
            {
               canvas: [drawLine()]
            },
            person_signing ? person_signing : schoolPrincipal
         ]
      ],
      absolutePosition: (stamp && (CEO || teacher || scholarControlManager)) ? {
         x: -280,
         y: 645
      } : null
   };

   const column_center = {
      width: 'auto',
      alignment: 'center',
      columns: [
         stamp
      ],
      absolutePosition: {
         x: 30,
         y: 645
      }
   };

   const column_right = {
      width: '*',
      alignment: 'center',
      columns: [
         [
            {
               canvas: [drawLine()]
            },
            teacher ? teacher : (scholarControlManager ? scholarControlManager : CEO)
         ]
      ],
      absolutePosition: {
         x: 340,
         y: 645
      }
   };

   if (person_signing || schoolPrincipal) columns.push(column_left);
   if (stamp) columns.push(column_center);
   if (CEO || teacher || scholarControlManager) columns.push(column_right);

   return {
      alignment: 'center',
      columns
   };
}

export const getTableDocument = (data_document?: DataDocument) => {
   if (!data_document) return {};

   const head_ = [];
   const body_ = data_document.tbody;

   const fillColorHead_: any[] = [];

   if (data_document.thead) {
      data_document.thead.map(head_element => {
         const addFillColor = {
            text: head_element,
            style: 'tableHead'
         };
         fillColorHead_.push(addFillColor);
      });
      head_.push(fillColorHead_);
   }

   return {
      style: 'tableDocument',
      table: {
         headerRows: 1,
         dontBreakRows: true,
         widths: data_document.widths ? data_document.widths : '*',
         body: data_document.thead ? head_.concat(body_) : body_
      },
      layout: {
         /** Change width border in table  */
         hLineWidth: (i: any, node: any) => (i === 0 || i === node.table.body.length) ? 0.5 : 0.5,
         vLineWidth: (i: any, node: any) => (i === 0 || i === node.table.widths.length) ? 0.5 : 0.5,
         /** Change border color in table  */
         hLineColor: (i: any, node: any) => (i === 0 || i === node.table.body.length) ? Silver : Silver,
         vLineColor: (i: any, node: any) => (i === 0 || i === node.table.widths.length) ? Silver : Silver,
         fillColor: (rowIndex: any, node: any, columnIndex: any) => rowIndex % 2 !== 0 ? '#f2efef' : null
      }
   };
}

export const getStampSection = () => {
   if (stamp_section) {
      return {
         svg: stamp_section,
         fit: [100, 100],
         alignment: 'center'
      };
   }
   return null;
}


const getImageCecytec = (width = 120, height = 120, position = null) => {
   return {
      svg: img_CECYTEC_,
      fit: [width, height],
      alignment: 'left',
      relativePosition: position
   };
}

const getImageSeduc = (width = 70, height = 70) => {
   return {
      image: img_SEDUC_,
      fit: [width, height],
      alignment: 'right'
   };
}

const getImageSEP = (width = 120, height = 120) => {
   if (img_SEP_) {
      return {
         svg: img_SEP_,
         fit: [width, height],
         alignment: 'right'
      };
   }
   return null;
}

const getPhotoSection = (photo: string) => {
   if (photo) {
      return {
         image: photo,
         fit: [70, 70],
         alignment: 'left'
      };
   } else if (photo_section) {
      return {
         svg: photo_section,
         fit: [70, 70],
         alignment: 'left'
      };
   }
   return null;
}

export const numberText = (value: number): string => {
   const integer = Math.floor(value);
   const decimal = Number(((value - integer).toFixed(1).split('.')[1]));
   return `${numberValues(integer, 'cardinal')} punto ${numberValues(decimal, 'cardinal')}`;
}

export const semesterText = (value: string): string => {
   return numberValues(Number(value), 'ordinal');
}

export const numberValues = (value: number, type: 'ordinal' | 'cardinal') => {
   const isOrdinal = type === 'ordinal';
   switch (value) {
      case 0:
         return isOrdinal ? '' : 'cero';
      case 1:
         return isOrdinal ? 'primero' : 'uno';
      case 2:
         return isOrdinal ? 'segundo' : 'dos';
      case 3:
         return isOrdinal ? 'tercero' : 'tres';
      case 4:
         return isOrdinal ? 'cuarto' : 'cuatro';
      case 5:
         return isOrdinal ? 'quinto' : 'cinco';
      case 6:
         return isOrdinal ? 'sexto' : 'seis';
      case 7:
         return isOrdinal ? 'séptimo' : 'siete';
      case 8:
         return isOrdinal ? 'octavo' : 'ocho';
      case 9:
         return isOrdinal ? 'noveno' : 'nueve';
   }
   return isOrdinal ? 'décimo' : 'diez';
}

export const capitalize = (text: string) => {
   return text[0].toUpperCase() + text.slice(1);
}

export const generateArrayString = (length: number, text: string = ''): string[] => {
   const newArray: string[] = [];

   for (let index = 0; index < length; index++) {
      newArray.push(text);
   }
   return newArray;
}

const arrayGroup = <T>(array: T[]) => {
   const TEMPORARY: T[][] = [];
   const GROUP_NUMBER = 2;

   for (let index_array = 0; index_array < array.length; index_array += GROUP_NUMBER) {
      const part = array.slice(index_array, index_array + GROUP_NUMBER);
      TEMPORARY.push(part);
   }

   return TEMPORARY;
}

/**
 * @textConnectors
 * default values = [`de`, `de`]
 */
export const dateFormat = (date?: Date | string, textConnectors = ['de', 'de']) => {
   if (date) {
      return moment(date).locale('es').format(`DD [${textConnectors[0]}] MMMM [${textConnectors[1]}] YYYY`);
   }
   return moment().locale('es').format('DD/MMMM/YYYY');
}

/**  PDF Payments  */
export const pdfCONVENIO = (paymentData: StudentPaymentData) => {
   const menu_table = [];
   let wid_menu: any[];
   if(Number(paymentData.source) === 3) {
     menu_table.push([
       { text: '#', italics: false, bold: true, alignment: 'center' }, 
       { text: paymentData.concepto, italics: false, bold: true, alignment: 'center' },
       { text: 'Concepto', italics: false, bold: true, alignment: 'center' },
       { text: 'Importe', bold: true, alignment: 'center' }
     ])
     wid_menu = [20, 130, '*', 60]
   } else {
     wid_menu = [20, '*', 120]
     menu_table.push([
       { text: '#', italics: false, bold: true, alignment: 'center' }, 
       { text: paymentData.concepto, italics: false, bold: true, alignment: 'center' },
       { text: 'Importe', bold: true, alignment: 'center' }
     ])
   }
   
   const id = 2;

   let mat = '';
   if (id === 2) {
      mat = 'Matricula: ';
   } else {
      mat = 'Folio del aspirante: ';
   }

   let left = 40;
   const docDefinition = {
      content: [
         {
            image: newLogoCECyTEC,
            width: 70,
            margin: [0, 0, 0, 0]
         },
         {
            text: 'DEPOSITO BANCARIO',
            style: 'importe',
         },
         {
            text: 'Total a Pagar /MXN', style: 'totala'
         },
         {
            text: toCurrency(Number(paymentData.total)), style: 'total'
         },
         {
            text: 'Fecha Limite de Pago', style: 'fechatitulo'
         },
         {
            text: paymentData.fechaLimite, style: 'fecha'
         },
         {
            text: 'Beneficiario:', style: 'beneficiario'
         },
         {
            text: paymentData.nombre, style: 'name'
         },
         {
            text: mat + paymentData.matricula, style: 'matricula'
         },
         {
            text: 'Plantel: ' + paymentData.plantel, style: 'campus'
         },
         {
            text: 'Especialidad: ' + paymentData.especialidad, style: 'matricula'
         },
         {
            text: 'Período: ' + paymentData.periodo, style: 'matricula'
         },
         {
            text: 'Detalle de la compra', style: 'compra'
         },
         {
            style: 'tableExample',
            table: {
               widths: wid_menu,
               body: menu_table
            }
         },
         {
            style: 'dataTable',
            table: {
               widths: wid_menu,
               // data del body
               body: bodyProductPayment(paymentData.products, Number(paymentData.source))
            }
         },
         {
            text: 'Pasos para realizar el pago', style: 'pasos'
         },
         {
            text: 'Desde BBVA Bancomer:', style: 'desde'
         }, {
            text: '1. Imprimir la referencia y mostrarla en ventanilla para la realizar el pago, con los siguientes datos.', style: 'primero'
         }, {
            text: 'Número de convenio CIE: 1837192 \n\n Clabe: 012914002018371926 \n\n'
               + 'Referencia: ' + paymentData.numeroReferencia + ' \n\n Importe: '
               + paymentData.total + ' MXN \n\n Concepto: '
               + paymentData.concepto, style: 'primero3'
         },
         {
            text: [
               {
                  text: 'Nota: ',
                  bold: true, fontSize: 8, color: 'black'
               },
               {
                  text: 'Su recibo de pago se enviara a su email',
                  bold: false, fontSize: 8, color: 'black'
               }
            ],
            margin: [40, 25, 0, 0]
         }
         /*{
           text: 'Opción 2: Depósito bancario',
           alignment: 'left', bold: true, fontSize: 12, color: 'black', margin: [40, 25, 0, 0]
         }, {
           image: getReferenciaPDF(),
           width: 480,
           // margin: [left, top, right, bottom]
           margin: [25, 0, 0, 0]
         }, {
           text: spei.nombre, alignment: 'left', bold: true,  fontSize: 7.5, color: '#046DAC', margin: [41, -165, 0, 0] 
         }, {
           text: spei.plantel, alignment: 'left', bold: true,  fontSize: 8, color: '#046DAC',  margin: [41, 1, 0, 0] 
         }, { 
           text: spei.folio, alignment: 'left', bold: true, fontSize: 8, color: '#046DAC', margin: [41, 1, 0, 0] 
         }, { 
           text: spei.precio, alignment: 'left', bold: true, fontSize: 8, color: '#046DAC', margin: [41, 1, 0, 0] 
         }, { // matricula de REFERENCIA
           text: spei.referencia,  alignment: 'right', bold: false, fontSize: 9, color: '#656566', margin: [0, 104.5, 104, 0]
         }  */


      ],
      styles: {
         tableExample: {
            margin: [left, 0, 40, 0],
            alignment: 'center'
         },
         dataTable: {
            margin: [left, 0, 40, 0],
         },
         importe: {
            fontSize: 14,
            bold: true,
            alignment: 'center',
            // margin: [left, top, right, bottom]
            margin: [50, -30, 5, 10]
         },
         totala: {
            alignment: 'right',
            bold: true,
            fontSize: 14,
            color: 'black',
            margin: [left, 20, 40, 0]
         },
         total: {
            alignment: 'right',
            bold: true,
            fontSize: 12,
            color: 'black',
            margin: [left, 5, 40, 0]
         },
         fecha: {
            alignment: 'left',
            bold: true,
            fontSize: 9,
            color: 'black',
            margin: [left, 0, 0, 0]
         },
         fechatitulo: {
            alignment: 'left',
            bold: true,
            fontSize: 12,
            color: 'black',
            margin: [left, -10, 0, 0]
         },
         beneficiario: {
            alignment: 'left',
            bold: true,
            fontSize: 12,
            color: 'black',
            margin: [left, 20, 0, 0]
         },
         name: {
            alignment: 'left',
            bold: true,
            fontSize: 8,
            color: 'black',
            margin: [left, 10, 0, 0]
         },
         campus: {
            alignment: 'left',
            bold: true,
            fontSize: 8,
            color: 'black',
            margin: [left, 5, 0, 0]
         },
         matricula: {
            alignment: 'left',
            bold: true,
            fontSize: 8,
            color: 'black',
            margin: [left, 5, 0, 0]
         },
         compra: {
            alignment: 'left',
            bold: true,
            fontSize: 12,
            color: 'black',
            margin: [left, 15, 0, 0]
         },
         pasos: {
            alignment: 'left',
            bold: true,
            fontSize: 12,
            color: 'black',
            margin: [40, 25, 0, 0]
         },
         desde: {
            alignment: 'left',
            bold: true,
            fontSize: 10,
            color: 'black',
            margin: [40, 10, 0, 0]
         },
         primero: {
            alignment: 'left',
            bold: true,
            fontSize: 8,
            color: 'black',
            margin: [40, 5, 0, 0]
         },
         primero2: {
            alignment: 'left',
            bold: true,
            fontSize: 8,
            color: 'black',
            margin: [48.5, 2, 0, 0]
         },
         primero3: {
            alignment: 'left',
            bold: true,
            fontSize: 8,
            color: 'black',
            margin: [60, 15, 0, 10]
         },
         segundo: {
            alignment: 'left',
            bold: true,
            fontSize: 8,
            color: 'black',
            margin: [40, -74, 0, 0]
         },
         segundo2: {
            alignment: 'left',
            bold: true,
            fontSize: 8,
            color: 'black',
            margin: [48.5, -2, 0, 0]
         },
         segundo3: {
            alignment: 'left',
            bold: true,
            fontSize: 8,
            color: 'black',
            margin: [66, 15, 0, 0]
         },
         desdecua: {
            alignment: 'left',
            bold: true,
            fontSize: 10,
            color: 'black',
            margin: [300, -13, 0, 0]
         },
         primerodos: {
            alignment: 'left',
            bold: true,
            fontSize: 8,
            color: 'black',
            margin: [300, -65, 0, 0]
         },
         primerodos2: {
            alignment: 'left',
            bold: true,
            fontSize: 8,
            color: 'black',
            margin: [307, 2, 0, 0]
         },
         primerodos3: {
            alignment: 'left',
            bold: true,
            fontSize: 8,
            color: 'black',
            margin: [320, 15, 0, 0]
         }
      },
      defaultStyle: {
         font: 'Verdana'
      }
   }

   return docDefinition;
}

export const pdfREFERENCE = (paymentData: StudentPaymentData) => {
   const menu_table = [];
   let wid_menu: any[];
   if(Number(paymentData.source) === 3) {
     menu_table.push([
       { text: '#', italics: false, bold: true, alignment: 'center' }, 
       { text: paymentData.concepto, italics: false, bold: true, alignment: 'center' },
       { text: 'Concepto', italics: false, bold: true, alignment: 'center' },
       { text: 'Importe', bold: true, alignment: 'center' }
     ])
     wid_menu = [20, 130, '*', 60]
   } else {
     wid_menu = [20, '*', 120]
     menu_table.push([
       { text: '#', italics: false, bold: true, alignment: 'center' }, 
       { text: paymentData.concepto, italics: false, bold: true, alignment: 'center' },
       { text: 'Importe', bold: true, alignment: 'center' }
     ])
   }
   let mat = '';
   let paso = '';
   let f_paso = '';
   let paso_tres = '';
   let paso_cinco = '';

   let id = 2;

   if (id === 1) {
      mat = 'Folio del aspirante: ';
      paso = 'Aspirante';
   } else {
      mat = 'Matricula: ';
      paso = 'Alumno';
   }

   if (id === 3) {
      f_paso = '1. Seleccionar la opción COBRO ';
      paso_tres = '3. Seleccionar la referencia con el botón de  "+"  para agregarán los recibos pendientes';
      paso_cinco = '5. Imprimir el recibo generado'
   } else {
      f_paso = '1. Seleccionar la opción CAJA ';
      paso_tres = '3. Seleccionar el registro para agregar las partidas automaticamente (productos)';
      paso_cinco = '5. Imprimir el recibo'
   }

   let left = 40;
   const docDefinition = {
      content: [
         {
            image: newLogoCECyTEC,
            width: 70,
            margin: [0, 0, 0, 0]
         },
         {
            text: 'PAGO EN CAJA CECyTEC',
            style: 'importe',
         },
         {
            text: '\n Total a Pagar /MXN', style: 'totala'
         },
         {
            text: toCurrency(Number(paymentData.total)), style: 'total'
         },
         {
            image: yellowImage, width: 38, height: 34, margin: [0, 8, 0, 0]
         },
         {
            text: 'Fecha Limite de Pago \n \n', style: 'fechatitulo'
         },
         {
            text: paymentData.fechaLimite, style: 'fecha'
         },
         {
            text: 'Beneficiario:', style: 'beneficiario'
         },
         {
            text: paymentData.nombre, style: 'name'
         },
         {
            text: mat + paymentData.matricula, style: 'matricula'
         },
         {
            text: 'Plantel: ' + paymentData.plantel, style: 'campus'
         },
         {
            text: 'Especialidad: ' + paymentData.especialidad, style: 'matricula'
         },
         {
            text: 'Período: ' + paymentData.periodo, style: 'matricula'
         },
         {
            image: yellowImage, width: 38, height: 34, margin: [0, 8, 0, 0]
         },
         {
            text: 'Detalle de la compra \n\n', style: 'compra'
         },
         {
            style: 'tableExample',
            table: {
               widths: wid_menu,
               body: menu_table
            }
         },
         {
            style: 'dataTable',
            table: {
               widths: wid_menu,
               // data del body
               body: bodyProductPayment(paymentData.products, Number(paymentData.source))
            }
         }, {
            image: yellowImage, width: 38, height: 34, margin: [0, 8, 0, 0]
         }, {
            text: 'Como realizar el pago', style: 'pasos'
         }, {
            text: '' + paso + ': ', style: 'desde'
         }, {
            text: '1. Entregar la ficha impresa al cajero de CECyTEC  \n\n '
               + '2. Entregar la cuota a pagar (importe completo o parcial) \n\n'
               + '3. Esperar a que el cajero realize el cobro \n\n '
               + '4. Recibir el recibo de pago', style: 'primero'
         }, {
            text: '\n Instrucciones para la caja CECyTEC ', style: 'desde'
         }, {
            text: f_paso + ' \n\n '
               + '2. Buscar el número de referencia ' + paymentData.numeroReferencia + ' \n\n'
               + paso_tres + '\n\n '
               + '4. Recibir el dinero del ' + paso + ' (importe completo o parcial ) \n\n'
               + paso_cinco, style: 'primero'
         }

      ],
      styles: {
         primero: {
            alignment: 'left',
            bold: false,
            fontSize: 10,
            color: '#6F6F6E',
            margin: [50, 5, 0, 0]
         },
         pasos: {
            alignment: 'left',
            bold: true,
            fontSize: 14,
            color: 'black',
            margin: [40, -24, 0, 0]
         },
         desde: {
            alignment: 'left',
            bold: true,
            fontSize: 11,
            color: 'black',
            margin: [40, 10, 0, 0]
         },
         tableExample: {
            margin: [left, 0, 40, 0],
            alignment: 'center'
         },
         dataTable: {
            margin: [left, 0, 40, 0],
         },
         importe: {
            fontSize: 16,
            bold: true,
            alignment: 'center',
            // margin: [left, top, right, bottom]
            margin: [50, -30, 5, 10]
         },
         totala: {
            alignment: 'right',
            bold: true,
            fontSize: 14,
            color: 'black',
            margin: [left, 20, 40, 0]
         },
         total: {
            alignment: 'right',
            bold: true,
            fontSize: 12,
            color: 'black',
            margin: [left, 5, 40, 0]
         },
         fecha: {
            alignment: 'left',
            bold: true,
            fontSize: 10,
            color: 'black',
            margin: [left, 0, 0, 0]
         },
         fechatitulo: {
            alignment: 'left',
            bold: true,
            fontSize: 12,
            color: 'black',
            margin: [left, -50, 0, 0]
         },
         beneficiario: {
            alignment: 'left',
            bold: true,
            fontSize: 12,
            color: 'black',
            margin: [left, 20, 0, 0]
         },
         name: {
            alignment: 'left',
            bold: true,
            fontSize: 10,
            color: 'black',
            margin: [left, 10, 0, 0]
         },
         campus: {
            alignment: 'left',
            bold: true,
            fontSize: 10,
            color: 'black',
            margin: [left, 5, 0, 0]
         },
         matricula: {
            alignment: 'left',
            bold: true,
            fontSize: 10,
            color: 'black',
            margin: [left, 5, 0, 0]
         },
         compra: {
            alignment: 'left',
            bold: true,
            fontSize: 12,
            color: 'black',
            margin: [left, -25, 0, 0]
         }
      },
      defaultStyle: {
         font: 'Verdana'
      }
   }

   return docDefinition;
}

const bodyProductPayment = (items: Array<any>, identi: number) => {
 
   const data = [];
   console.log(items.length);
   for (let index = 0; index < items.length; index++) {
      const element = items[index];
      const ids = index + 1;
      if(identi === 3) { 
         data.push([
            { text: ids, italics: false, bold: false, alignment: 'center' },
            { text: element.name, italics: false, bold: false, alignment: 'left' },
            { text: element.concepto, italics: false, bold: false, alignment: 'left' },
            { text: toCurrency(Number(element.price)), italics: false, bold: false, alignment: 'right' }
         ]);
      } else {
         data.push([
            { text: ids, italics: false, bold: false, alignment: 'center' },
            { text: element.name, italics: false, bold: false, alignment: 'left' },
            { text: toCurrency(Number(element.price)), italics: false, bold: false, alignment: 'right' }
         ]);
      }     
   }

   return data
}

export const toCurrency = (amount: number, locale?: string, prefix?: string): string => {
   let result = null;
   locale = locale || 'es-MX';
   prefix = prefix || '$ ';
   let opts = { format: '%s%v', symbol: prefix, locale: locale };
   
   try {
      const text = amount.toString().replace(prefix, '').replace(/ /g, '').replace(/,/g, '');
      result = formatCurrency(+text, opts);
   } catch (error) {
      result = formatCurrency(0, opts);
      console.log(error);
   }

   return result;
}