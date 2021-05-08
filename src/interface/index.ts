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