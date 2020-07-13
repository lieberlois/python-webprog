import React from "react";
import { Box, makeStyles, createStyles } from "@material-ui/core";
import { IExam } from "../../models/exam";
import { DayCard } from "./DayCard";
import clsx from "clsx";
import { titleHeight, margin } from "./CalendarConstants";

const useStyles = makeStyles(_ => 
  createStyles({
    week: {
      height: `calc(20% - (${titleHeight}px / 4) - (${margin}px * 2))`,
      marginTop: `${margin}px`,
      marginBottom: `${margin}px`,
    },
    day: {
      height: "100%",
      marginRight: `${margin}px`,
      width: `calc(100% / 7 - ${margin}px)`,
    },
    examDay: {
      backgroundColor: "rgba(117, 125, 232, 0.3)"
    },
    nextMonth: {
      backgroundColor: "rgba(117, 117, 117, 0.3)"
    },
  })
)

interface IWeekProps {
  readonly weekIndex: number;
  readonly exams: IExam[];
  readonly year: number;
  readonly month: number;
  readonly nrOfDaysInMonth: number;
}

export function Week(props: IWeekProps) {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="row" className={classes.week} key={props.weekIndex}>
      {[1, 2, 3, 4, 5, 6, 7].map(weekDay => {
        const day = props.weekIndex * 7 + weekDay;
        const examsOnDay = props.exams.filter(exam => Date.parse(exam.date!!) === new Date(props.year, props.month, day).getTime());
        const isNewMonth = day / props.nrOfDaysInMonth > 1;

        return (
          <DayCard
            classes={
              !isNewMonth
                ? clsx(classes.day, { [classes.examDay]: examsOnDay.length > 0 })
                : clsx(classes.day, classes.nextMonth)
            }
            day={!isNewMonth ? day : day % props.nrOfDaysInMonth}
            exams={examsOnDay}
            key={day}
          />
        );
      })}
    </Box>
  );
}