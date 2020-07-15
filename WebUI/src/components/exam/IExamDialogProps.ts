import { IExam } from "../../models/exam";

export interface IExamDialogProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSubmit: (exam: IExam) => void;
  readonly exam: IExam;
}