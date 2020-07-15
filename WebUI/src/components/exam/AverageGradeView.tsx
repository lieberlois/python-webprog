import React from "react";
import { IAverageGrade } from "../../models/exam";
import { Box, Typography, makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    topBar: {
      margin: "20px"
    }
  })
);

interface IAverageGradeViewProps {
  readonly value: IAverageGrade;
}

export function AverageGradeView({ value }: IAverageGradeViewProps) {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="row" alignItems="flex-start">
      <Box display="flex" flexDirection="column" className={classes.topBar}>
        <Typography variant="h6">Notenschnitt</Typography>
        <Typography variant="h3">{value.average}</Typography>
      </Box>
      <Box display="flex" flexDirection="column" className={classes.topBar}>
        <Typography variant="h6">ECTS</Typography>
        <Typography variant="h3">{value.total_ects}</Typography>
      </Box>
    </Box>
  )
}