import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../../../store';

import * as peopleActions from '../../../store/ducks/people/actions';
import { Person } from '../../../store/ducks/people/types';
import CustomSelect from '../../utils/CustomSelect';
import { SexList } from '../../utils/constants';

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
  person?: Person
}

interface DispatchProps {
  updateRequest(person: Person): void,
  createRequest(person: Person): void,
  changeFlagEditing(): void,
  changeFlagDetail(): void,
  cleanPersonEdit(): void,
  findByIdRequest(id: number): void
}

type Props = StateProps & DispatchProps

const INITIAL_VALUES: Person = {
  id: 0,
  name: '',
  cpf: '',
  sex: '',
  email: '',
  birthdate: undefined,
  birthCity: undefined,
  birthCountry: undefined,
  address: undefined
};

const EditPerson: React.FC<Props> = (props) => {

  const classes = useStyles();
  const { t } = useTranslation();
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const { person, changeFlagEditing, cleanPersonEdit, createRequest, updateRequest } = props;
  const [flagEditing, setFlagEditing] = useState(false);
  const [subtitle, setSubtitle] = useState(t("titles.submit_person"));

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(100, t("errors.too_long"))
      .required(t("errors.name_required")),
    cpf: Yup.string()
      .max(100, t("errors.too_long"))
      .required(t("errors.cpf_required")),
    birthdate: Yup.date()
      .required(t("errors.birthdate_required"))
  });

  useEffect(() => {
    console.log("Person")
    console.log(person)
    if (person) {
      setInitialValues(person);
      setFlagEditing(true);
      setSubtitle(t("titles.edit_person"))
    }
  }, [person]);

  useEffect(() => {
  }, []);

  function handleSubmit(values: Person, actions: any) {

    actions.setSubmitting(false);


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
    cleanPersonEdit();
  }
  return (
    <div className="page-containner">
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(props: FormikProps<Person>) => {
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
                        helperText={errors.name}
                        error={
                          errors.name && touched.name
                            ? true
                            : false
                        }
                      />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
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
                        helperText={errors.cpf}
                        error={
                          errors.cpf && touched.cpf
                            ? true
                            : false
                        }
                      />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.email")}</InputLabel>
                      <TextField
                        name="email"
                        type="text"
                        placeholder=""
                        value={values.email}
                        onChange={handleChange}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                        helperText={errors.email}
                        error={
                          errors.email && touched.email
                            ? true
                            : false
                        }
                      />
                    </Grid>

                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.sex")}</InputLabel>
                      <Field
                        className="form-select-field"
                        name="sex"
                        options={SexList}
                        component={CustomSelect}
                        placeholder={t("placeholder.select_sex")}
                        isMulti={false}
                      />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.birthdate")}</InputLabel>
                      <TextField
                        name="birthdate"
                        type="date"
                        value={values.birthdate}
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
//);

EditPerson.displayName = 'EditPerson';

const mapStateToProps = (state: ApplicationState) => ({
  person: state.people.personData
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(peopleActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditPerson);

