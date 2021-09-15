import React, { useEffect, useState, MouseEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../../../store';

import * as booksActions from '../../../store/ducks/books/actions';
import { Book } from '../../../store/ducks/books/types';

import { useTranslation } from "react-i18next";
import "../../../services/i18n/i18n";

import { StyledTableCell, useStyles } from '../../../styles/Styles';
import { Card, CardContent, CardHeader, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

interface StateProps {
  books: Book[]
}

interface DispatchProps {
  loadRequest(): void,
  changeFlagEditing(): void,
  changeFlagDetail(): void,
  findByIdRequest(id: number): void
  deleteByIdRequest(id: number): void
}

type Props = StateProps & DispatchProps

const BookList: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { books, loadRequest, changeFlagEditing, findByIdRequest, deleteByIdRequest } = props;
  const { t } = useTranslation();
  const tooltipTitle = t("tooltip.add_book");

  useEffect(() => {
    loadRequest();
  }, []);

  function addBook() {    
    changeFlagEditing();
  }

  function editBook(id: number) {
    findByIdRequest(id);
    changeFlagEditing();    
  }

  function confirmEraseBook(id: number, title: String) {
    if (window.confirm(t("messages.table_confrm_delete", { name: title }))) {
      eraseBook(id);
    }
  }

  function eraseBook(id: number) {    
    deleteByIdRequest(id);    
  }

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, books.length - currentPage * rowsPerPage);

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
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
              <TableContainer >
                <Table className={classes.table} aria-label="custom pagination table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>{t("labels.title")}</StyledTableCell>
                      <StyledTableCell align="right">{t("labels.subtitle")}</StyledTableCell>
                      <StyledTableCell align="right">{t("labels.publish_date")}</StyledTableCell>
                      <StyledTableCell align="right">{t("labels.length")}</StyledTableCell>
                      <StyledTableCell align="right"></StyledTableCell>
                      <StyledTableCell align="right">
                        <Tooltip title={tooltipTitle}>
                          <IconButton aria-label={t("buttons.add")} onClick={addBook}>
                            <AddIcon color="primary" />
                          </IconButton>
                        </Tooltip>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? books.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
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
                          {t("formats.date_format", { date: book.publishDate })}
                          {/* {t("formats.date_format", { date: new Date() })} */}
                        </TableCell>
                        <TableCell style={{ width: 100 }} align="right">
                          {book.length}
                        </TableCell>
                        <TableCell style={{ width: 80 }} align="right">
                          <IconButton onClick={() => editBook(book.id)} aria-label={t("buttons.edit")}>
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell style={{ width: 80 }} align="right">
                          <IconButton className="btn btn-warning" onClick={() => confirmEraseBook(book.id, book.title)} aria-label={t("buttons.delete")}>
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
                        rowsPerPageOptions={[5, 10, 25, { label: t("messages.table_all_itens"), value: -1 }]}
                        colSpan={6}
                        count={books.length}
                        rowsPerPage={rowsPerPage}
                        labelRowsPerPage={t("messages.table_rows_per_page")}
                        // labelDisplayedRows={({ from, to, count }) => `Displaying pages ${from}-${to} of total ${count} pages`}
                        labelDisplayedRows={({ from, to, count }) => t("messages.table_displaying_pagers", { from, to, count })}
                        page={currentPage}
                        nextIconButtonText={t("buttons.table_next_page")}
                        backIconButtonText={t("buttons.table_previous_page")}
                        SelectProps={{
                          inputProps: { 'aria-label': t("messages.table_rows_per_page") },
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
          ) : (
            <Grid container justify="space-around" direction="row">
              <Typography>{t("messages.table_no_results")}</Typography>
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