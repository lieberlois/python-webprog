import React, { useState, useMemo } from "react";
import { makeStyles, createStyles, Box, Typography, CircularProgress, Button } from "@material-ui/core";
import { useLoad } from "../../hooks/UseLoad";
import { Exams } from "../../util/agent";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { titleHeight } from "./CalendarConstants";
import { Week } from "./Week";

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

  const setToPreviousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year => year - 1)
    } else
      setMonth(month => month - 1);
  }

  const setToNextMonth = () => {
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
                (<Week 
                  weekIndex={weekIndex}
                  exams={notPassedExams}
                  year={year}
                  month={month}
                  nrOfDaysInMonth={nrOfDaysInMonth}
                  key={weekIndex}
                />))}
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