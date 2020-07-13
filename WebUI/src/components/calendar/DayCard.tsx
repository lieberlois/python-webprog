import React from "react";
import { Card, CardContent, Typography, Box, makeStyles, createStyles } from "@material-ui/core";
import { IExam } from "../../models/exam";

const useStyles = makeStyles(_ => 
  createStyles({
    cardContent: {
      paddingTop: "5px"
    }
  })
);

interface IDayCardProps {
  readonly classes: string;
  readonly day: number;
  readonly exams?: IExam[];
}

export function DayCard(props: IDayCardProps) {
  const classes = useStyles();

  return (
    <Card className={props.classes}>
      <CardContent className={classes.cardContent}>
        <Box display="flex" flexDirection="row">
          <Typography>{props.day}</Typography>
          <Box display="flex" flexDirection="column" marginLeft={2}>
            {!!props.exams && props.exams.map((exam, index) => (<Typography variant="caption" key={index}>{exam.name}</Typography>))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}