import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../../../store';

import * as addressesActions from '../../../store/ducks/addresses/actions';
import { Address, City, Country, StateCountry } from '../../../store/ducks/addresses/types';
import CustomSelect from '../../utils/CustomSelect';


import { Formik, Form, FormikProps, Field } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from "react-i18next";
import "../../../services/i18n/i18n";

import '../../../styles/global.css';
import { useStyles } from '../../../styles/Styles';
import { Grid, TextField, Button, InputLabel, CardContent, Card, CardHeader, } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';
import { CustomEnum } from '../../utils/constants';
import CustomObjSelect from '../../utils/CustomObjSelect';

interface StateProps {
  address?: Address,
  addressSrc?: Address,
  countriesList?: Country[],
  statesList?: StateCountry[],
  citiesList?: City[],
  logradourosList?: CustomEnum[],

  name?: String
}

interface DispatchProps {  
  cleanAddressEdit(): void,  
  countryRequest(): void,
  stateRequest(countryId: number): void,
  cityRequest(countryId: number, stateId: number): void,
  logradouroRequest(): void
  closeModal(): void
  setAddress(address: Address): void
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
  referencialPoint: "",
  logradouro: undefined
};

const EditAddress: React.FC<Props> = (props) => {

  const classes = useStyles();
  const { t } = useTranslation();
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const { address, addressSrc, countriesList, statesList, citiesList, logradourosList, name, closeModal, setAddress, logradouroRequest, cityRequest, stateRequest, countryRequest, cleanAddressEdit } = props;  
  const [subtitle, setSubtitle] = useState(t("titles.submit_address") + " " + name);
  const [countrySelected, setCountrySelected] = useState<Country | null>(null);
  const [stateSelected, setStateSelected] = useState<StateCountry | null>(null);
  const [citySelected, setCitySelected] = useState<City | null>(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(100, t("errors.too_long"))
      .required(t("errors.name_required")),
    neighborhood: Yup.string()
      .max(100, t("errors.too_long")),
    number: Yup.string()
      .max(100, t("errors.too_long")),
    referencialPoint: Yup.string()
      .max(100, t("errors.too_long")),
    cep: Yup.string()
      .max(8, t("errors.too_long")),
  });

  useEffect(() => {
    console.log("Address")
    console.log(address)
    if (address) {
      setInitialValues(address);      
      setSubtitle(t("titles.edit_address"))
    }
  }, [address]);

  useEffect(() => {
    console.log("Address")
    console.log(addressSrc)
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
      console.log("addressSrc")
      console.log(addressSrc)
      setInitialValues(addressSrc);
    }
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
  }, [countrySelected, stateSelected]);



  function handleSubmit(values: Address, actions: any) {
    actions.setSubmitting(false);
    if (citySelected) {
      values.city = citySelected;
    }
    console.log("On submit values for address")
    console.log(values);
    setAddress(values as Address);
    closeModal();
    // if (flagEditing) {
    //   updateRequest(values);      
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
        validationSchema={validationSchema}
      >
        {(props: FormikProps<Address>) => {
          const {
            values,
            touched,
            errors,            
            handleChange,
            isSubmitting,
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
                        isMulti={false}
                      />
                    </Grid>
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
                      <InputLabel className="form-label" >{t("labels.number")}</InputLabel>
                      <TextField
                        name="number"
                        type="text"
                        placeholder=""
                        value={values.number}
                        onChange={handleChange}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                        helperText={errors.number}
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
                        value={values.cep}
                        onChange={handleChange}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                        helperText={errors.cep}
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
                        value={values.neighborhood}
                        onChange={handleChange}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                        helperText={errors.neighborhood}
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
                        name="referencialPoint"
                        type="text"
                        placeholder=""
                        value={values.referencialPoint}
                        onChange={handleChange}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                        helperText={errors.referencialPoint}
                        error={
                          errors.referencialPoint && touched.referencialPoint
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
                        onBlur={(e: any) => console.log("ooosososos" + e)}
                        component={CustomObjSelect}
                        setValueSelected={getCountrySelected}
                        placeholder={t("placeholder.select_country")}
                        isMulti={false}
                        isObject={true}
                        isAddress={true}
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
                        isMulti={false}
                        isObject={true}
                        isAddress={true}
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
                        isMulti={false}
                        isObject={true}
                        isAddress={true}
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

