import React, { useEffect, useState, MouseEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../../../store';

import * as companiesActions from '../../../store/ducks/companies/actions';
import {  CompanyDTO } from '../../../store/ducks/companies/types';
import { formatCNPJ } from '../../utils/formatUtil';
import { useTranslation } from "react-i18next";
import "../../../services/i18n/i18n";

import { StyledTableCell, useStyles } from '../../../styles/Styles';
import { Card, CardContent, CardHeader, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

interface StateProps {
  companies: CompanyDTO[]
}

interface DispatchProps {
  loadRequest(): void,
  changeFlagEditing(): void,
  changeFlagDetail(): void,
  findByIdRequest(id: number): void
  deleteByIdRequest(id: number): void
}

type Props = StateProps & DispatchProps

const CompaniesList: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { companies, loadRequest, changeFlagEditing, findByIdRequest, deleteByIdRequest } = props;
  const { t } = useTranslation();
  const tooltipTitle = t("tooltip.add_company");

  useEffect(() => {
    loadRequest();
  }, []);

  function addCompany() {
    changeFlagEditing();
  }

  function editCompany(id: number) {
    findByIdRequest(id);
    changeFlagEditing();
  }

  function confirmEraseCompany(id: number, name: String) {
    if (window.confirm(t("messages.table_confrm_delete", { name }))) {
      eraseCompany(id)
    }
  }

  function eraseCompany(id: number) {
    deleteByIdRequest(id); 
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, companies.length - page * rowsPerPage);

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
          {(companies.length > 0 ? (
            <Grid container justify="space-around" direction="row">
              <TableContainer >
                <Table className={classes.table} aria-label="custom pagination table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>{t("labels.name")}</StyledTableCell>
                      <StyledTableCell align="right">{t("labels.cnpj")}</StyledTableCell>
                      <StyledTableCell align="right">{t("labels.create_date")}</StyledTableCell>                      
                      <StyledTableCell align="right"></StyledTableCell>
                      <StyledTableCell align="right">
                        <Tooltip title={tooltipTitle}>
                          <IconButton aria-label={t("buttons.add")} onClick={addCompany}>
                            <AddIcon color="primary" />
                          </IconButton>
                        </Tooltip>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? companies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : companies
                    ).map((company) => (
                      <TableRow key={company.id}>
                        <TableCell style={{ width: 300 }} component="th" scope="row">
                          {company.name}
                        </TableCell>
                        <TableCell style={{ width: 200 }} align="right">
                          {formatCNPJ(company.cnpj as string)}
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="right">
                          {t("formats.date_format", { date: company.createDate })}
                          {/* {t("formats.date_format", { date: new Date() })} */}
                        </TableCell>                        
                        <TableCell style={{ width: 80 }} align="right">
                          <IconButton onClick={() => editCompany(company.id)} aria-label={t("buttons.edit")}>
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell style={{ width: 80 }} align="right">
                          <IconButton className="btn btn-warning" onClick={() => confirmEraseCompany(company.id, company.name)} aria-label={t("buttons.delete")}>
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
                        count={companies.length}
                        rowsPerPage={rowsPerPage}
                        labelRowsPerPage={t("messages.table_rows_per_page")}
                        // labelDisplayedRows={({ from, to, count }) => `Displaying pages ${from}-${to} of total ${count} pages`}
                        labelDisplayedRows={({ from, to, count }) => t("messages.table_displaying_pagers", { from, to, count })}
                        page={page}
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
  companies: state.companies.companiesData,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(companiesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesList);