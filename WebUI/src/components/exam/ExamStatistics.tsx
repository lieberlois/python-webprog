import React, { useMemo } from "react";
import { IExam } from "../../models/exam";
import { Box, Typography, makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    topBar: {
      margin: "20px",
      width: "33%"
    }
  })
);

interface IExamStatisticsProps {
  readonly average: number;
  readonly totalEcts: number;
  readonly exams: IExam[];
}

export function ExamStatistics(props: IExamStatisticsProps) {
  const classes = useStyles();
  const passedExams = useMemo(() => props.exams.filter(exam => exam.passed), [props.exams]);

  return (
    <Box display="flex" flexDirection="row" alignItems="flex-start">
      <Box display="flex" flexDirection="column" className={classes.topBar}>
        <Typography variant="h3" align="center">{props.totalEcts}</Typography>
        <Typography variant="h6" align="center">ECTS</Typography>
      </Box>
      <Box display="flex" flexDirection="column" className={classes.topBar}>
        <Typography variant="h3" align="center">{props.average}</Typography>
        <Typography variant="h6" align="center">Notenschnitt</Typography>
      </Box>
      <Box display="flex" flexDirection="column" className={classes.topBar}>
        <Typography variant="h3" align="center">{passedExams.length}</Typography>
        <Typography variant="h6" align="center">Bestandene Prüfungen</Typography>
      </Box>
    </Box>
  )
}