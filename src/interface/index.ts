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
   isValid: boolean;
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
   /** π Clave y nombre de la asignatura π */
   key: string;
   program: string;
   /** π©βπ Calificaciones de los tres parciales π¨βπ
    *
    * @Calificacion_parcial_1 `CP1` π
    *
    * @Calificacion_parcial_2 `CP2` π
    *
    * @Calificacion_parcial_3 `CP3` π
    */
   cp1: number | string;
   cp2: number | string;
   cp3: number | string;
   /** CalificaciΓ³n final */
   c: number | string;
   /** CalificaciΓ³n extraordinario */
   ext: number | string;
   /**
    * π©βπ
    * Faltas de los tres parciales
    * π¨βπ
    */
   fp1: number;
   fp2: number;
   fp3: number;
   /**
    * π©βπ
    * Total de faltas de los tres parciales
    * π¨βπ
    */
   tf: number;
   /**
    * π Submodule or Extracurricular π
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
   isTransfer: boolean;
}
 
export interface Subject {
   name: string;
   score: string | number;
   order?: number;
   external?: boolean;
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
   studentId: string;
   campusId: string;
   cycleId: string;
   /** @internal */
   products: any;


}
