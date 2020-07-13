import React, { useMemo } from "react";
import { useLoad } from "../../hooks/UseLoad";
import { Exams } from "../../util/agent";
import { Bar } from "react-chartjs-2";
import { CircularProgress, Card, makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles(_ =>
  createStyles({
    card: {
      height: "100%"
    }
  })
);

interface IGradeChartProps {
  readonly height?: number;
  readonly width?: number;
}

export function GradeChart(props: IGradeChartProps) {
  const classes = useStyles();
  const [passedExams, isExamsLoading] = useLoad(async () => await Exams.list(true), []);
  const labels = [1, 2, 3, 4, 5];
  const countPerGrade = useMemo(() => labels.map(label => passedExams.filter(exam => {
    const grade = exam.grade!!;
    const flooredGrade = Math.floor(grade);
    const roundedGrade = ((grade - flooredGrade) >= 0.5 ? (flooredGrade + 1) : flooredGrade);
    return roundedGrade === label;
  }).length), [passedExams, labels]);

  const datasets = [{
    label: "Anzahl bestandener Prüfungen pro Note",
    data: countPerGrade,
    backgroundColor: "rgba(117, 125, 232, 0.3)"
  }];

  const options = {
    tooltips: {
      callbacks: {
        label: function (tooltipItem: any) {
          return `Anzahl der Prüfungen bestanden mit Note ${tooltipItem.index + 1}`;
        }
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 1
        }
      }],
      xAxes: [{
        gridLines: {
          display: false
        }
      }]
    },
    maintainAspectRatio: false,
    title: {
      display: true,
      text: "Grober Notenüberblick",
      position: "top",
    }
  }

  return (
    <Card className={classes.card}>
      {isExamsLoading
        ? <CircularProgress />
        : <Bar data={{ labels: labels, datasets: datasets }} options={options} />
      }
    </Card>
  );
}