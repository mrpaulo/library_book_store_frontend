import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../../../store';

import * as booksActions from '../../../store/ducks/books/actions';
import { Book, BookLanguage, BookSubject } from '../../../store/ducks/books/types';
import AutoCompleteAuthor from '../../utils/AutoCompleteAuthor';
import AutoCompleteCompany from '../../utils/AutoCompleteCompany';
import CustomObjSelect from '../../utils/CustomObjSelect';
import CustomSelect from '../../utils/CustomSelect';
import { CompanyDTO } from '../../../store/ducks/companies/types';
import { CustomEnum } from '../../utils/constants';
import { PersonDTO } from '../../../store/ducks/people/types';

import { Formik, Form, FormikProps, Field } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from "react-i18next";
import "../../../services/i18n/i18n";

import '../../../styles/global.css';
import { useStyles } from '../../../styles/Styles';
import { Grid, TextField, Button, InputLabel, CardContent, Card, CardHeader, } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';

interface StateProps {
  book?: Book,
  booksFormat: CustomEnum[],
  booksCondition?: CustomEnum[],
  bookSubjectList: BookSubject[],
  languageList: BookLanguage[]
}

interface DispatchProps {
  updateRequest(book: Book): void,
  createRequest(book: Book): void,
  changeFlagEditing(): void,
  changeFlagDetail(): void,
  cleanBookEdit(): void,
  findByIdRequest(id: number): void,
  bookFormatRequest(): void,
  bookConditionRequest(): void,
  bookSubjectRequest(): void
  bookLanguageRequest(): void
}

type Props = StateProps & DispatchProps

const INITIAL_VALUES: Book = {
  id: 0,
  title: '',
  authors: [],
  languageName: undefined,
  publisher: undefined,
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
  const classes = useStyles();
  const { t } = useTranslation();  
  const { book, booksFormat, booksCondition, bookSubjectList, languageList, changeFlagEditing, cleanBookEdit, createRequest, updateRequest, bookFormatRequest, bookConditionRequest, bookSubjectRequest, bookLanguageRequest } = props;
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const [flagEditing, setFlagEditing] = useState(false);
  const [subtitle, setSubtitle] = useState(t("titles.submit_book"));
  const [publisher, setPublisher] = useState<CompanyDTO | null>(null);
  const [authors, setAuthors] = useState<PersonDTO[]>([]);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .max(100, t("errors.too_long"))
      .required(t("errors.title_required")),
    authors: Yup.array()
      .min(1, t("errors.too_long"))
      .required(),
    publisher: Yup.object().required(),
    subtitle: Yup.string()
      .max(100, t("errors.too_long")),
    review: Yup.string()
      .max(500, t("errors.too_long")),
    link: Yup.string()
      .max(100, t("errors.too_long"))
  });

  useEffect(() => {
    if (book) {
      book.subjectName = book.subject ? book.subject.name : "";
      book.languageName = book.language ? book.language.name : "";
      setAuthors(book.authors as PersonDTO[]);
      setPublisher(book.publisher as CompanyDTO);
      setInitialValues(book);
      setFlagEditing(true);
      setSubtitle(t("titles.edit_book"))
    }
  }, [book]);

  useEffect(() => {
    bookConditionRequest();
    bookFormatRequest();
    bookSubjectRequest();
    bookLanguageRequest();
  }, []);

  function handleSubmit(values: Book, actions: any) {

    actions.setSubmitting(false);

    if (publisher) {
      values.publisher = publisher;
    }
    if (authors.length > 0) {
      values.authors = authors;
    }
    console.log('Form submitted!');
    console.log(values);

    if (flagEditing) {
      updateRequest(values);
      console.log('Update!');
    } else {
      createRequest(values);
      console.log('Created!');
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
        validationSchema={validationSchema}
      >
        {(props: FormikProps<Book>) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            isSubmitting,
          } = props
         
          const getPublisherSelected = (company: CompanyDTO) => {            
            values.publisher = company;   
            setPublisher(company);
          }
        
          const getAuthorsSelected = (authors: PersonDTO[]) => {
            values.authors = authors;       
            setAuthors(authors) ;
          }          

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
                        helperText={errors.title}
                        error={
                          errors.title && touched.title
                            ? true
                            : false
                        }
                      />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.subtitle")}</InputLabel>
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
                        helperText={errors.subtitle}
                        error={
                          errors.subtitle && touched.subtitle
                            ? true
                            : false
                        }
                      />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.authors")}</InputLabel>
                      <Field
                        className="form-select-field"
                        name="authors"
                        valueSelected={authors}
                        component={AutoCompleteAuthor}
                        onChange={handleChange}
                        authorsSelected={getAuthorsSelected}
                        helperText={errors.authors}
                        error={
                          errors.authors && touched.authors
                            ? true
                            : false
                        }
                      />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.publisher")}</InputLabel>
                      <Field
                        className="form-select-field"
                        name="publisher"
                        valueSelected={publisher}
                        component={AutoCompleteCompany}
                        onChange={handleChange}
                        publisherSelected={getPublisherSelected}
                        helperText={errors.publisher}
                        error={
                          errors.publisher && touched.publisher
                            ? true
                            : false
                        }
                      />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.review")}</InputLabel>
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
                        helperText={errors.review}
                        error={
                          errors.review && touched.review
                            ? true
                            : false
                        }
                      />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.language_name")}</InputLabel>
                      <Field
                        className="form-select-field"
                        name="languageName"
                        options={languageList}
                        component={CustomObjSelect}
                        placeholder={t("placeholder.select_language")}
                        isMulti={false}
                        isObject={true}
                      />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
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
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.format")}</InputLabel>
                      <Field
                        className="form-select-field"
                        name="format"
                        options={booksFormat}
                        component={CustomSelect}
                        placeholder={t("placeholder.select_book_format")}
                        isMulti={false}
                      />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.condition")}</InputLabel>
                      <Field
                        className="form-select-field"
                        name="condition"
                        options={booksCondition}
                        component={CustomSelect}
                        placeholder={t("placeholder.select_book_condition")}
                        isMulti={false}
                      />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.link")}</InputLabel>
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
                        helperText={errors.link}
                        error={
                          errors.link && touched.link
                            ? true
                            : false
                        }
                      />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.edition")}</InputLabel>
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
                      <InputLabel className="form-label" >{t("labels.length")}</InputLabel>
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
                      <InputLabel className="form-label" >{t("labels.publish_date")}</InputLabel>
                      <TextField
                        name="publishDate"
                        type="date"
                        value={values.publishDate}
                        onChange={handleChange}
                        className={classes.textField}
                        defaultValue=""
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
                      {t("buttons.cancel")}
                    </Button>
                    <Button
                      className={classes.submitButton}
                      type="submit"
                      disabled={isSubmitting}
                      color="primary"
                      variant="outlined"
                      startIcon={<SaveIcon />}
                    >
                      {t("buttons.submit")}
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

EditBook.displayName = 'EditBook';

const mapStateToProps = (state: ApplicationState) => ({
  book: state.books.bookData,
  booksFormat: state.books.booksFormatData,
  booksCondition: state.books.booksConditionData,
  bookSubjectList: state.books.bookSubjectListData,
  languageList: state.books.languageListData
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(booksActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditBook);

