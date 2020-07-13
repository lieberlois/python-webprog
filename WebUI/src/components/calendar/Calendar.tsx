import React, { useState, useMemo, useRef } from "react";
import { makeStyles, createStyles, Box, Typography, CircularProgress, Button } from "@material-ui/core";
import { useLoad } from "../../hooks/UseLoad";
import { Exams } from "../../util/agent";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { DayCard } from "./DayCard";
import clsx from "clsx";

const titleHeight = 20;
const margin = 5;

const useStyles = makeStyles(_ =>
  createStyles({
    outerBox: {
      height: "100%"
    },
    footer: {
      height: `${titleHeight}px`,
    },
    month: {
      height: `calc(100% - ${titleHeight}px)`
    },
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
    title: {
      marginLeft: "10px"
    }
  })
);

const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

export function Calendar() {
  const classes = useStyles();
  const [currentDay] = useState(new Date());
  const [month, setMonth] = useState(currentDay.getMonth());
  const [year, setYear] = useState(currentDay.getFullYear());
  const [exams, examsLoading] = useLoad(async () => await Exams.list(), []);
  const notPassedExams = useMemo(() => exams.filter(exam => !exam.passed && !!exam.date), [exams]);
  const nrOfDaysInMonth = useMemo(() => new Date(year, month + 1, 0).getDate(), [year, month]);
  const extraDays = useRef(0);

  const setToPreviousMonth = () => {
    extraDays.current = 0;
    if (month === 0) {
      setMonth(11);
      setYear(year => year - 1)
    } else
      setMonth(month => month - 1);
  }

  const setToNextMonth = () => {
    extraDays.current = 0;
    if (month === 11) {
      setMonth(0);
      setYear(year => year + 1);
    } else
      setMonth(month => month + 1);
  }

  return (
    <Box className={classes.outerBox}>
      {
        examsLoading
          ? <CircularProgress />
          : <>
            <Box display="flex" flexDirection="column" className={classes.month}>
              <Typography align="left" variant="h6" className={classes.title}>Prüfungskalendar</Typography>
              {[0, 1, 2, 3, 4].map(weekIndex =>
                (<Box display="flex" flexDirection="row" className={classes.week} key={weekIndex}>
                  {[1, 2, 3, 4, 5, 6, 7].map(weekDay => {
                    const day = weekIndex * 7 + weekDay;
                    if (day > nrOfDaysInMonth)
                      extraDays.current++;
                    const examsOnDay = notPassedExams.filter(exam => Date.parse(exam.date!!) === new Date(year, month, day).getTime());
                    const examDay = examsOnDay.length > 0;

                    return (
                      <DayCard
                        classes={
                          extraDays.current === 0
                            ? clsx(classes.day, { [classes.examDay]: examDay })
                            : clsx(classes.day, classes.nextMonth)
                        }
                        day={extraDays.current === 0 ? day : extraDays.current}
                        exams={examsOnDay}
                        key={day}
                      />
                    );
                  })}
                </Box>)
              )}
            </Box>
            <Box display="flex" flexDirection="row" className={classes.footer} marginTop="10px">
              <Button startIcon={<ArrowBackIcon />} onClick={setToPreviousMonth} />
              <Typography>{months[month]} {year}</Typography>
              <Button endIcon={<ArrowForwardIcon />} onClick={setToNextMonth} />
            </Box>
          </>
      }
    </Box>
  )
}