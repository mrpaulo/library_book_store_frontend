import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { Book } from '../../../store/ducks/books/types';
import { ApplicationState } from '../../../store';
import { Button, Grid, IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Theme, Toolbar, Tooltip, withStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import * as booksActions from '../../../store/ducks/books/actions';
import { StyledTableCell, useStyles } from '../../../styles/Styles';

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
  const { books, loadRequest, changeFlagEditing, changeFlagDetail, findByIdRequest } = props;

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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, books.length - page * rowsPerPage);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>     
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Título</StyledTableCell>
              <StyledTableCell align="right">Subtítulo</StyledTableCell>
              <StyledTableCell align="right">Data Publicação</StyledTableCell>
              <StyledTableCell align="right">Qtd paginas</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right">
                <Tooltip title="Adicionar Livro">
                  <IconButton aria-label="Adicionar"  onClick={addBook}>
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
                colSpan={4}
                count={books.length}
                rowsPerPage={rowsPerPage}
                page={page}
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
    </>)
};


const mapStateToProps = (state: ApplicationState) => ({
  books: state.books.booksData,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(booksActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BookList);