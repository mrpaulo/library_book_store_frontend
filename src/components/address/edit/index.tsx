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
import * as addressesActions from '../../../store/ducks/addresses/actions';
import { ApplicationState } from '../../../store';
//Types and local components
import { Address, City, Country, StateCountry } from '../../../store/ducks/addresses/types';
import CustomSelect from '../../utils/CustomSelect';
import { CustomEnum } from '../../utils/constants';
import CustomObjSelect from '../../utils/CustomObjSelect';
//Third party
import { Formik, Form, FormikProps, Field } from 'formik';
//Translation
import { useTranslation } from "react-i18next";
import "../../../services/i18n/i18n";
//Style
import '../../../styles/global.css';
import { useStyles } from '../../../styles/Styles';
import { Grid, TextField, Button, InputLabel, CardContent, Card, CardHeader, } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';
//Validation
import { validationAddressSchema } from '../../utils/validationUtil';

interface StateProps {
  address?: Address,
  addressSrc?: Address,
  countriesList?: Country[],
  statesList?: StateCountry[],
  citiesList?: City[],
  logradourosList?: CustomEnum[],
  name?: String,
  flagEditing?: Boolean
}

interface DispatchProps {  
  cleanAddressEdit(): void 
  countryRequest(): void
  stateRequest(countryId: number): void
  cityRequest(countryId: number, stateId: number): void
  logradouroRequest(): void
  closeModal(): void
  setAddress(address: Address): void
  updateAddressRequest(address: Address): void
}

type Props = StateProps & DispatchProps

const INITIAL_VALUES: Address = {
  id: 0,
  name: '',
  number: '',
  cep: '',
  neighborhood: '',
  city: undefined,
  zipCode: "",
  coordination: "",
  referentialPoint: "",
  logradouro: undefined
};

const EditAddress: React.FC<Props> = (props) => {

  const classes = useStyles();
  const { t } = useTranslation();
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const { address, addressSrc, countriesList, statesList, citiesList, logradourosList, name, flagEditing, closeModal, setAddress, logradouroRequest, cityRequest, stateRequest, countryRequest, cleanAddressEdit, updateAddressRequest } = props;  
  const [subtitle, setSubtitle] = useState(t("titles.submit_address") + " " + name);
  const [countrySelected, setCountrySelected] = useState<Country | null>(null);
  const [stateSelected, setStateSelected] = useState<StateCountry | null>(null);
  const [citySelected, setCitySelected] = useState<City | null>(null);

  useEffect(() => {    
    if (address) {
      setInitialValues(address);      
      setSubtitle(t("titles.edit_address"))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {    
    if (addressSrc) {
      if (addressSrc.city) {        
        if (addressSrc.city.state) {
          setStateSelected(addressSrc.city.state);
          addressSrc.stateName = addressSrc.city.state.name;
          if(addressSrc.city.state.country){
            setCountrySelected(addressSrc.city.state.country);
            addressSrc.countryName = addressSrc.city.state.country.name;
          }
          addressSrc.cityName = addressSrc.city.name;
        }
      }      
      setInitialValues(addressSrc);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressSrc]);

  useEffect(() => {
    logradouroRequest();
    countryRequest();
    if (countrySelected) {
      stateRequest(countrySelected.id);
      if (stateSelected) {
        cityRequest(countrySelected.id, stateSelected.id)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countrySelected, stateSelected]);



  function handleSubmit(values: Address, actions: any) {
    actions.setSubmitting(false);
    if (citySelected) {
      values.city = citySelected;
    }    
    setAddress(values as Address);
    
    if (flagEditing) {
      updateAddressRequest(values);      
    }
    closeModal();
    // if (flagEditing) {
    //   updateAddressRequest(values);      
    // } else {
    //   createRequest(values);      
    // }
  }

  function handleCancel() {
    cleanAddressEdit();
    closeModal();
  }

  return (
    <div className="page-containner">
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationAddressSchema}
      >
        {(props: FormikProps<Address>) => {
          const {
            values,
            touched,
            errors,            
            handleChange,
            isSubmitting,
            isValid
          } = props

          const getCountrySelected = (country: Country) => {
            setCountrySelected(country);
          }

          const getStateSelected = (state: StateCountry) => {
            setStateSelected(state);
          }

          const getCitySelected = (city: City) => {
            setCitySelected(city);
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
                      <InputLabel className="form-label" >{t("labels.logradouro")}</InputLabel>
                      <Field
                        className="form-select-field"
                        name="logradouro"
                        options={logradourosList}
                        component={CustomSelect}
                        placeholder={t("placeholder.select_logradouro")}
                      />
                    </Grid>
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
                      <InputLabel className="form-label" >{t("labels.number")}</InputLabel>
                      <TextField
                        name="number"
                        type="text"
                        placeholder=""
                        value={values.number || ""}
                        onChange={handleChange}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                        helperText={t(errors.number as unknown as string)}
                        error={
                          errors.number && touched.number
                            ? true
                            : false
                        }
                      />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.cep")}</InputLabel>
                      <TextField
                        name="cep"
                        type="text"
                        placeholder=""
                        value={values.cep || ""}
                        onChange={handleChange}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                        helperText={t(errors.cep as unknown as string)}
                        error={
                          errors.cep && touched.cep
                            ? true
                            : false
                        }
                      />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.neighborhood")}</InputLabel>
                      <TextField
                        name="neighborhood"
                        type="text"
                        placeholder=""
                        value={values.neighborhood || ""}
                        onChange={handleChange}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                        helperText={t(errors.neighborhood as unknown as string)}
                        error={
                          errors.neighborhood && touched.neighborhood
                            ? true
                            : false
                        }
                      />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.referencial_point")}</InputLabel>
                      <TextField
                        name="referentialPoint"
                        type="text"
                        placeholder=""
                        value={values.referentialPoint || ""}
                        onChange={handleChange}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                        helperText={t(errors.referentialPoint as unknown as string)}
                        error={
                          errors.referentialPoint && touched.referentialPoint
                            ? true
                            : false
                        }
                      />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.country")}</InputLabel>
                      <Field
                        className="form-select-field"
                        name="countryName"
                        options={countriesList}
                        component={CustomObjSelect}
                        setValueSelected={getCountrySelected}
                        placeholder={t("placeholder.select_country")}
                        isObject
                        isAddress
                      />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.state")}</InputLabel>
                      <Field
                        className="form-select-field"
                        name="stateName"
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
                      <InputLabel className="form-label" >{t("labels.city")}</InputLabel>
                      <Field
                        className="form-select-field"
                        name="cityName"
                        options={citiesList}
                        component={CustomObjSelect}
                        setValueSelected={getCitySelected}
                        placeholder={t("placeholder.select_city")}
                        disable={countrySelected == null && stateSelected == null}
                        isObject
                        isAddress
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
//);

EditAddress.displayName = 'EditAddress';

const mapStateToProps = (state: ApplicationState) => ({
  address: state.addresses.addressData,
  countriesList: state.addresses.countriesListData,
  statesList: state.addresses.statesListData,
  citiesList: state.addresses.citiesListData,
  logradourosList: state.addresses.logradourosListData
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(addressesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditAddress);

