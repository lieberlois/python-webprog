import React from "react";
import { IExam } from "../../models/exam";
import { Dialog } from "../dialog/Dialog";
import { Box, Typography, makeStyles, createStyles, Button } from "@material-ui/core";

const useStyles = makeStyles(() => 
  createStyles({
    tenPixelMargin: {
      marginBottom: "10px"
    },
    box: {
      margin: "30px 10px 10px"
    },
    button: {
      margin: "10px 10px 5px 0px",
    }
  })
)

interface IDeleteExamDialogProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onDelete: (exam: IExam) => void;
  readonly exam: IExam;
}

export function DeleteExamDialog(props: IDeleteExamDialogProps) {
  const classes = useStyles();

  return (
    <Dialog isOpen={props.isOpen} onClose={props.onClose} maxWidth="xs">
      <Box display="flex" flexDirection="column" margin="10px">
        <Typography variant="h6" className={classes.tenPixelMargin}>Prüfung löschen</Typography>
        <Box display="flex" flexDirection="column" className={classes.box}>
          <Typography className={classes.tenPixelMargin}>Wollen Sie die Prüfung wirklich löschen?</Typography>
          <Box display="flex" flexDirection="row">
            <Button color="primary" variant="contained" onClick={() => props.onDelete(props.exam)} className={classes.button}>Löschen</Button>
            <Button color="secondary" variant="contained" onClick={() => props.onClose()} className={classes.button}>Abbrechen</Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}