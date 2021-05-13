import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as booksActions from '../../../store/ducks/books/actions';
import { Book, BookFilter, EBookCondition, EBookFormat } from '../../../store/ducks/books/types';


import { Grid, TextField, Button, makeStyles, createStyles, Theme, } from '@material-ui/core';
import { Formik, Form, FormikProps } from 'formik';
import { ApplicationState } from '../../../store';

interface StateProps {
  book?: Book
}

interface DispatchProps {
  loadRequest(): void,
  changeFlagEditing(): void,
  changeFlagDetail(): void,
  findByIdRequest(id: number):void
}

type Props = StateProps & DispatchProps

const INITIAL_VALUES: Book = {    
  id: 0,
  title: '',
  // authors: undefined,
  language: undefined,
  // publisher: undefined,
  subjectName: undefined,
  subtitle: '',
  review: '',
  link: '',
  format: EBookFormat.HARDCOVER,
  condition: EBookCondition.NEW,
  edition: 1,
  publishDate: undefined,
  rating: 0,
  length: 0,
};

const EditBook : React.FC<Props> = (props) =>{
//const EditBook = React.memo(function EditBook(props) {
  
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
   const {book} = props;

  useEffect(() => {
    if(book){
      book.subjectName = book.subject ? book.subject.name : "";
    setInitialValues(book)}
  }, [book]);


 function handleSubmit (values: Book, actions: any) {
  console.log('Form submitted!');
  console.log(values);
  actions.setSubmitting(false);
 }
 console.log('initialValues: ');
 console.log(initialValues);
  return (
    <div>
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
         {(props: FormikProps<Book>) => {
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
            <h1 >Criar/Editar Livros</h1>
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
                    name="subtitle"
                    type="text"
                    placeholder="Subtitle"
                    value={values.subtitle}
                    onChange={handleChange}
                />
              </Grid>
            {/* <Grid item lg={10} md={10} sm={10} xs={10}>                                    
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
            </Grid> */}
            <Grid item lg={10} md={10} sm={10} xs={10}>                                    
                <TextField
              name="review"
              type="text"              
              placeholder="review"
              value={values.review}
              onChange={handleChange}
            />
            </Grid>
            <Grid item lg={10} md={10} sm={10} xs={10}>                                    
                <TextField
              name="link"
              type="text"              
              placeholder="link"
              value={values.link}
              onChange={handleChange}
            />
            </Grid>
            <Grid item lg={10} md={10} sm={10} xs={10}>                                    
                <TextField
              name="edition"
              type="number"              
              placeholder="edition"
              value={values.edition}
              onChange={handleChange}
            />
            </Grid>
            <Grid item lg={10} md={10} sm={10} xs={10}>                                    
                <TextField
              name="length"
              type="number"              
              placeholder="length"
              value={values.length}
              onChange={handleChange}
            />
            </Grid>
            <Grid item lg={10} md={10} sm={10} xs={10}>                                    
                <TextField
              name="publishDate"
              type="date"              
              placeholder="publishDate"
              value={values.publishDate}
              onChange={handleChange}
            />
            </Grid>
            <Grid item lg={10} md={10} sm={10} xs={10}>                                    
                <TextField
              name="subject"
              type="text"              
              placeholder="Subject"
              value={values.subjectName}
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
}
//);

EditBook.displayName = 'EditBook';

const mapStateToProps = (state: ApplicationState) => ({
  book: state.books.bookData,  
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(booksActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditBook);

