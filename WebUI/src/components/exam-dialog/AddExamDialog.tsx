import React, { useState } from "react";
import { IExam } from "../../models/exam";
import { Box, Typography, TextField, Button, makeStyles, createStyles, Slider } from "@material-ui/core";
import { Dialog } from "../dialog/Dialog";
import { DatePicker } from "../inputs/DatePicker";

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

interface IAddExamDialogProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSave: (exam: IExam) => void;
}

export function AddExamDialog(props: IAddExamDialogProps) {
  const classes = useStyles();
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [ects, setEcts] = useState<number>(0);
  const [date, setDate] = useState(new Date(Date.now()));

  const [nameError, setNameError] = useState("");

  const handleSave = async () => {
    setSubmitting(true);
    if(name.trim().length === 0) {
      setNameError("Fachname darf nicht leer sein.");
      setSubmitting(false);
      return;
    }

    const isoDate = date.toISOString();
    const exam: IExam = { name, ects, date: isoDate.slice(0, isoDate.indexOf('T'))};
    props.onSave(exam);
    setSubmitting(false);
  }

  return (
    <Dialog isOpen={props.isOpen} onClose={props.onClose} disableBackdropClick={submitting}>
      <Box display="flex" flexDirection="column" margin="10px">
        <Typography variant="h6" className={classes.tenPixelMargin}>Neue Prüfung</Typography>
        <Box display="flex" flexDirection="column" className={classes.box}>
          <TextField label="Fachname" value={name} onChange={e => setName(e.target.value)} className={classes.tenPixelMargin} error={!!nameError} helperText={nameError}/>
          <Typography>ECTS</Typography>
          <Slider defaultValue={ects} step={1} min={1} max={30} marks valueLabelDisplay="auto" onChange={(_, value) => setEcts(value as number)} className={classes.tenPixelMargin} />
          <DatePicker date={date} setDate={setDate} />
          <Button color="primary" variant="contained" onClick={handleSave} className={classes.button} disabled={submitting}>Speichern</Button>
        </Box>
      </Box>
    </Dialog>
  )
}