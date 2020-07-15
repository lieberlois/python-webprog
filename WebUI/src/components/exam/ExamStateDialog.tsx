import React, { useState } from "react";
import { IExamDialogProps } from "./IExamDialogProps";
import { Dialog } from "../dialog/Dialog";
import { Box, Typography, makeStyles, createStyles, Button } from "@material-ui/core";
import { NumberTextInput } from "../inputs/NumberTextInput";
import { IExam } from "../../models/exam";

const useStyles = makeStyles(() => 
  createStyles({
    tenPixelMargin: {
      marginBottom: "10px"
    },
    box: {
      margin: "30px 10px"
    },
    button: {
      marginTop: "30px"
    }
  })
);

interface IExamStateDialogProps {
  readonly changedTo: boolean;
}

export function ExamStateDialog(props: IExamDialogProps & IExamStateDialogProps) {
  const classes = useStyles();
  const [grade, setGrade] = useState("");

  const handleSubmit = () => {
    const exam: IExam = { 
      ...props.exam, 
      passed: props.changedTo,
      grade: props.changedTo ? (grade.trim().length > 0 ? +grade : undefined) : undefined, 
      attempt: !props.changedTo ? props.exam.attempt! + 1 : props.exam.attempt,
      date: props.exam.date && props.exam.date.slice(0, props.exam.date.indexOf('T')) };
    props.onSubmit(exam);
  }

  return (
    <Dialog isOpen={props.isOpen} onClose={props.onClose} maxWidth="xs">
      <Box display="flex" flexDirection="column" margin="10px">
        <Typography variant="h6" className={classes.tenPixelMargin}>{props.changedTo ? "Bestanden" : "Durchgefallen"}</Typography>
        <Box display="flex" flexDirection="column" className={classes.box}>
          <Typography className={classes.tenPixelMargin}>{props.changedTo ? "Prüfung bestanden mit Note:" : "Sind sie wirklich durchgefallen?"}</Typography>
          {!props.changedTo && <Typography variant="caption" className={classes.tenPixelMargin}>(Der Versuch wird mit dem Bestätigen automatisch hochgezählt)</Typography>}
          {props.changedTo && <NumberTextInput label="Note" value={grade} setValue={setGrade} classes={classes.tenPixelMargin} floatNumbers />}
          <Box display="flex" flexDirection="row">
            <Button color="primary" variant="contained" onClick={handleSubmit} className={classes.button}>Bestätigen</Button>
            <Button color="secondary" variant="contained" onClick={() => props.onClose()} className={classes.button}>Abbrechen</Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}