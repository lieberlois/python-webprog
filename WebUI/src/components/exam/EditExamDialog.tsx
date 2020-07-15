import React, { useState } from "react";
import { IExam } from "../../models/exam";
import { Dialog } from "../dialog/Dialog";
import { Box, Typography, TextField, Button, makeStyles, createStyles, Checkbox, FormControlLabel } from "@material-ui/core";
import { DatePicker } from "../inputs/DatePicker";
import { NumberTextInput } from "../inputs/NumberTextInput";
import { IExamDialogProps } from "./IExamDialogProps";

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
)

export function EditExamDialog(props: IExamDialogProps) {
  const classes = useStyles();
  const [ects, setEcts] = useState<number>(props.exam.ects);
  const [date, setDate] = useState<Date | undefined>(props.exam.date ? new Date(Date.parse(props.exam.date)): undefined);
  const [passed, setPassed] = useState(props.exam.passed);
  const [grade, setGrade] = useState(`${props.exam.grade || ""}`);
  const [attempt, setAttempt] = useState(props.exam.attempt);
  const [resources, setResources] = useState(props.exam.resources);

  const handleSave = () => {
    const isoDate = date?.toISOString();
    const exam: IExam = { 
      ...props.exam,
      date: isoDate && isoDate.slice(0, isoDate.indexOf('T')),
      name: props.exam.name, 
      grade:  passed ? grade.trim().length > 0 ? +grade : undefined : undefined,
      ects, passed, attempt, resources
    };
    props.onSubmit(exam);
  }

  return (
    <Dialog isOpen={props.isOpen} onClose={props.onClose}>
      <Box display="flex" flexDirection="column" margin="10px">
        <Typography variant="h6" className={classes.tenPixelMargin}>Prüfung: {props.exam.name}</Typography>
        <Box display="flex" flexDirection="column" className={classes.box}>
          <TextField label="ECTS" type="number" value={ects} onChange={e => setEcts(Number(e.target.value))} className={classes.tenPixelMargin} />
          <TextField label="Versuch" type="number" value={attempt} onChange={e => setAttempt(Number(e.target.value))} className={classes.tenPixelMargin} />
          <DatePicker date={date} setDate={setDate} />
          <FormControlLabel 
            control={<Checkbox checked={passed} onChange={(_, checked) => setPassed(checked)} />}
            label="Prüfung bestanden?"
          />
          <NumberTextInput label="Note" value={grade} setValue={setGrade} classes={classes.tenPixelMargin} floatNumbers disabled={!passed} />
          <Button color="primary" variant="contained" onClick={handleSave} className={classes.button}>Speichern</Button>
        </Box>
      </Box>
    </Dialog>
  );
}