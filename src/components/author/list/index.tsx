import React, { useEffect, useState, MouseEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../../../store';

import * as authorsActions from '../../../store/ducks/authors/actions';
import { AuthorDTO, AuthorRequestFilter as Filter} from '../../../store/ducks/authors/types';
import { useTranslation } from "react-i18next";
import "../../../services/i18n/i18n";

import { StyledTableCell, useStyles } from '../../../styles/Styles';
import { Card, CardContent, CardHeader, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

interface StateProps {
  authors: AuthorDTO[],
  filter?: Filter,
  responseTotalRows: number
}

interface DispatchProps {
  loadRequest(): void,
  changeFlagEditing(): void,
  changeFlagDetail(): void,
  findByIdRequest(id: number): void
  deleteByIdRequest(id: number): void
  updateRequestFilter(requestFilter: Filter): void,
  searchRequest(): void,
}

type Props = StateProps & DispatchProps

const AuthorsList: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { authors, filter, responseTotalRows, searchRequest, loadRequest, changeFlagEditing, findByIdRequest, deleteByIdRequest, updateRequestFilter } = props;
  const { t } = useTranslation();
  const tooltipTitle = t("tooltip.add_author");
  
  useEffect(() => {
    loadRequest();
  }, []);

  function addAuthor() {
    changeFlagEditing();
  }

  function editAuthor(id: number) {
    findByIdRequest(id);
    changeFlagEditing();
  }

  function confirmEraseAuthor(id: number, name: String) {
    if (window.confirm(t("messages.table_confrm_delete", { name }))) {
      eraseAuthor(id)
    }
  }

  function eraseAuthor(id: number) {
    deleteByIdRequest(id);
  }

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, responseTotalRows - currentPage * rowsPerPage);

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setCurrentPage(newPage);
        
    if (filter) {
      filter.currentPage = newPage +1;
    }

    updateRequestFilter(filter as Filter);
    searchRequest();
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);

    if (filter) {
      filter.rowsPerPage = +event.target.value;
      filter.currentPage = 0;
    }

    updateRequestFilter(filter as Filter);
    searchRequest();
  };

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          title={t("titles.search_result")}
          subheader=""
        />
        <CardContent>
          {(authors.length > 0 ? (
            <Grid container justify="space-around" direction="row">
              <TableContainer >
                <Table className={classes.table} aria-label="custom pagination table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>{t("labels.name")}</StyledTableCell>
                      <StyledTableCell align="right">{t("labels.birthdate")}</StyledTableCell>
                      <StyledTableCell align="right">{t("labels.email")}</StyledTableCell>
                      <StyledTableCell align="right"></StyledTableCell>
                      <StyledTableCell align="right">
                        <Tooltip title={tooltipTitle}>
                          <IconButton aria-label={t("buttons.add")} onClick={addAuthor}>
                            <AddIcon color="primary" />
                          </IconButton>
                        </Tooltip>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {authors.map((author) => (
                      <TableRow key={author.id}>
                        <TableCell style={{ width: 300 }} component="th" scope="row">
                          {author.name}
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="right">
                          {t("formats.date_format", { date: author.birthdate })}
                          {/* {t("formats.date_format", { date: new Date() })} */}
                        </TableCell>
                        <TableCell style={{ width: 100 }} align="right">
                          {author.email}
                        </TableCell>
                        <TableCell style={{ width: 80 }} align="right">
                          <IconButton onClick={() => editAuthor(author.id)} aria-label={t("buttons.edit")}>
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell style={{ width: 80 }} align="right">
                          <IconButton className="btn btn-warning" onClick={() => confirmEraseAuthor(author.id, author.name)} aria-label={t("buttons.delete")}>
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
                        count={responseTotalRows}
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
  authors: state.authors.authorsData,
  filter: state.authors.requestFilter,
  responseTotalRows: state.authors.responseTotalRows
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(authorsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsList);