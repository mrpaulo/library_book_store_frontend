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
import * as authorsActions from '../../../store/ducks/authors/actions';
import * as addressesActions from '../../../store/ducks/addresses/actions';
import { ApplicationState } from '../../../store';
//Types, constants and local components
import { Author } from '../../../store/ducks/authors/types';
import { Address, Country } from '../../../store/ducks/addresses/types';
import CustomSelect from '../../utils/CustomSelect';
import { SexList } from '../../utils/constants';
import ModalAddress from '../../address'
import CustomObjSelect from '../../utils/CustomObjSelect';
//Third party
import { Formik, Form, FormikProps, Field } from 'formik';
import * as Yup from 'yup';
//Tranlation
import { useTranslation } from "react-i18next";
import "../../../services/i18n/i18n";
//Style
import '../../../styles/global.css';
import { useStyles } from '../../../styles/Styles';
import { Grid, TextField, Button, InputLabel, CardContent, Card, CardHeader, } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';

interface StateProps {
  author?: Author,
  countriesList?: Country[],
}

interface DispatchProps {
  updateRequest(author: Author): void,
  createRequest(author: Author): void,
  changeFlagEditing(): void,
  changeFlagDetail(): void,
  cleanAuthorEdit(): void,
  findByIdRequest(id: number): void,
  countryRequest(): void
}

type Props = StateProps & DispatchProps

const INITIAL_VALUES: Author = {
  id: 0,
  name: '',
  sex: '',
  email: '',
  birthdate: undefined,
  birthCity: undefined,
  birthCountry: undefined,
  address: undefined,
  description: ''
};

const EditAuthor: React.FC<Props> = (props) => {

  const classes = useStyles();
  const { t } = useTranslation();
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const { author, countriesList, changeFlagEditing, cleanAuthorEdit, createRequest, updateRequest, countryRequest } = props;
  const [flagEditing, setFlagEditing] = useState(false);
  const [countrySelected, setCountrySelected] = useState<Country | null>(null);
  const [subtitle, setSubtitle] = useState(t("titles.submit_author"));

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(100, t("errors.too_long"))
      .required(t("errors.name_required")),   
    birthdate: Yup.date()
      .required(t("errors.birthdate_required")),
      description: Yup.string()
      .max(100, t("errors.too_long"))
  });

  useEffect(() => {
    console.log("Author")
    console.log(author)
    if (author) {
      author.birthCountryName = author.birthCountry ? author.birthCountry.name : "" ;
      setInitialValues(author);
      setFlagEditing(true);
      setSubtitle(t("titles.edit_author"))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [author]);

  useEffect(() => {
    countryRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(values: Author, actions: any) {
    actions.setSubmitting(false);

    if (countrySelected) {
      values.birthCountry = countrySelected;
    }
    if (flagEditing) {
      updateRequest(values);
    } else {
      createRequest(values);
    }
  }

  function handleCancel() {
    changeFlagEditing();
    cleanAuthorEdit();
  }

  return (
    <div className="page-containner">
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(props: FormikProps<Author>) => {
          const {
            values,
            touched,
            errors,            
            handleChange,
            isSubmitting,
          } = props

          const handleAddress = (address: Address) => {
            values.address = address;
          }

          const getCountrySelected = (country: Country) => {
            setCountrySelected(country);
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
                      <InputLabel className="form-label" >{t("labels.name")}</InputLabel>
                      <TextField
                        name="name"
                        type="text"
                        placeholder=""
                        value={values.name || ""}
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
                      <InputLabel className="form-label" >{t("labels.email")}</InputLabel>
                      <TextField
                        name="email"
                        type="text"
                        placeholder=""
                        value={values.email || ""}
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
                      <InputLabel className="form-label" >{t("labels.address")}</InputLabel>
                      <ModalAddress addressSrc={values.address} addressSetup={handleAddress} name={values.name} />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.birthdate")}</InputLabel>
                      <TextField
                        name="birthdate"
                        type="date"
                        value={values.birthdate || ""}
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
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.birth_country")}</InputLabel>
                      <Field
                        className="form-select-field"
                        name="birthCountryName"
                        options={countriesList}
                        component={CustomObjSelect}
                        setValueSelected={getCountrySelected}
                        placeholder={t("placeholder.select_country")}
                        isMulti={false}
                        isObject={true}
                        isAddress={true}
                      />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.description")}</InputLabel>
                      <TextField
                        name="description"
                        type="text"
                        placeholder=""
                        value={values.description || ""}
                        onChange={handleChange}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                        helperText={errors.description}
                        error={
                          errors.description && touched.description
                            ? true
                            : false
                        }
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

EditAuthor.displayName = 'EditAuthor';

const mapStateToProps = (state: ApplicationState) => ({
  author: state.authors.authorData,
  countriesList: state.addresses.countriesListData,
});
const actions = { ...authorsActions, ...addressesActions };
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditAuthor);

