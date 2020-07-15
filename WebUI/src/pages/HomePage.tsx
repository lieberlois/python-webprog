import React from "react";
import { GradeChart } from "../components/chart/GradeChart";
import { Grid, makeStyles, createStyles, Box } from "@material-ui/core";
import { useWindowDimensions } from "../hooks/UseWindowDimensions";
import { Calendar } from "../components/calendar/Calendar";
import { ExamPanel } from "../components/exam-panel/ExamPanel";

const useStyles = makeStyles(_ => 
  createStyles({
    gridContainer: {
      height: "100%"
    },
    gridItem: {
      height: "50%"
    }
  })
);

export function HomePage() {
  const classes = useStyles();
  const windowDimensions = useWindowDimensions();

  // The `Box` height value was chosen like this because the top bar is 64px high and we set a 15px margin so we need to cut off 94px
  return (
    <Box height={windowDimensions.height - 94} overflow="hidden" margin="15px">
      <Grid container className={classes.gridContainer} spacing={2} >
        <Grid item xs={6} className={classes.gridItem}><GradeChart /></Grid>
        <Grid item xs={6} className={classes.gridItem}><ExamPanel /></Grid>
        <Grid item xs={12} className={classes.gridItem}><Calendar /></Grid>
      </Grid>
    </Box>
  );
}