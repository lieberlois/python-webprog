export interface IResource {
  readonly title: string;
  readonly shared: boolean;
  readonly filetype: string;
  readonly exam_id: number;
  // next two attributes are generated in the backend so we put them as optional here
  readonly id?: string;   // guid
  readonly filename?: string;
}