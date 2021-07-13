import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../../../store';

import * as peopleActions from '../../../store/ducks/people/actions';
import { Person, PersonFilter } from '../../../store/ducks/people/types';
import CustomObjSelect from '../../utils/CustomObjSelect';

import { Formik, Form, FormikProps, Field } from 'formik';
import { useTranslation } from "react-i18next";
import "../../../services/i18n/i18n";

import { Grid, TextField, Button, InputLabel, CardContent, Card, CardHeader, } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import { useStyles } from '../../../styles/Styles';
import CustomSelect from '../../utils/CustomSelect';
import { SexList } from '../../utils/constants';

interface StateProps {
  people?: Person[]  
}

interface DispatchProps {
  searchRequest(filter: PersonFilter): void,  
}

type Props = StateProps & DispatchProps

const INITIAL_VALUES: PersonFilter = {
  rowsPerPage: 10,
  currentPage: 1,
  name: '',
  cpf: '',
  sex: '',  
  startDate: undefined,
  finalDate: undefined
};

const FilterPerson: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();  
  const { searchRequest } = props;

  // useEffect(() => {
  //   bookSubjectRequest();
  // }, []);

  function handleSubmit(values: PersonFilter, actions: any) {
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
        {(props: FormikProps<PersonFilter>) => {
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
                  title={t("titles.search_people")}
                  subheader=""
                />
                <CardContent>
                  <Grid container justify="space-around" direction="row">
                    <Grid item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.name")}</InputLabel>
                      <TextField
                        name="name"
                        type="text"
                        placeholder=""
                        value={values.name}
                        onChange={handleChange}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.cpf")}</InputLabel>
                      <TextField
                        name="cpf"
                        type="text"
                        placeholder=""
                        value={values.cpf}
                        onChange={handleChange}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                      />
                    
                      <InputLabel className="form-label" >{t("labels.sex")}</InputLabel>
                      <Field
                        className="form-select-field"
                        name="format"
                        options={SexList}
                        component={CustomSelect}
                        placeholder={t("placeholder.select_sex")}
                        isMulti={false}
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

FilterPerson.displayName = 'FilterPerson';

const mapStateToProps = (state: ApplicationState) => ({
  
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(peopleActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FilterPerson);