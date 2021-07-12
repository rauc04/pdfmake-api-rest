export interface StudentAditionalInformation {
   /*
	 * Data student
	 */
	enrollment: string;
   name: string;
   curp: string;
   studyPlanKey: string;
   studyPlanName: string;
   semester: string;
   groupName: string;
   currentPeriod: string;
   generation: string;
   propaedeuticArea: string;
   /*
   * Data school
   */
   schoolKey: string;
   schoolName: string;
   schoolPrincipal: string;
   scholarControlManager: string;
   address: string;
}

export interface ReportCard extends StudentAditionalInformation {
  /*
   * Data Report
   */
  reportCardStudyProgram: Array<ReportCardStudyProgram>;
}

export interface StudentAcademicRecord extends StudentAditionalInformation {
   /*
   * Data Academic Record
   */
   academicRecords: Array<AcademicRecord>;
   accumulatedCredits: number;
   numberCreditsPlan?: number;
   average: number;
}

export interface ReportCardStudyProgram {
   /** 📘 Clave y nombre de la asignatura 📘 */
   key: string;
   program: string;
   /** 👩‍🎓 Calificaciones de los tres parciales 👨‍🎓
    *
    * @Calificacion_parcial_1 `CP1` 📑
    *
    * @Calificacion_parcial_2 `CP2` 📑
    *
    * @Calificacion_parcial_3 `CP3` 📑
    */
   cp1: number | string;
   cp2: number | string;
   cp3: number | string;
   /** Calificación final */
   c: number | string;
   /** Calificación extraordinario */
   ext: number | string;
   /**
    * 👩‍🎓
    * Faltas de los tres parciales
    * 👨‍🎓
    */
   fp1: number;
   fp2: number;
   fp3: number;
   /**
    * 👩‍🎓
    * Total de faltas de los tres parciales
    * 👨‍🎓
    */
   tf: number;
   /**
    * 📖 Submodule or Extracurricular 📖
    */
   ignoreProgram: boolean;
   order?: number;
}

export interface FileBase64 {
   file: string;
}

export interface HeaderDocument {
   title: string;
   schoolCycle?: string;
   date?: string | Date;
   invoice?: string;
}

export interface DataDocument {
   thead?: string[];
   tbody: any[][];
   widths?: Array<string|number> | 'auto';
}

export interface DataSchool {
   key: string;
   name: string;
   address?: string;
   studyProgram1?: string;
   studyProgram2?: string;
   shift?: string;
   schoolPrincipal?: string;
   scholarControlManager?: string;
   person_signing?: string;
}

export interface DataStudent {
   curp?: string;
   name?: string;
   firstSurname?: string;
   secondSurname?: string;
   birthday?: Date | string;
   genre?: string;
   nationality?: string;
   birthplace?: string;
   address?: string;
   suburb?: string;
   zipcode?: string;
   telephone?: string;
   locality?: string;
   municipality?: string;
   /** Aditional Information */
   photo?: string;
   enrollment?: string;
   generation?: string;
   currentPeriod?: string;
   group?: string;
   semester?: string;
   teacher?: string;
   key_plan?: string;
   study_plan?: string;
   key_program?: string;
   study_program?: string;
   creditNumberProgram?: number;
   propaedeuticArea?: string;
   isMale?: boolean;
}
 
export interface AcademicRecord {
   schoolCycle: string;
   schoolCycleId: string;
   subjects: Subject[];
   semester?: number;
   isTransfer: boolean;
}
 
export interface Subject {
   name: string;
   score: string | number;
   order?: number;
   isExternal?: boolean;
}

export interface BodyDocument {
   dataDocument?: DataDocument;
   dataSchool?: DataSchool;
   dataStudent?: DataStudent;
   studentAcademicRecord?: StudentAcademicRecord;
   need_photo?: boolean;
   need_stamp?: boolean;
   CEOSignature?: string;
}

export interface StudentPaymentData {
   type: string;
   source: string;
   periodo: string;
   nombre: string;
   especialidad: string;
   total: string;
   fechaLimite: string;
   numeroReferencia: string;
   concepto: string;
   matricula: string;
   plantel: string;
   productos: string;
   curp: string;
   email: string;
   /** @internal */
   products: any;
}
