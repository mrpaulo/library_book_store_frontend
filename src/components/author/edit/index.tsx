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
import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
//Actions and store
import * as authorsActions from '../../../store/ducks/authors/actions';
import * as addressesActions from '../../../store/ducks/addresses/actions';
import { ApplicationState } from '../../../store';
//Types, constants and local components
import { Author } from '../../../store/ducks/authors/types';
import { Address, City, Country, StateCountry } from '../../../store/ducks/addresses/types';
import CustomSelect from '../../utils/CustomSelect';
import { SexList } from '../../utils/constants';
import ModalAddress from '../../address'
import CustomObjSelect from '../../utils/CustomObjSelect';
//Third party
import { Formik, Form, FormikProps, Field, FormikHelpers } from 'formik';
//Tranlation
import { useTranslation } from "react-i18next";
import "../../../services/i18n/i18n";
//Style
import '../../../styles/global.css';
import { useStyles } from '../../../styles/Styles';
import { Grid, TextField, Button, InputLabel, CardContent, Card, CardHeader, } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';
//Validation
import { validationAuthorSchema } from '../../utils/validationUtil';
import { formattedDate } from '../../utils/formatUtil';

interface StateProps {
  author?: Author,
  countriesList?: Country[],
  statesList?: StateCountry[],
  citiesList?: City[],
}

interface DispatchProps {
  updateRequest(author: Author): void,
  createRequest(author: Author): void,
  changeFlagEditing(): void,
  changeFlagDetail(): void,
  cleanAuthorEdit(): void,
  findByIdRequest(id: number): void,
  countryRequest(): void
  stateRequest(countryId: number): void
  cityRequest(countryId: number, stateId: number): void
}

type Props = StateProps & DispatchProps

const INITIAL_VALUES: Author = {
  id: 0,
  name: '',
  sex: '',
  email: '',
  birthdate: undefined,
  birthStateName: '',
  birthCity: undefined,
  birthCountry: undefined,
  address: undefined,
  description: ''
};

const EditAuthor: React.FC<Props> = (props) => {

  const classes = useStyles();
  const { t } = useTranslation();
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const { author, statesList, citiesList, countriesList, changeFlagEditing, cleanAuthorEdit, createRequest, updateRequest, cityRequest, stateRequest, countryRequest } = props;
  const [flagEditing, setFlagEditing] = useState(false);
  const [countrySelected, setCountrySelected] = useState<Country | null>(null);
  const [stateSelected, setStateSelected] = useState<StateCountry | null>(null);
  const [citySelected, setCitySelected] = useState<City | null>(null);
  const [subtitle, setSubtitle] = useState(t("titles.submit_author"));
  const [birthdate, setBirthdate] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (author) {
      setFlagEditing(true);
      setSubtitle(t("titles.edit_author"))
      if(author.birthdate){        
        setBirthdate(formattedDate(new Date(author.birthdate)))
      }
      if (author.birthCountry) {
        setCountrySelected(author.birthCountry);
        author.birthCountryName = author.birthCountry.name;
      }
      if (author.birthCity) {
        setCitySelected(author.birthCity)
        author.birthCityName = author.birthCity.name;

        if (author.birthCity.state) {
          setStateSelected(author.birthCity.state);
          author.birthStateName = author.birthCity.state.name;
        }
      }
      setInitialValues(author);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [author]);

  useEffect(() => {
    countryRequest();
    if (countrySelected) {
      stateRequest(countrySelected.id);
      if (stateSelected) {
        cityRequest(countrySelected.id, stateSelected.id)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countrySelected, stateSelected]);

  const handleSubmit = useMemo<(values: Author, actions: FormikHelpers<Author>) => void>(
    () => (values: Author, actions: FormikHelpers<Author>) => {
      actions.setSubmitting(false);
        
      if (countrySelected) {
        values.birthCountry = countrySelected;
      }
      if (citySelected) {
        values.birthCity = citySelected;
      }
      if (flagEditing) {
        updateRequest(values);
      } else {
        createRequest(values);
      }
    }, 
    [countrySelected, citySelected, flagEditing, createRequest, updateRequest]
  );

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
        validationSchema={validationAuthorSchema}
      >
        {(props: FormikProps<Author>) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            isSubmitting,
            isValid,
            setFieldValue
          } = props

          const handleAddress = (address: Address) => {
            values.address = address;
          }

          const getCountrySelected = (country: Country) => {
            setCountrySelected(country);
          }

          const getStateSelected = (state: StateCountry) => {
            setStateSelected(state);
          }

          const getCitySelected = (city: City) => {
            setCitySelected(city);
          }

          const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {            
            const {name, value} = e.target;
            let dateValue = new Date(value.replace(/-/g, '/')); 
            setBirthdate(formattedDate(dateValue));
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
                        helperText={t(errors.name as unknown as string)}
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
                        helperText={t(errors.email as unknown as string)}
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
                      />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.address")}</InputLabel>
                      <ModalAddress addressSrc={values.address} addressSetup={handleAddress} name={values.name} flagEditing={flagEditing} />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.birthdate")}</InputLabel>
                      <TextField
                        name="birthdate"
                        type="date"
                        value={birthdate || ""}
                        onChange={handleChangeDate}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                        helperText={t(errors.birthdate as unknown as string)}
                        error={
                          errors.birthdate && touched.birthdate
                            ? true
                            : false
                        }
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
                        isObject
                        isAddress
                      />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.birth_state")}</InputLabel>
                      <Field
                        className="form-select-field"
                        name="birthStateName"
                        options={statesList}
                        component={CustomObjSelect}
                        setValueSelected={getStateSelected}
                        placeholder={t("placeholder.select_state")}
                        disable={countrySelected == null}
                        isObject
                        isAddress
                      />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.birth_place")}</InputLabel>
                      <Field
                        className="form-select-field"
                        name="birthCityName"
                        options={citiesList}
                        component={CustomObjSelect}
                        setValueSelected={getCitySelected}
                        placeholder={t("placeholder.select_city")}
                        disable={countrySelected == null && stateSelected == null}
                        isObject
                        isAddress
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
                        helperText={t(errors.description as unknown as string)}
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

EditAuthor.displayName = 'EditAuthor';

const mapStateToProps = (state: ApplicationState) => ({
  author: state.authors.authorData,
  countriesList: state.addresses.countriesListData,
  statesList: state.addresses.statesListData,
  citiesList: state.addresses.citiesListData,
});
const actions = { ...authorsActions, ...addressesActions };
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditAuthor);

