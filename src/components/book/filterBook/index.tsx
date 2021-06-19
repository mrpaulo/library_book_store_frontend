import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as booksActions from '../../../store/ducks/books/actions';
import { Book, BookFilter, bookFormLabel, BookSubject } from '../../../store/ducks/books/types';


import { Grid, TextField, Button, InputLabel, CardContent, CardActions, Card, CardHeader, } from '@material-ui/core';
import { Formik, Form, FormikProps, Field } from 'formik';
import { ApplicationState } from '../../../store';
import { useStyles } from '../../../styles/Styles';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import CustomObjSelect from '../../utils/CustomObjSelect';

interface StateProps {
  books?: Book[],
  bookSubjectList: BookSubject[]
}

interface DispatchProps {
  searchRequest(filter: BookFilter): void,
  bookSubjectRequest(): void
}

type Props = StateProps & DispatchProps



const FilterBook: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { searchRequest, bookSubjectRequest, bookSubjectList } = props;
  const [perfilGestorFiscalSup, setPerfilGestorFiscalSup] = useState(true);
  const [consultado, setConsultado] = useState(false);


  const initialValues: BookFilter = {
    rowsPerPage: 10,
    currentPage: 1,
    title: '',
    author: '',
    publisher: '',
    subject: undefined,
    startDate: undefined,
    finalDate: undefined
  };

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
        initialValues={initialValues}
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
                  title=" Consulta Livros"
                  subheader=""
                />
                <CardContent>
                  <Grid container justify="space-around" direction="row">
                    <Grid item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{bookFormLabel.title}</InputLabel>
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
                      <InputLabel className="form-label" >{bookFormLabel.author}</InputLabel>
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
                      <InputLabel className="form-label" >{bookFormLabel.publisher}</InputLabel>
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
                      <InputLabel className="form-label" >{bookFormLabel.subject}</InputLabel>
                      <Field
                        className="form-select-field"
                        name="subjectName"
                        options={bookSubjectList}
                        component={CustomObjSelect}
                        placeholder="Select a book subject..."
                        isMulti={false}
                        isObject={true}
                      />
                    </Grid>
                  </Grid>
                </CardContent>                
                <Grid item lg={10} md={10} sm={10} xs={10}>
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
                      Clear
                    </Button>
                    <Button
                    className={classes.submitButton}
                      type="submit"
                      disabled={isSubmitting}
                      color="primary"
                      variant="outlined"
                      startIcon={<SearchIcon />}
                    >
                      Search
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
  // filters: selectors.getFilters(state)
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(booksActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FilterBook);