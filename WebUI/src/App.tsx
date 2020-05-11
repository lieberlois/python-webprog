import React from 'react';
import Exams from './util/agent';
import { useLoad } from './hooks/UseLoad';
import { IExam } from './models/exam';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

function App() {
  const [exams, isExamsLoading] = useLoad<IExam[]>(async () => await Exams.list(), []);

  if (isExamsLoading) {
    return (
      <CircularProgress />
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Exam</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Grade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exams.map((exam) => (
            <TableRow key={exam.id}>
              <TableCell component="th" scope="row">
                {exam.name}
              </TableCell>
              <TableCell align="right">{exam.date}</TableCell>
              <TableCell align="right">{exam.grade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default App;
