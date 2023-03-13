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
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
//Action and store
import * as usersActions from '../../../store/ducks/users/actions';
import { ApplicationState } from '../../../store';
//Types 
import { User, UserRequestFilter as Filter } from '../../../store/ducks/users/types';
//Third party
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
//Tranlation
import { useTranslation } from "react-i18next";
import "../../../services/i18n/i18n";
//Style
import { useStyles } from '../../../styles/Styles';
import { Grid, TextField, Button, InputLabel, CardContent, Card, CardHeader, } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

interface StateProps {
  users?: User[]  
}

interface DispatchProps {
  searchRequest(): void,  
  updateRequestFilter(requestFilter: Filter): void
  cleanRequestFilter(): void
}

type Props = StateProps & DispatchProps

const INITIAL_VALUES: Filter = {
  rowsPerPage: 10,
  currentPage: 1,
  name: '',
  cpf: '',  
  startDate: undefined,
  finalDate: undefined
};

const UserFilter: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();  
  const { searchRequest, updateRequestFilter, cleanRequestFilter } = props;

  const validationSchema = Yup.object().shape({       
    startDate: Yup.date().max(new Date(), t("errors.start_date_after")),
    finalDate: Yup.date()
    .when('startDate',
    (startDate: Date | undefined, schema: Yup.DateSchema) => {
        if (startDate) {
        const dayAfter = new Date(startDate.getTime() + 86400000);
            return schema.min(dayAfter, t("errors.end_date_before"));
          }      
          return schema;
    })
  });

  function handleSubmit(values: Filter, actions: any) {
    actions.setSubmitting(false);
    cleanRequestFilter();
    updateRequestFilter(values);
    searchRequest();
  }
  
  function handleClear() {
    console.log('clear button');
  }
  
  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={INITIAL_VALUES}
        className={classes.root}
        validationSchema={validationSchema}
      >
        {(props: FormikProps<Filter>) => {
          const {
            values,            
            handleChange,
            isSubmitting,
            isValid,
            errors,
            touched
          } = props
          return (
            <Card className={classes.root}>
              <Form>
                <CardHeader
                  title={t("titles.search_users")}
                  subheader=""
                />
                <CardContent>
                  <Grid container justify="space-around" direction="row">
                    <Grid item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.name")}</InputLabel>
                      <TextField
                        name="name"
                        type="text"
                        placeholder=""
                        value={values.name || ""}
                        onChange={handleChange}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.cpf")}</InputLabel>
                      <TextField
                        name="cpf"
                        type="text"
                        placeholder=""
                        value={values.cpf || ""}
                        onChange={handleChange}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                      />
                    </Grid>   
                    <Grid item className="form-grid" container lg={10} md={10} sm={10} xs={10}>                    
                      <Grid item lg={6} md={6} sm={6} xs={6}>
                        <InputLabel className="form-label" >{t("labels.start_date_birth")}</InputLabel>
                        <TextField
                          name="startDate"
                          type="date"
                          value={values.startDate || ""}
                          onChange={handleChange}
                          className={classes.textFieldDate}
                          InputProps={{
                            className: classes.input,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="outlined"
                          helperText={errors.startDate}
                          error={
                            errors.startDate && touched.startDate
                              ? true
                              : false
                          }
                        />
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={6}>
                        <InputLabel className="form-label" >{t("labels.final_date")}</InputLabel>
                        <TextField
                          name="finalDate"
                          type="date"
                          value={values.finalDate || ""}
                          onChange={handleChange}
                          className={classes.textFieldDate}
                          InputProps={{
                            className: classes.input,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="outlined"
                          helperText={errors.finalDate}
                          error={
                            errors.finalDate && touched.finalDate
                              ? true
                              : false
                          }
                        />
                      </Grid>
                    </Grid>                         
                  </Grid>
                </CardContent>
                <Grid item lg={10} md={10} sm={10} xs={10} style={{ paddingBottom: '80px' }}>
                  <Grid container justify="flex-end" alignItems="flex-end" >
                    <Button
                      className={classes.resetButton}
                      type="reset"
                      onClick={handleClear}
                      disabled={isSubmitting}
                      color="secondary"
                      variant="outlined"
                      startIcon={<ClearIcon />}
                    >
                      {t("buttons.clear")}
                    </Button>
                    <Button
                      className={classes.submitButton}
                      type="submit"
                      disabled={isSubmitting || !isValid}
                      color="primary"
                      variant="outlined"
                      startIcon={<SearchIcon />}
                    >
                      {t("buttons.search")}
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </Card>
          )
        }}
      </Formik>
    </>

  );
}

UserFilter.displayName = 'UserFilter';

const mapStateToProps = (state: ApplicationState) => ({
  
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(usersActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserFilter);