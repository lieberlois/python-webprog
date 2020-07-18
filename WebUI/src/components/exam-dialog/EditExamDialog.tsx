import React, { useState } from "react";
import { IExam } from "../../models/exam";
import { Dialog } from "../dialog/Dialog";
import { Box, Typography, TextField, Button, makeStyles, createStyles, Checkbox, FormControlLabel } from "@material-ui/core";
import { DatePicker } from "../inputs/DatePicker";
import { NumberTextInput } from "../inputs/NumberTextInput";
import { IExamDialogProps } from "./IExamDialogProps";
import { Dropzone } from "../dropzone/Dropzone";
import { IResource } from "../../models/resource";
import { Resource } from "../../util/agent";

const useStyles = makeStyles(() =>
  createStyles({
    tenPixelMargin: {
      marginBottom: "10px"
    },
    box: {
      margin: "30px 10px"
    },
    button: {
      marginTop: "30px 0px"
    }
  })
)

export function EditExamDialog(props: IExamDialogProps) {
  const classes = useStyles();
  const [state, setState] = useState<"exam" | "resource">("exam");
  const [ects, setEcts] = useState<number>(props.exam.ects);
  const [date, setDate] = useState<Date | undefined>(props.exam.date ? new Date(Date.parse(props.exam.date)) : undefined);
  const [passed, setPassed] = useState(props.exam.passed);
  const [grade, setGrade] = useState(`${props.exam.grade || ""}`);
  const [attempt, setAttempt] = useState(props.exam.attempt);
  const [initialFiles] = useState(props.exam.resources || []);
  const [resources, setResources] = useState<IResource[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const handleSave = () => {
    setSubmitting(true);
    const isoDate = date?.toISOString();
    const exam: IExam = {
      ...props.exam,
      date: isoDate && isoDate.slice(0, isoDate.indexOf('T')),
      name: props.exam.name,
      grade: passed ? (grade.trim().length > 0 ? +grade : undefined) : undefined,
      ects, passed, attempt, resources
    };
    props.onSubmit(exam);
    setSubmitting(false);
  }

  const onDrop = (addedFiles: File[]) => {
    addedFiles.forEach(async file => {
      const resource: IResource = {
        title: file.name,
        shared: false,
        filetype: file.type,
        exam_id: props.exam.id!,
      };
      const response = await Resource.create(resource, file);
      setResources(resources => [...resources, response]);
    });
  }

  const onDelete = async (file: File) => {
    const resource = initialFiles.find(initFile => initFile.title.includes(file.name));
    if(!!resource)
      await Resource.delete(resource.exam_id, resource.id!);
  }

  return (
    <Dialog isOpen={props.isOpen} onClose={props.onClose} disableBackdropClick={submitting} >
      <Box display="flex" flexDirection="column" margin="10px">
        <Typography variant="h6" className={classes.tenPixelMargin}>Prüfung: {props.exam.name}</Typography>
        <Box display="flex" flexDirection="row" justifyContent="center">
          <Button variant={state === "exam" ? "contained" : undefined} onClick={() => setState("exam")}><Typography variant="caption">Prüfung</Typography></Button>
          <Button variant={state === "resource" ? "contained" : undefined} onClick={() => setState("resource")}><Typography variant="caption">Dateien</Typography></Button>
        </Box>
        {state === "exam"
          ? <Box display="flex" flexDirection="column" className={classes.box}>
            <TextField label="ECTS" type="number" value={ects} onChange={e => setEcts(Number(e.target.value))} className={classes.tenPixelMargin} />
            <TextField label="Versuch" type="number" value={attempt} onChange={e => setAttempt(Number(e.target.value))} className={classes.tenPixelMargin} />
            <DatePicker date={date} setDate={setDate} />
            <FormControlLabel
              control={<Checkbox checked={passed} onChange={(_, checked) => setPassed(checked)} />}
              label="Prüfung bestanden?"
            />
            <NumberTextInput label="Note" value={grade} setValue={setGrade} classes={classes.tenPixelMargin} floatNumbers disabled={!passed} />
            <Button color="primary" variant="contained" onClick={handleSave} className={classes.button} disabled={submitting}>Speichern</Button>
          </Box>
          : <Box display="flex" flexDirection="column" className={classes.box}>
            <Dropzone
              title="Dateien zur Prüfung hinzufügen"
              initialFiles={initialFiles.map(file => file.title)}
              onDrop={onDrop}
              onDelete={onDelete}
            />
          </Box>
        }
      </Box>
    </Dialog>
  );
}