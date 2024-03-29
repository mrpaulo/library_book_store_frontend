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
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
//Actions and store
import * as booksActions from '../../../store/ducks/books/actions';
import { ApplicationState } from '../../../store';
//Types and local components
import { Book, BookLanguage, BookSubject } from '../../../store/ducks/books/types';
import AutoCompleteAuthor from '../../utils/AutoCompleteAuthor';
import AutoCompletePublisher from '../../utils/AutoCompletePublisher';
import CustomObjSelect from '../../utils/CustomObjSelect';
import CustomSelect from '../../utils/CustomSelect';
import { PublisherDTO } from '../../../store/ducks/publishers/types';
import { CustomEnum } from '../../utils/constants';
import { AuthorDTO } from '../../../store/ducks/authors/types';
//Third party
import { Formik, Form, FormikProps, Field } from 'formik';
//Translation
import { useTranslation } from "react-i18next";
import "../../../services/i18n/i18n";
//Style
import '../../../styles/global.css';
import { useStyles } from '../../../styles/Styles';
import { Grid, TextField, Button, InputLabel, CardContent, Card, CardHeader, Switch } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';
//Validation
import { validationBookSchema } from '../../utils/validationUtil';
import { formattedDate } from '../../utils/formatUtil';

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
  adultsOnly: false
};

const EditBook: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { book, booksFormat, booksCondition, bookSubjectList, languageList, changeFlagEditing, cleanBookEdit, createRequest, updateRequest, bookFormatRequest, bookConditionRequest, bookSubjectRequest, bookLanguageRequest } = props;
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const [flagEditing, setFlagEditing] = useState(false);
  const [subtitle, setSubtitle] = useState(t("titles.submit_book"));
  const [publisher, setPublisher] = useState<PublisherDTO | null>(null);
  const [authors, setAuthors] = useState<AuthorDTO[]>([]);
  const [publishDate, setPublishDate] = useState<string | undefined>(undefined);
  
  useEffect(() => {
    if (book) {
      book.subjectName = book.subject ? book.subject.name : "";
      book.languageName = book.language ? book.language.name : "";
      setAuthors(book.authors as AuthorDTO[]);
      setPublisher(book.publisher as PublisherDTO);
      setInitialValues(book);
      setFlagEditing(true);
      setSubtitle(t("titles.edit_book"))
      if(book.publishDate){        
        setPublishDate(formattedDate(new Date(book.publishDate)))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book]);

  useEffect(() => {
    bookConditionRequest();
    bookFormatRequest();
    bookSubjectRequest();
    bookLanguageRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(values: Book, actions: any) {

    actions.setSubmitting(false);
    if (publisher) {
      values.publisher = publisher;
    }
    if (authors.length > 0) {
      values.authors = authors;
    }
    
    if (flagEditing) {
      updateRequest(values);
    } else {
      createRequest(values);
    }
  }
  
  function handleCancel() {
    changeFlagEditing();
    cleanBookEdit();
  }
  return (
    <div className="page-containner">
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationBookSchema}
      >
        {(props: FormikProps<Book>) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            isSubmitting,
            isValid,
            setFieldValue
          } = props

          const getPublisherSelected = (publisher: PublisherDTO) => {
            values.publisher = publisher;
            setPublisher(publisher);
          }

          const getAuthorsSelected = (authors: AuthorDTO[]) => {
            values.authors = authors;
            setAuthors(authors);
          }

          const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = e.target;            
            let dateValue = new Date(value.replace(/-/g, '/')); 
            setPublishDate(formattedDate(dateValue));
            setFieldValue(name, value);
          };

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
                        value={values.title || ""}
                        onChange={handleChange}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                        helperText={t(errors.title as unknown as string)}
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
                        value={values.subtitle || ""}
                        onChange={handleChange}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                        helperText={t(errors.subtitle as unknown as string)}
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
                        helperText={t(errors.authors as unknown as string)}
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
                        component={AutoCompletePublisher}
                        onChange={handleChange}
                        publisherSelected={getPublisherSelected}
                        helperText={t(errors.publisher as unknown as string)}
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
                        value={values.review || ""}
                        onChange={handleChange}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                        helperText={t(errors.review as unknown as string)}
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
                        isObject
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
                        isObject
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
                      />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.link")}</InputLabel>
                      <TextField
                        name="link"
                        type="text"
                        placeholder=""
                        value={values.link || ""}
                        onChange={handleChange}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                        helperText={t(errors.link as unknown as string)}
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
                        value={values.edition || ""}
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
                        value={values.length || ""}
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
                        value={publishDate || ""}
                        onChange={handleChangeDate}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.adults_only")}</InputLabel>
                      <Switch
                        name="adultsOnly"
                        checked={values.adultsOnly as boolean}
                        onChange={handleChange}                        
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
                      disabled={isSubmitting || !isValid}
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

