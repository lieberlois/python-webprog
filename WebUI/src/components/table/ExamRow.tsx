import React from "react";
import { TableRow, TableCell, Button } from "@material-ui/core";
import { dateOptions } from "../../util/DateUtils";
import { IExam } from "../../models/exam";
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

interface IExamRowProps {
  readonly exam: IExam;
  readonly handleEditClick: (exam: IExam) => void;
  readonly handleDeleteClick: (exam: IExam) => void;
}

export function ExamRow(props: IExamRowProps) {
  return (
    <TableRow>
      <TableCell scope="row">{props.exam.name}</TableCell>
      <TableCell align="left">{!!props.exam.date ? new Date(Date.parse(props.exam.date)).toLocaleDateString("de-DE", dateOptions) : "Keine Angabe"}</TableCell>
      <TableCell align="right">{props.exam.attempt}</TableCell>
      <TableCell align="right">{props.exam.passed ? (<DoneRoundedIcon />) : null}</TableCell>
      <TableCell align="right">{props.exam.ects}</TableCell>
      <TableCell align="right">{props.exam.grade}</TableCell>
      <TableCell align="right">{props.exam.resources!.length}</TableCell>
      <TableCell align="right">
        <Button onClick={() => props.handleEditClick(props.exam)}><EditIcon /></Button>
        <Button onClick={() => props.handleDeleteClick(props.exam)}><DeleteIcon /></Button>
      </TableCell>
    </TableRow>
  )
}