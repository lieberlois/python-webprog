import React, { useMemo } from "react";
import { Card, Box, Typography, makeStyles, createStyles, CircularProgress, Divider } from "@material-ui/core";
import { useLoad } from "../../hooks/UseLoad";
import { Exams } from "../../util/agent";
import { Exam } from "./Exam";

const useStyles = makeStyles(_ =>
  createStyles({
    card: {
      height: "100%",
      overflow: "auto"
    },
    title: {
      marginLeft: "10px"
    },
  })
);

export function ExamPanel() {
  const classes = useStyles();
  const [exams, isExamsLoading] = useLoad(async () => await Exams.list(), []);
  const dateSortedNotPassedExams = useMemo(() => exams
    .filter(exam => !exam.passed)
    .sort((exam1, exam2) => Date.parse(exam1.date!) > Date.parse(exam2.date!) ? 1 : 0)
  , [exams]);

  return (
    <Card className={classes.card}>
      {
        isExamsLoading
          ? <CircularProgress />
          :
          <Box display="flex" flexDirection="column" margin="10px">
            <Typography align="left" variant="h6" className={classes.title}>Prüfungen auf einen Blick:</Typography>
            <Divider />
            {dateSortedNotPassedExams.map((exam, index) => <Exam exam={exam} key={index}/>)}
          </Box>
      }
    </Card>
  )
}