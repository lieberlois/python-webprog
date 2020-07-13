import React from "react";
import { IExam } from "../../models/exam";
import { Box, Typography, List, ListItem } from "@material-ui/core";

interface IExamProps {
  readonly exam: IExam;
  readonly classes: string;
}

export function Exam({ exam, classes }: IExamProps) {
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

  return (
    <Box className={classes}>
      <Typography align="left">{`- ${exam.name}:`}</Typography>
      <List>
        <ListItem>
          <Typography variant="caption">{`ECTS: ${exam.ects}`}</Typography>
        </ListItem>
        <ListItem>
          <Typography variant="caption">{`Versuch: ${exam.attempt}`}</Typography>
        </ListItem>
        <ListItem>
          <Typography variant="caption">{`Prüfungsdatum: ${new Date(Date.parse(exam.date!)).toLocaleDateString("de-DE", dateOptions)}`}</Typography>
        </ListItem>
      </List>
    </Box>
  )
}