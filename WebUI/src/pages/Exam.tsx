import React from "react";
import { useLoad } from "../hooks/UseLoad";
import { Exams } from "../util/agent";
import { CircularProgress } from "@material-ui/core";
import { ExamTable } from "../components/exam/ExamTable";

export function ExamPage() {
  const [exams, isExamsLoading] = useLoad(async () => await Exams.list(), []);

  return (
    isExamsLoading
      ? <CircularProgress />
      : <ExamTable exams={exams} />
  );
}