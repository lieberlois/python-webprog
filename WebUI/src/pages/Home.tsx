import React from "react";
import { GradeChart } from "../components/chart/GradeChart";
import { Grid, makeStyles, createStyles, Box } from "@material-ui/core";
import { useWindowDimensions } from "../hooks/UseWindowDimensions";

const useStyles =  makeStyles(_ => 
  createStyles({
    gridContainer: {
      // width: "100%",
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

  // The `Box` height value was chosen like this because the top bar is 64px high and we set a 10px margin at the bottom so we need to cut off 74px
  return (
    <Box height={windowDimensions.height - 74} overflow="hidden" marginBottom="10px" width="100%">
      <Grid container className={classes.gridContainer} >
        <Grid item xs={6} className={classes.gridItem}><GradeChart /></Grid>
        <Grid item xs={6} className={classes.gridItem}>PLACEHOLDER</Grid>
        <Grid item xs={6} className={classes.gridItem}>PLACEHOLDER</Grid>
        <Grid item xs={6} className={classes.gridItem}>PLACEHOLDER</Grid>
      </Grid>
    </Box>
  );
}