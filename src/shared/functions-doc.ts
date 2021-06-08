import moment from 'moment';
import path from 'path';
import { INSTITUTION, Silver } from '../constants';
import { AcademicRecord, BodyDocument, DataDocument, DataSchool, HeaderDocument, StudentAcademicRecord } from '../interface';
import { getFileSVG } from './read-file';

// Def variables Images
let img_CECYTEC_: string = getFileSVG(path.join(__dirname, '..', 'img', '/cecyteclogo_report.svg'));
let img_SEP_: string = getFileSVG(path.join(__dirname, '..', 'img', '/sep_logotipo.svg'));
let img_SEDUC_: string;
let photo_section: string = getFileSVG(path.join(__dirname, '..', 'img', '/photo_section.svg'));
let stamp_section: string = getFileSVG(path.join(__dirname, '..', 'img', '/stamp_section.svg'));


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
      const date = header.date ? `Fecha: ${ header.date }` : null;

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
                  invoice ? getImageSeduc() : getImageSEP(100, 100)
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

         academic.subjects.map((sub: any) => {
            body.push([
               {
                  text: sub.name,
                  alignment: sub.isExternal ? 'center' : 'left'
               },
               {
                  text: sub.score,
                  alignment: 'center'
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
   const numberOfCredits = data.numberOfCredits;
   const average = data.average;
   const campus_address = address.toUpperCase();
   const averageLetter = numberText(average).toUpperCase();
   const expeditionDate = moment().locale('es').format('DD [de] MMMM [del] YYYY');

   return {
      text: [
         {
            text: `SE EXPIDE EL PRESENTE HISTORIAL ACADÉMICO CON ${numberOfCredits} CRÉDITOS CURSADOS DE UN TOTAL DE 360`,
            alignment: 'justify',
            style: 'paragraph'
         },
         '\n',
         {
            text: `CON UN PROMEDIO GENERAL DE ${average} (${averageLetter})`,
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
            text: `EL ${expeditionDate.toUpperCase()}, PARA LOS FINES DE CARÁCTER INFORMATIVO QUE AL INTERESADO CONVENGA.`,
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
         y: 580
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
         y: 580
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
         y: 580
      }
   };

   if (person_signing || schoolPrincipal)  columns.push(column_left);
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
      data_document.thead.map( head_element => {
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
         alignment : 'center'
      };
   }
   return null;
}


const getImageCecytec = (width = 120, height = 120, position = null) => {
   return {
      svg: img_CECYTEC_,
      fit: [width, height],
      alignment : 'left',
      relativePosition: position
   };
}

const getImageSeduc = (width = 70, height = 70) => {
   return {
      image: img_SEDUC_,
      fit: [width, height],
      alignment : 'right'
   };
}

const getImageSEP = (width = 120, height = 120) => {
   if (img_SEP_) {
      return {
         svg: img_SEP_,
         fit: [width, height],
         alignment : 'right'
      };
   }
   return null;
}

const getPhotoSection = (photo: string) => {
   if (photo) {
      return {
         image: photo,
         fit: [70, 70],
         alignment : 'left'
      };
   } else if (photo_section) {
      return {
         svg: photo_section,
         fit: [70, 70],
         alignment : 'left'
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
   const TEMPORARY = [];
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