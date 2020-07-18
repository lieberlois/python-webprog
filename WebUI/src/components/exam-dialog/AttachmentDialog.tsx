import React, { useState } from "react";
import { IExam } from "../../models/exam";
import { Dialog } from "../dialog/Dialog";
import { makeStyles, createStyles, Box, Typography, List } from "@material-ui/core";
import { CollapsibleResource } from "../collapse/CollapsibleResource";

const useStyles = makeStyles(() =>
  createStyles({
    tenPixelMargin: {
      marginBottom: "10px"
    },
    box: {
      margin: "30px 10px",
      overflow: "auto"
    },
  })
);

interface IAttachmentDialogProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly exams: IExam[]
}

export function AttachmentDialog(props: IAttachmentDialogProps) {
  const classes = useStyles();
  const [selectedId, setSelectedId] = useState<number | undefined>();

  return (
    <Dialog isOpen={props.isOpen} onClose={props.onClose}>
      <Box display="flex" flexDirection="column" margin="10px">
        <Typography variant="h6" className={classes.tenPixelMargin}>Angefügte Dateien</Typography>
        <Box display="flex" flexDirection="column" className={classes.box}>
          <List>
            {props.exams.map(exam => (
              <CollapsibleResource
                examId={exam.id!}
                examName={exam.name}
                resources={exam.resources!}
                selected={selectedId === exam.id!}
                setSelected={() => setSelectedId(exam.id!)}
                key={exam.id!}
              />
            ))}
          </List>
        </Box>
      </Box>
    </Dialog>
  )
}