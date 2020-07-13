import React, { useMemo } from "react";
import { Card, Box, Typography, makeStyles, createStyles, CircularProgress } from "@material-ui/core";
import { useLoad } from "../../hooks/UseLoad";
import { Exams } from "../../util/agent";
import { Exam } from "./Exam";

const useStyles = makeStyles(_ =>
  createStyles({
    card: {
      height: "100%",
      overflow: "auto"
    },
    marginClass: {
      marginLeft: "10px"
    },
  })
);

export function ExamPanel() {
  const classes = useStyles();
  const [exams, isExamsLoading] = useLoad(async () => await Exams.list(), []);
  const notPassedExams = useMemo(() => exams.filter(exam => !exam.passed), [exams]);

  return (
    <Card className={classes.card}>
      {
        isExamsLoading
          ? <CircularProgress />
          :
          <Box display="flex" flexDirection="column" margin="10px">
            <Typography align="left" variant="h6" className={classes.marginClass}>Prüfungen auf einen Blick:</Typography>
            {notPassedExams.map(exam => <Exam exam={exam} classes={classes.marginClass}/>)}
          </Box>
      }
    </Card>
  )
}