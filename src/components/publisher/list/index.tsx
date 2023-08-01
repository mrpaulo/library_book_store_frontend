/**
 * Copyright (C) 2021 paulo.rodrigues
 * Profile: <https://github.com/mrpaulo>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

//React
import React, { useEffect, useState, MouseEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
//Action and store
import * as publishersActions from '../../../store/ducks/publishers/actions';
import { ApplicationState } from '../../../store';
//Types and local components
import {  PublisherDTO, PublisherRequestFilter as Filter } from '../../../store/ducks/publishers/types';
import { formatCNPJ } from '../../utils/formatUtil';
import { AlertDialog } from '../../utils/AlertDialog';
//Translation
import { useTranslation } from "react-i18next";
import "../../../services/i18n/i18n";
//Style
import { StyledTableCell, useStyles } from '../../../styles/Styles';
import { Card, CardContent, CardHeader, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface StateProps {
  publishers: PublisherDTO[],
  booksWillBeDeleted: String[],
  filter?: Filter,
  responseTotalRows: number
}

interface DispatchProps {  
  changeFlagEditing(): void,
  changeFlagDetail(): void,
  findByIdRequest(id: number): void
  safeDeleteByIdRequest(id: number): void,
  deleteByIdRequest(id: number): void,
  updateRequestFilter(requestFilter: Filter): void,
  searchRequest(): void,
}

type Props = StateProps & DispatchProps

const PublishersList: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { publishers, booksWillBeDeleted, filter, responseTotalRows, updateRequestFilter, searchRequest, changeFlagEditing, findByIdRequest, safeDeleteByIdRequest, deleteByIdRequest } = props;
  const tooltipTitle = t("tooltip.add_publisher");
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [openSafeDeleteConfirm, setOpenSafeDeleteConfirm] = useState(false);
  const [msgConfirmDelete, setMsgConfirmDelete] = useState("");
  const [idToDelete, setIdToDelete] = useState(0);

  useEffect(() => {
    updateRequestFilter({currentPage: 1, rowsPerPage: 10, sortColumn: "name"} as Filter);
    searchRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (booksWillBeDeleted.length > 0) {
      confirmEraseBooks()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booksWillBeDeleted]);

  function addPublisher() {
    changeFlagEditing();
  }

  function editPublisher(id: number) {
    findByIdRequest(id);
    changeFlagEditing();
  }

  function confirmErasePublisher(id: number, name: String) {    
    setOpenDeleteConfirm(true);
    setMsgConfirmDelete(t("messages.table_confirm_delete", { name }) as string);
    setIdToDelete(id);
  }

  function safeDeletePublisher() {
    if(openSafeDeleteConfirm){
      deleteByIdRequest(idToDelete) 
      setOpenSafeDeleteConfirm(false);       
    } else {
      safeDeleteByIdRequest(idToDelete)
    }     
  }

  function confirmEraseBooks() {    
    setOpenDeleteConfirm(true);
    setOpenSafeDeleteConfirm(true);
    let name = booksWillBeDeleted.join(", ")
    setMsgConfirmDelete(t("messages.table_safe_delete_publisher", { name }) as string);
  }

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, responseTotalRows- currentPage * rowsPerPage);

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
      filter.currentPage = 1;
    }

    updateRequestFilter(filter as Filter);
    searchRequest();
  };

  return <>
    <Card className={classes.root}>
      <CardHeader
        title={t("titles.search_result")}
        subheader=""
      />
      <CardContent>
        {(publishers.length > 0 ? (
          <Grid container >
            <TableContainer >
              <Table className={classes.table} aria-label="custom pagination table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>{t("labels.name")}</StyledTableCell>
                    <StyledTableCell align="center">{t("labels.cnpj")}</StyledTableCell>
                    <StyledTableCell align="right">{t("labels.create_date")}</StyledTableCell>                      
                    <StyledTableCell align="right"></StyledTableCell>
                    <StyledTableCell align="right">
                      <Tooltip title={tooltipTitle}>
                        <IconButton aria-label={t("buttons.add")} onClick={addPublisher} size="large">
                          <AddIcon color="primary" />
                        </IconButton>
                      </Tooltip>
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {publishers.map((publisher) => (
                    <TableRow key={publisher.id}>
                      <TableCell style={{ width: 300 }} component="th" scope="row">
                        {publisher.name}
                      </TableCell>
                      <TableCell style={{ width: 200 }} align="center">
                        {formatCNPJ(publisher.cnpj as string)}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        {t("formats.date_format", { date: publisher.foundationDate ? new Date(publisher.foundationDate as Date) : "" })}
                      </TableCell>                        
                      <TableCell style={{ width: 80 }} align="right">
                        <IconButton
                          onClick={() => editPublisher(publisher.id)}
                          aria-label={t("buttons.edit")}
                          size="large">
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell style={{ width: 80 }} align="right">
                        <IconButton
                          className="btn btn-warning"
                          onClick={() => confirmErasePublisher(publisher.id, publisher.name)}
                          aria-label={t("buttons.delete")}
                          size="large">
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
                      count={+responseTotalRows}
                      rowsPerPage={rowsPerPage}
                      labelRowsPerPage={t("messages.table_rows_per_page")}
                      // labelDisplayedRows={({ from, to, count }) => `Displaying pages ${from}-${to} of total ${count} pages`}
                      labelDisplayedRows={({ from, to, count }) => t("messages.table_displaying_pagers", { from, to, count })}
                      page={currentPage}
                      SelectProps={{
                        inputProps: { 'aria-label': t("messages.table_rows_per_page") },
                        native: true,
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Grid>
        ) : (
          <Grid container >
            <Typography>{t("messages.table_no_results")}</Typography>
          </Grid>
        ))}
      </CardContent>
    </Card>
    <AlertDialog
      title={t("messages.action_confirmation")}
      content={msgConfirmDelete}
      agreeBtnLabel={t("buttons.delete")}
      disagreeBtnLabel={t("buttons.cancel")}
      isOpen={openDeleteConfirm}
      setAgreed={() => {
        safeDeletePublisher()
        setOpenDeleteConfirm(false)
      }
      }
      handleClose={() => setOpenDeleteConfirm(false)}
    />
  </>;
};

const mapStateToProps = (state: ApplicationState) => ({
  publishers: state.publishers.publishersData,
  booksWillBeDeleted: state.publishers.booksWillBeDeleted,
  filter: state.publishers.requestFilter,
  responseTotalRows: state.publishers.responseTotalRows
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(publishersActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PublishersList);