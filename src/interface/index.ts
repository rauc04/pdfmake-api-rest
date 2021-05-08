export interface ReportCard {
   /*
	 * Data student
	 */
	enrollment: string;
   name: string;
   curp: string;
   studyPlanName: string;
   semester: string;
   groupName: string;
   currentPeriod: string;
   /*
   * Data school
   */
   schoolKey: string;
   schoolName: string;
   schoolPrincipal: string;
  /*
   * Data Report
   */
  reportCardStudyProgram: Array<ReportCardStudyProgram>;
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

export interface StudentAdicionalInformation {
   
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

export interface DataAcademicRecord {
   academicRecord: AcademicRecord[];
   number_credits: number;
   average: number;
}
 
export interface AcademicRecord {
   school_cycle: string;
   subjects: Subject[];
   semester?: number;
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
   dataAR?: DataAcademicRecord;
   need_photo?: boolean;
   need_stamp?: boolean;
   CEOSignature?: string;
}
