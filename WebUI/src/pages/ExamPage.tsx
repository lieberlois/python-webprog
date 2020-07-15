import React, { useState } from "react";
import { useLoad } from "../hooks/UseLoad";
import { Exams } from "../util/agent";
import { CircularProgress, Box } from "@material-ui/core";
import { ExamTable } from "../components/exam/ExamTable";
import { AverageGradeView } from "../components/exam/AverageGradeView";
import { AddExamDialog } from "../components/exam/AddExamDialog";
import { IExam } from "../models/exam";
import { EditExamDialog } from "../components/exam/EditExamDialog";
import { DeleteExamDialog } from "../components/exam/DeleteExamDialog";

export function ExamPage() {
  const [isDirty, setIsDirty] = useState(true);
  const [exams, isExamsLoading] = useLoad(async () => await Exams.list(), [], isDirty, () => setIsDirty(false));
  const [averageGrade, isAverageGradeLoading] = useLoad(async () => await Exams.average(), { average: 0, total_ects: 0 }, isDirty, () => setIsDirty(false));
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<IExam | undefined>();
  const loading = isExamsLoading && isAverageGradeLoading;

  const onAdd = async (exam: IExam) => {
    await Exams.create(exam);
    setAddDialogOpen(false);
    setIsDirty(true);
  }

  const onEdit = async (exam: IExam) => {
    await Exams.update(exam);
    setEditDialogOpen(false);
    setIsDirty(true);
  }

  const onDelete = async (exam: IExam) => {
    await Exams.delete(exam.id!);
    setDeleteDialogOpen(false);
    setIsDirty(true);
  }

  const onClose = () => {
    setAddDialogOpen(false);
    setEditDialogOpen(false);
    setDeleteDialogOpen(false);
    setSelectedExam(undefined);
  }

  return (
    loading
      ? <CircularProgress />
      : <Box display="flex" flexDirection="column">
        <AverageGradeView value={averageGrade} />
        <ExamTable
          exams={exams}
          setAddDialogOpen={(value: boolean) => setAddDialogOpen(value)}
          setEditDialogOpen={(value: boolean) => setEditDialogOpen(value)}
          setDeleteDialogOpen={(value: boolean) => setDeleteDialogOpen(value)}
          setSelectedExam={(exam: IExam) => setSelectedExam(exam)}
        />
        <AddExamDialog isOpen={addDialogOpen} onClose={onClose} onSave={onAdd} />
        {selectedExam && <EditExamDialog isOpen={editDialogOpen} onClose={onClose} onSave={onEdit} exam={selectedExam} />}
        {selectedExam && <DeleteExamDialog isOpen={deleteDialogOpen} onClose={onClose} onDelete={onDelete} exam={selectedExam} />}
      </Box>
  );
}