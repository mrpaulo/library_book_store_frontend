import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as booksActions from '../../../store/ducks/books/actions';
import { Book, BookFilter, BookSubject, CustomEnum } from '../../../store/ducks/books/types';


import { Grid, TextField, Button, makeStyles, createStyles, Theme, MenuItem, } from '@material-ui/core';
import { Formik, Form, FormikProps, Field } from 'formik';
import { ApplicationState } from '../../../store';
import Select from '@material-ui/core/Select'
import CustomSelect from '../../utils/CustomSelect';
interface StateProps {
  book?: Book,
  booksFormat: CustomEnum[],
  booksCondition?: CustomEnum[],
  bookSubjectList: BookSubject[]
}

interface DispatchProps {
  updateRequest(book: Book): void,
  createRequest(book: Book): void,
  changeFlagEditing(): void,
  changeFlagDetail(): void,
  cleanBookEdit(): void,
  findByIdRequest(id: number):void
  bookFormatRequest():void
  bookConditionRequest():void
  bookSubjectRequest():void
}

type Props = StateProps & DispatchProps

const INITIAL_VALUES: Book = {    
  id: 0,
  title: '',
   authors: [{
    id: 1, 
    name: "teste",
   birthdate:new Date('2010-12-01'),
   cpf: "00788975056",
   sex: "M",
   email: "sdsd@ffd.com.br",
   birthCity: "Florianopolis",
   birthCountry: "Brasil",
   address : {
       id: 1
   }}],
  languageName: undefined,
   publisher: { id: 3, name: 'teste company 2', cnpj: '55650490000163', description: '', createDate: new Date()},
  subjectName: undefined,
  subtitle: '',
  review: '',
  link: '',
  format: undefined,
  condition: undefined,
  edition: 1,
  publishDate: undefined,
  rating: 0,
  length: 0,
};

const EditBook : React.FC<Props> = (props) =>{
//const EditBook = React.memo(function EditBook(props) {
  
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
   const {book, booksFormat, booksCondition, bookSubjectList, changeFlagEditing, cleanBookEdit, createRequest, updateRequest, bookFormatRequest, bookConditionRequest, bookSubjectRequest} = props;
   const [flagEditing, setFlagEditing] = useState(false);
   
  useEffect(() => {
    if(book){
      book.subjectName = book.subject ? book.subject.name : "";
      setInitialValues(book);
      setFlagEditing(true);
    }
  }, [book]);

  useEffect(() => {
    bookConditionRequest(); 
    bookFormatRequest(); 
    bookSubjectRequest(); 
    console.log("bookSubjectList")   
    console.log(bookSubjectList)   
  }, []);

 function handleSubmit (values: Book, actions: any) {
  
  actions.setSubmitting(false);
  //values.format = EBookFormat.HARDCOVER;
  
  console.log('Form submitted!');
  console.log(values);
  if(flagEditing){
    updateRequest(values);
    console.log('Created!');
  } else {
    console.log('Update!');
    createRequest(values);
  }
 }
function handleCancel() {
  console.log('cancel button');
  changeFlagEditing();
  cleanBookEdit();
}
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
           <Field
              className="custom-select"
              name="format"
              options={booksFormat}
              component={CustomSelect}
              placeholder="Select a book format.."
              isMulti={false}
            />
            </Grid>
            <Grid item lg={10} md={10} sm={10} xs={10}>                                                
           <Field
              className="custom-select"
              name="condition"
              options={booksCondition}
              component={CustomSelect}
              placeholder="Select a book condition..."
              isMulti={false}
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
            {/* aqui vai ser um campo com autocomplete pegando do que tem no banco */}
            <Grid item lg={10} md={10} sm={10} xs={10}>      
            <Field
              className="custom-select"
              name="subject"
              options={bookSubjectList}
              component={CustomSelect}
              placeholder="Select a book subject..."
              isMulti={false}
              isObject={true}
            />                              
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
              type="reset"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
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
  booksFormat: state.books.booksFormatData,  
  booksCondition: state.books.booksConditionData,  
  bookSubjectList: state.books.bookSubjectListData
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(booksActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditBook);

