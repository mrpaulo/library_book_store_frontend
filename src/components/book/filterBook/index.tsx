import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as booksActions from '../../../store/ducks/books/actions';
import { Book, BookFilter, bookFormLabel } from '../../../store/ducks/books/types';


import { Grid, TextField, Button, InputLabel, CardContent, CardActions, Card, CardHeader, } from '@material-ui/core';
import { Formik, Form, FormikProps } from 'formik';
import { ApplicationState } from '../../../store';
import { useStyles } from '../../../styles/Styles';
import SearchIcon from '@material-ui/icons/Search';

interface StateProps {
  books?: Book[]
}

interface DispatchProps {
  searchRequest(filter: BookFilter): void
}

type Props = StateProps & DispatchProps



const FilterBook: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { searchRequest } = props;
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

  // useEffect(() => {
  //   if (!dtEnvioEmailMils) {
  //     find({ resetPaginationFilters: true });
  //   }
  // }, [find, dtEnvioEmailMils]);

  function handleSubmit(values: BookFilter, actions: any) {
    console.log('Form submitted!');
    console.log(values);

    actions.setSubmitting(false);
    searchRequest(values);
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
                      <TextField
                        name="subject"
                        type="text"
                        placeholder=""
                        value={values.subject}
                        onChange={handleChange}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                      }}
                      variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button                    
                    type="submit"
                    disabled={isSubmitting}
                    color="primary"
                    variant="outlined"
                    startIcon={<SearchIcon />}    
                  >
                    Search
                  </Button>
                </CardActions>
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
  // listResult: selectors.getListResult(state),
  // filters: selectors.getFilters(state)
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(booksActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FilterBook);