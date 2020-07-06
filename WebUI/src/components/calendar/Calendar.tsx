import React from "react";
import { Card, makeStyles, createStyles, Box } from "@material-ui/core";

const useStyles = makeStyles(_ => 
  createStyles({
    card: {
      height: "100%"
    },
  })
);

export function Calendar() {
  const classes = useStyles();

  return (
    <Card className={classes.card} title="Prüfungskalendar" >
      <Box display="flex" flexDirection="row">
        <Card>Hello</Card>
        <Card>World</Card>
      </Box>  
    </Card>
  )
}