import React from "react";
import { TableRow, TableCell, Button, Select, MenuItem, makeStyles, createStyles } from "@material-ui/core";
import { dateOptions } from "../../util/DateUtils";
import { IExam } from "../../models/exam";
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from "clsx";

const useStyles = makeStyles(() =>
  createStyles({
    colouredRow: {
      backgroundColor: "rgba(255, 121, 97, 0.3)"
    }
  })
);

interface IExamRowProps {
  readonly exam: IExam;
  readonly handleEditClick: (exam: IExam) => void;
  readonly handleDeleteClick: (exam: IExam) => void;
  readonly onExamStateChange: (passed: boolean) => void;
}

export function ExamRow(props: IExamRowProps) {
  const classes = useStyles();

  return (
    <TableRow hover className={clsx({ [classes.colouredRow]: props.exam.attempt && props.exam.attempt >= 3 })}>
      <TableCell scope="row">{props.exam.name}</TableCell>
      <TableCell align="left">{!!props.exam.date ? new Date(Date.parse(props.exam.date)).toLocaleDateString("de-DE", dateOptions) : "Keine Angabe"}</TableCell>
      <TableCell align="right">{props.exam.attempt}</TableCell>
      <TableCell align="right">{props.exam.ects}</TableCell>
      <TableCell align="right">
        {props.exam.passed
          ? <DoneRoundedIcon />
          : <Select
            // we're using a special characteristic here: Number(true) = 1 and Number(false) = 0
            // also passed is always either false or true even though it's optional, that's how it is returned from the backend
            value={!props.exam.passed && props.exam.attempt === 1 ? -1 : Number(props.exam.passed)}
            onChange={event => event.target.value !== -1 && props.onExamStateChange(Boolean(event.target.value)) }
          >
            {props.exam.attempt === 1 && !props.exam.passed && <MenuItem value={-1} />}
            <MenuItem value={1}><DoneRoundedIcon /></MenuItem>
            <MenuItem value={0}><CloseRoundedIcon /></MenuItem>
          </Select>}
      </TableCell>
      <TableCell align="right">{props.exam.grade}</TableCell>
      <TableCell align="right">{props.exam.resources!.length}</TableCell>
      <TableCell align="right">
        <Button onClick={() => props.handleEditClick(props.exam)}><EditIcon /></Button>
        <Button onClick={() => props.handleDeleteClick(props.exam)}><DeleteIcon /></Button>
      </TableCell>
    </TableRow>
  )
}