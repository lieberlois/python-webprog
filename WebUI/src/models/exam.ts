import { IResource } from "./resource";

export interface IExam {
  readonly user_id?: number;
  readonly id?: number;
  readonly name: string;
  readonly ects: number;
  readonly date?: string;
  readonly passed?: boolean;
  readonly grade?: number;
  readonly attempt?: number;
  readonly resources?: IResource[];
}