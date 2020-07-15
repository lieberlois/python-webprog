export interface IExam {
  readonly user_id?: number;
  readonly id?: number;
  readonly name: string;
  readonly ects: number;
  readonly date?: string;
  readonly passed?: boolean;
  readonly grade?: number;
  readonly attempt?: number;
  readonly resources?: any[];
}

export interface IAverageGrade {
  readonly average: number;
  readonly total_ects: number;
}