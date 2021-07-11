import React, { useEffect, useState, MouseEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { Book } from '../../../store/ducks/books/types';
import { ApplicationState } from '../../../store';
import { Card, CardContent, CardHeader, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import * as booksActions from '../../../store/ducks/books/actions';
import { StyledTableCell, useStyles } from '../../../styles/Styles';
import { Typography } from '@material-ui/core';
import { useTranslation } from "react-i18next";
import "../../../services/i18n/i18n";

interface StateProps {
  books: Book[]
}

interface DispatchProps {
  loadRequest(): void,
  changeFlagEditing(): void,
  changeFlagDetail(): void,
  findByIdRequest(id: number): void
}

type Props = StateProps & DispatchProps

const BookList: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { books, loadRequest, changeFlagEditing, findByIdRequest } = props;
  const { t } = useTranslation();

  useEffect(() => {
    loadRequest();
  }, []);

  function addBook() {
    console.log("Adicionar livro")
    changeFlagEditing();
  }

  function editBook(id: number) {
    findByIdRequest(id);
    changeFlagEditing();

    console.log("Editar livro id " + id)
  }

  function eraseBook(id: number, name: String) {
    console.log("Editar livro: " + name + " id " + id)
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, books.length - page * rowsPerPage);

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Card className={classes.root}>

        <CardHeader
          title={t("titles.search_result")}
          subheader=""
        />
        <CardContent>
          {(books.length > 0 ? (
          <Grid container justify="space-around" direction="row">
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="custom pagination table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>{t("labels.title")}</StyledTableCell>
                    <StyledTableCell align="right">{t("labels.subtitle")}</StyledTableCell>
                    <StyledTableCell align="right">{t("labels.publish_date")}</StyledTableCell>
                    <StyledTableCell align="right">{t("labels.length")}</StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                    <StyledTableCell align="right">
                      <Tooltip title="Adicionar Livro">
                        <IconButton aria-label={t("buttons.add")} onClick={addBook}>
                          <AddIcon color="primary" />
                        </IconButton>
                      </Tooltip>
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : books
                  ).map((book) => (
                    <TableRow key={book.id}>
                      <TableCell style={{ width: 300 }} component="th" scope="row">
                        {book.title}
                      </TableCell>
                      <TableCell style={{ width: 200 }} align="right">
                        {book.subtitle}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        {book.publishDate}
                      </TableCell>
                      <TableCell style={{ width: 100 }} align="right">
                        {book.length}
                      </TableCell>
                      <TableCell style={{ width: 80 }} align="right">
                        <IconButton onClick={() => editBook(book.id)} aria-label="Edit">
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell style={{ width: 80 }} align="right">
                        <IconButton className="btn btn-warning" onClick={() => { if (window.confirm(`Você tem certeza que deseja excluir ${book.title}?`)) { eraseBook(book.id, book.title) } }} aria-label="Delete">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                      colSpan={6}
                      count={books.length}
                      rowsPerPage={rowsPerPage}
                      labelRowsPerPage={t("messages.table_rows_per_page")}
                      // labelDisplayedRows={({ from, to, count }) => `Displaying pages ${from}-${to} of total ${count} pages`}
                      labelDisplayedRows={({ from, to, count }) => t("messages.table_displaying_pagers", { from, to, count })}
                      page={page}
                      nextIconButtonText='Next Page'
                      backIconButtonText='Previous Page'
                      SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                      }}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Grid>
          ): (
            <Grid container justify="space-around" direction="row">
              <Typography>No results</Typography>
            </Grid>
          ))}
        </CardContent>
      </Card>
    </>)
};

const mapStateToProps = (state: ApplicationState) => ({
  books: state.books.booksData,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(booksActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BookList);