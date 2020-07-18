import React from "react";
import { IExam } from "../../models/exam";
import { Box, Typography, List, ListItem, makeStyles, createStyles, Divider } from "@material-ui/core";
import { dateOptions } from "../../util/DateUtils";

const useStyles = makeStyles(_ =>
  createStyles({
    box: {
      marginLeft: "10px",
      marginBottom: "5px"
    },
    item: {
      padding: 0
    },
    list: {
      paddingTop: 2
    }
  })
);

interface IExamProps {
  readonly exam: IExam;
}

export function Exam({ exam }: IExamProps) {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Typography align="left">{`${exam.name}:`}</Typography>
      <List className={classes.list}>
        <ListItem className={classes.item} key={1}>
          <Typography variant="caption">{`ECTS: ${exam.ects}`}</Typography>
        </ListItem>
        <ListItem className={classes.item} key={2}>
          <Typography variant="caption">{`Versuch: ${exam.attempt}`}</Typography>
        </ListItem>
        <ListItem className={classes.item} key={3}>
          <Typography variant="caption">{`Prüfungsdatum: ${new Date(Date.parse(exam.date!)).toLocaleDateString("de-DE", dateOptions)}`}</Typography>
        </ListItem>
      </List>
      <Divider />
    </Box>
  )
}