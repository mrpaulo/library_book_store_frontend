import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../../../store';

import * as booksActions from '../../../store/ducks/books/actions';
import { Book, BookFilter, BookSubject } from '../../../store/ducks/books/types';
import CustomObjSelect from '../../utils/CustomObjSelect';

import { Formik, Form, FormikProps, Field } from 'formik';
import { useTranslation } from "react-i18next";
import "../../../services/i18n/i18n";

import { Grid, TextField, Button, InputLabel, CardContent, Card, CardHeader, } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import { useStyles } from '../../../styles/Styles';

interface StateProps {
  books?: Book[],
  bookSubjectList: BookSubject[]
}

interface DispatchProps {
  searchRequest(filter: BookFilter): void
  bookSubjectRequest(): void  
}

type Props = StateProps & DispatchProps

const INITIAL_VALUES: BookFilter = {
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
  const { searchRequest, bookSubjectRequest, bookSubjectList } = props;

  useEffect(() => {
    bookSubjectRequest();
  }, []);

  function handleSubmit(values: BookFilter, actions: any) {
    console.log('Form submitted!');
    console.log(values);

    actions.setSubmitting(false);
    searchRequest(values);
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
      >
        {(props: FormikProps<BookFilter>) => {
          const {
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
            isSubmitting,
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
                        value={values.title}
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
                        value={values.author}
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
                        value={values.publisher}
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
                        isMulti={false}
                        isObject={true}
                      />
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