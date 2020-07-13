import React from "react";
import { Card, CardContent, Typography, Box } from "@material-ui/core";
import { IExam } from "../../models/exam";

interface IDayCardProps {
  readonly classes: string;
  readonly day: number;
  readonly exams?: IExam[];
}

export function DayCard(props: IDayCardProps) {
  return (
    <Card className={props.classes}>
      <CardContent>
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