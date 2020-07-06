import React from "react";
import { IExam } from "../../models/exam";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";

interface IExamTableProps {
  readonly exams: IExam[];
}

export function ExamTable(props: IExamTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Exam</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Grade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.exams.map((exam) => (
            <TableRow key={exam.id}>
              <TableCell component="th" scope="row">
                {exam.name}
              </TableCell>
              <TableCell align="right">{exam.date}</TableCell>
              <TableCell align="right">{exam.grade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}