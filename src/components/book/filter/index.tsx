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
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
//Actions and store
import { ApplicationState } from '../../../store';
import * as booksActions from '../../../store/ducks/books/actions';
//Types and local components
import { Book, BookRequestFilter as Filter, BookSubject } from '../../../store/ducks/books/types';
import CustomObjSelect from '../../utils/CustomObjSelect';
//Third party
import { Formik, Form, FormikProps, Field } from 'formik';
//Translation
import { useTranslation } from "react-i18next";
import "../../../services/i18n/i18n";
//Style
import { Grid, TextField, Button, InputLabel, CardContent, Card, CardHeader, } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import { useStyles } from '../../../styles/Styles';

interface StateProps {
  books?: Book[],
  bookSubjectList: BookSubject[]
}

interface DispatchProps {
  searchRequest(): void
  bookSubjectRequest(): void  
  updateRequestFilter(requestFilter: Filter): void
  cleanRequestFilter(): void
}

type Props = StateProps & DispatchProps

const INITIAL_VALUES: Filter = {
  rowsPerPage: 10,
  currentPage: 1,
  title: '',
  author: '',
  publisher: '',
  subject: undefined,
  startDate: undefined,
  finalDate: undefined
};

const FilterBook: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();  
  const { bookSubjectList, searchRequest, bookSubjectRequest,  updateRequestFilter, cleanRequestFilter } = props;

  useEffect(() => {
    bookSubjectRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(values: Filter, actions: any) {
    console.log('Form submitted!');
    console.log(values);

    actions.setSubmitting(false);
    cleanRequestFilter();
    updateRequestFilter(values);
    searchRequest();
  }
  
  function handleClear() {
    console.log('clear button'); 
    cleanRequestFilter();  
  }
  
  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={INITIAL_VALUES}
        className={classes.root}
        
      >
        {(props: FormikProps<Filter>) => {
          const {
            values,          
            handleChange,
            isSubmitting,
            resetForm            
          } = props
          return (
            <Card className={classes.root}>
              <Form>
                <CardHeader
                  title={t("titles.search_books")}
                  subheader=""
                />
                <CardContent>
                  <Grid container justify="space-around" direction="row">
                    <Grid item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.title")}</InputLabel>
                      <TextField
                        name="title"
                        type="text"
                        placeholder=""
                        value={values.title || ""}
                        onChange={handleChange}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.author")}</InputLabel>
                      <TextField
                        name="author"
                        type="text"
                        placeholder=""
                        value={values.author || ""}
                        onChange={handleChange}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.publisher")}</InputLabel>
                      <TextField
                        name="publisher"
                        type="text"
                        placeholder=""
                        value={values.publisher || ""}
                        onChange={handleChange}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.subject")}</InputLabel>
                      <Field
                        className="form-select-field"
                        name="subjectName"
                        options={bookSubjectList}
                        component={CustomObjSelect}
                        placeholder={t("placeholder.select_book_subject")}                        
                        isObject
                      />
                    </Grid>
                    <Grid item className="form-grid" container lg={10} md={10} sm={10} xs={10}>                    
                      <Grid item lg={6} md={6} sm={6} xs={6}>
                        <InputLabel className="form-label" >{t("labels.start_date_publish")}</InputLabel>
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
                      onClick={
                        () => {
                          resetForm()
                          handleClear()
                        }}
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
                      disabled={isSubmitting}
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

FilterBook.displayName = 'FilterBook';

const mapStateToProps = (state: ApplicationState) => ({
  bookSubjectList: state.books.bookSubjectListData  
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(booksActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FilterBook);