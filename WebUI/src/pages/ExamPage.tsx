import React, { useState } from "react";
import { useLoad } from "../hooks/UseLoad";
import { Exams } from "../util/agent";
import { CircularProgress, Box } from "@material-ui/core";
import { ExamTable } from "../components/table/ExamTable";
import { ExamStatistics } from "../components/exam/ExamStatistics";
import { AddExamDialog } from "../components/exam-dialog/AddExamDialog";
import { IExam } from "../models/exam";
import { EditExamDialog } from "../components/exam-dialog/EditExamDialog";
import { DeleteExamDialog } from "../components/exam-dialog/DeleteExamDialog";
import { ExamStateDialog } from "../components/exam-dialog/ExamStateDialog";

export function ExamPage() {
  const [isDirty, setIsDirty] = useState(true);
  const [exams, isExamsLoading] = useLoad(async () => await Exams.list(), [], isDirty, () => setIsDirty(false));
  const [averageGrade, isAverageGradeLoading] = useLoad(async () => await Exams.average(), 0, isDirty, () => setIsDirty(false));
  const [totalEcts, isTotalEctsLoading] = useLoad(async () => await Exams.totalEcts(), 0, isDirty, () => setIsDirty(false));
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [examStateDialogOpen, setExamStateDialogOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<IExam | undefined>();
  const [selectedExamPassed, setSelectedExamPassed] = useState<boolean | undefined>(undefined);

  const onAdd = async (exam: IExam) => {
    await Exams.create(exam);
    setAddDialogOpen(false);
    setIsDirty(true);
  }

  const onExamChange = async (exam: IExam) => {
    await Exams.update(exam);
    onClose();
    setIsDirty(true);
  }

  const onDelete = async (exam: IExam) => {
    await Exams.delete(exam.id!);
    onClose();
    setIsDirty(true);
  }

  const onClose = () => {
    setAddDialogOpen(false);
    setEditDialogOpen(false);
    setDeleteDialogOpen(false);
    setExamStateDialogOpen(false);
    setSelectedExam(undefined);
  }

  const handleExamStateChange = (dialogOpen: boolean, stateChange: boolean) => {
    setExamStateDialogOpen(dialogOpen);
    setSelectedExamPassed(stateChange);
  }

  const loading = isExamsLoading || isAverageGradeLoading || isTotalEctsLoading;

  return (
    loading
      ? <CircularProgress />
      : <Box display="flex" flexDirection="column">
        <ExamStatistics average={averageGrade} totalEcts={totalEcts} exams={exams} />
        <ExamTable
          exams={exams}
          setAddDialogOpen={(value: boolean) => setAddDialogOpen(value)}
          setEditDialogOpen={(value: boolean) => setEditDialogOpen(value)}
          setDeleteDialogOpen={(value: boolean) => setDeleteDialogOpen(value)}
          setSelectedExam={(exam: IExam) => setSelectedExam(exam)}
          handleExamStateChange={handleExamStateChange}
        />
        <AddExamDialog isOpen={addDialogOpen} onClose={onClose} onSave={onAdd} />
        {selectedExam && <EditExamDialog isOpen={editDialogOpen} onClose={onClose} onSubmit={onExamChange} exam={selectedExam} />}
        {selectedExam && <DeleteExamDialog isOpen={deleteDialogOpen} onClose={onClose} onSubmit={onDelete} exam={selectedExam} />}
        {selectedExam && <ExamStateDialog isOpen={examStateDialogOpen} onClose={onClose} onSubmit={onExamChange} exam={selectedExam} changedTo={selectedExamPassed!} />}
      </Box>
  );
}