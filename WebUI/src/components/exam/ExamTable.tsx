import React, { useState, useMemo } from "react";
import { IExam } from "../../models/exam";
import { TableContainer, Paper, Table, TableBody, Button, TablePagination, Box, Typography, makeStyles, createStyles, Input } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import { TableHeader } from "../table/TableHead";
import { useLocalStorage } from "../../hooks/UseLocalStorage";
import { ExamRow } from "../table/ExamRow";

const rowsPerPageKey = "ROWS_PER_PAGE";

const useStyles = makeStyles(() =>
  createStyles({
    topBar: {
      margin: "10px",
    },
    body: {
      maxHeight: "50%"
    }
  })
)

interface IExamTableProps {
  readonly exams: IExam[];
  readonly setAddDialogOpen: (value: boolean) => void;
  readonly setEditDialogOpen: (value: boolean) => void;
  readonly setDeleteDialogOpen: (value: boolean) => void;
  readonly setSelectedExam: (exam: IExam) => void;
}

export function ExamTable(props: IExamTableProps) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useLocalStorage(rowsPerPageKey, 5);
  const [filterValue, setFilterValue] = useState("");
  const filteredExams = useMemo(() => props.exams.filter(exam => exam.name.toLowerCase().includes(filterValue.toLowerCase())), [props.exams, filterValue]);

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  }

  const handleEditClick = (exam: IExam) => {
    props.setSelectedExam(exam);
    props.setEditDialogOpen(true);
  }

  const handleDeleteClick = (exam: IExam) => {
    props.setSelectedExam(exam);
    props.setDeleteDialogOpen(true);
  }

  return (
    <Paper >
      <Box display="flex" className={classes.topBar}>
        <Box flexGrow={1} display="flex" flexDirection="row" >
          <Typography variant="h6">Prüfungen</Typography>
        </Box>
        <Box><Button onClick={() => props.setAddDialogOpen(true)}><AddBoxRoundedIcon /></Button></Box>
        <Box>
          <Input
            value={filterValue}
            onChange={e => setFilterValue(e.currentTarget.value)}
            placeholder="Filter"
            startAdornment={<SearchIcon />}
          />
        </Box>
      </Box>
      <TableContainer >
        <Table aria-label="simple table" stickyHeader>
          <TableHeader
            headers={["Prüfung", "Datum", "Versuch", "Bestanden", "ECTS", "Note", "Lern Dateien"]}
            alignments={["left", "left", "right", "right", "right", "right", "right", "right"]}
          />
          <TableBody >
            {filteredExams.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(exam => (
              <ExamRow key={exam.id} exam={exam} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 20, 40]}
        count={filteredExams.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={(_, newPage) => setPage(newPage)}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelRowsPerPage="Prüfungen pro Seite: "
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} von ${count}`}
      />
    </Paper>
  );
}