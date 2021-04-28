import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as booksActions from '../../../store/ducks/books/actions';
import { Book, BookFilter } from '../../../store/ducks/books/types';


import { Grid, TextField, Button, makeStyles, createStyles, Theme, } from '@material-ui/core';
import { Formik, Form, FormikProps } from 'formik';
import { ApplicationState } from '../../../store';

const FilterBook = React.memo(function FilterBook(props) {
  const [perfilGestorFiscalSup, setPerfilGestorFiscalSup] = useState(true);
  const [consultado, setConsultado] = useState(false);
  

  const initialValues: BookFilter = {
    rowsPerPage: 10,
    currentPage: 1,
    title: '',
    author: '',
    publisher: '',
    subject:'',
    startDate:undefined,
    finalDate:undefined
  };

  // useEffect(() => {
  //   if (!dtEnvioEmailMils) {
  //     find({ resetPaginationFilters: true });
  //   }
  // }, [find, dtEnvioEmailMils]);

 function handleSubmit (values: BookFilter, actions: any) {
  console.log('Form submitted!');
  console.log(values);
  actions.setSubmitting(false);
 }

  return (
    <div>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
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
          <Form>
            {/* <h1 className={classes.title}>Consulta Livros</h1> */}
            <h1 >Consulta Livros</h1>
            <Grid container justify="space-around" direction="row">
             <Grid item lg={10} md={10} sm={10} xs={10}>                                    
                <TextField
                    name="title"
                    type="text"
                    placeholder="Title"
                    value={values.title}
                    onChange={handleChange}
                />
              </Grid>
            <Grid item lg={10} md={10} sm={10} xs={10}>                                    
                <TextField
              name="author"
              type="text"
              placeholder="Author"
              value={values.author}
              onChange={handleChange}
            />
            </Grid>
            <Grid item lg={10} md={10} sm={10} xs={10}>                                    
                <TextField
              name="publisher"
              type="text"              
              placeholder="Publisher"
              value={values.publisher}
              onChange={handleChange}
            />
            </Grid>
            <Grid item lg={10} md={10} sm={10} xs={10}>                                    
                <TextField
              name="subject"
              type="text"              
              placeholder="Subject"
              value={values.subject}
              onChange={handleChange}
            />
            </Grid>
            </Grid>
            <button
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
            </Form>
                    )
                }}
            </Formik>
        </div>
  );
});

FilterBook.displayName = 'FilterBook';

const mapStateToProps = (state: ApplicationState) => ({
  // listResult: selectors.getListResult(state),
  // filters: selectors.getFilters(state)
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(booksActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FilterBook);