import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as booksActions from '../../../store/ducks/books/actions';
import { Book, BookFilter, bookFormLabel, BookSubject, CustomEnum } from '../../../store/ducks/books/types';

import { Grid, TextField, Button, InputLabel, CardContent, CardActions, Card, CardHeader, } from '@material-ui/core';
import { Formik, Form, FormikProps, Field } from 'formik';
import { ApplicationState } from '../../../store';
import Select from '@material-ui/core/Select'
import CustomSelect from '../../utils/CustomSelect';
import CustomObjSelect from '../../utils/CustomObjSelect';
import '../../../styles/global.css';
import { useStyles } from '../../../styles/Styles';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';

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
  findByIdRequest(id: number): void
  bookFormatRequest(): void
  bookConditionRequest(): void
  bookSubjectRequest(): void
}

type Props = StateProps & DispatchProps

const INITIAL_VALUES: Book = {
  id: 0,
  title: '',
  authors: [{
    id: 1,
    name: "teste",
    birthdate: new Date('2010-12-01'),
    cpf: "00788975056",
    sex: "M",
    email: "sdsd@ffd.com.br",
    birthCity: "Florianopolis",
    birthCountry: "Brasil",
    address: {
      id: 1
    }
  }],
  languageName: undefined,
  publisher: { id: 3, name: 'teste company 2', cnpj: '55650490000163', description: '', createDate: new Date() },
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

const EditBook: React.FC<Props> = (props) => {
  //const EditBook = React.memo(function EditBook(props) {
  const classes = useStyles();
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const { book, booksFormat, booksCondition, bookSubjectList, changeFlagEditing, cleanBookEdit, createRequest, updateRequest, bookFormatRequest, bookConditionRequest, bookSubjectRequest } = props;
  const [flagEditing, setFlagEditing] = useState(false);
  const [subtitle, setSubtitle] = useState("Registrar Livro");

  useEffect(() => {
    if (book) {
      book.subjectName = book.subject ? book.subject.name : "";
      setInitialValues(book);
      setFlagEditing(true);
      setSubtitle("Editar Livro")
    }
  }, [book]);

  useEffect(() => {
    bookConditionRequest();
    bookFormatRequest();
    bookSubjectRequest();    
  }, []);

  function handleSubmit(values: Book, actions: any) {

    actions.setSubmitting(false);
    //values.format = EBookFormat.HARDCOVER;

    console.log('Form submitted!');
    console.log(values);
    if (flagEditing) {
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
    <div className="page-containner">
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
            <Card className={classes.root}>
              <Form>
                <CardHeader
                  title={subtitle}
                  subheader=""
                />
                <CardContent>
                  <Grid className="form-containner" container justify="space-around" direction="row">
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
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
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{bookFormLabel.subtitle}</InputLabel>
                      <TextField
                        name="subtitle"
                        type="text"
                        placeholder=""
                        value={values.subtitle}
                        onChange={handleChange}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                      />
                    </Grid>
                    {/* <Grid item lg={10} md={10} sm={10} xs={10}>                                    
                <TextField
              name="author"
              type="text"
              placeholder="Author"
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
                <TextField
              name="publisher"
              type="text"              
              placeholder="Publisher"
              value={values.publisher}
              onChange={handleChange}
              className={classes.textField}
                        InputProps={{
                          className: classes.input,
                      }}
                      variant="outlined"
            />
            </Grid> */}
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{bookFormLabel.review}</InputLabel>
                      <TextField
                        name="review"
                        type="text"
                        placeholder=""
                        value={values.review}
                        onChange={handleChange}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{bookFormLabel.format}</InputLabel>
                      <Field
                        className="form-select-field"
                        name="format"
                        options={booksFormat}
                        component={CustomSelect}
                        placeholder="Select a book format.."
                        isMulti={false}
                      />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{bookFormLabel.condition}</InputLabel>
                      <Field
                        className="form-select-field"
                        name="condition"
                        options={booksCondition}
                        component={CustomSelect}
                        placeholder="Select a book condition..."
                        isMulti={false}
                      />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{bookFormLabel.link}</InputLabel>
                      <TextField
                        name="link"
                        type="text"
                        placeholder=""
                        value={values.link}
                        onChange={handleChange}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{bookFormLabel.edition}</InputLabel>
                      <TextField
                        name="edition"
                        type="number"
                        placeholder=""
                        value={values.edition}
                        onChange={handleChange}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{bookFormLabel.length}</InputLabel>
                      <TextField
                        name="length"
                        type="number"
                        value={values.length}
                        onChange={handleChange}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{bookFormLabel.publishDate}</InputLabel>
                      <TextField
                        name="publishDate"
                        type="date"
                        value={values.publishDate}
                        onChange={handleChange}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
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
                      onClick={handleCancel}
                      disabled={isSubmitting}
                      color="secondary"
                      variant="outlined"
                      startIcon={<ClearIcon />}
                    >
                      Cancel
                    </Button>
                    <Button
                      className={classes.submitButton}
                      type="submit"
                      disabled={isSubmitting}
                      color="primary"
                      variant="outlined"
                      startIcon={<SaveIcon />}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </Card>
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

