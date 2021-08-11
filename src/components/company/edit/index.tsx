import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../../../store';

import * as companiesActions from '../../../store/ducks/companies/actions';
import * as addressesActions from '../../../store/ducks/addresses/actions';
import { Company } from '../../../store/ducks/companies/types';
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
import ModalAddress from '../../address'
import { Address, Country } from '../../../store/ducks/addresses/types';
import CustomObjSelect from '../../utils/CustomObjSelect';

interface StateProps {
  company?: Company,
  countriesList?: Country[],
}

interface DispatchProps {
  updateRequest(company: Company): void,
  createRequest(company: Company): void,
  changeFlagEditing(): void,
  changeFlagDetail(): void,
  cleanCompanyEdit(): void,
  findByIdRequest(id: number): void,
  countryRequest(): void
}

type Props = StateProps & DispatchProps

const INITIAL_VALUES: Company = {
  id: 0,
  name: '',
  cnpj: '', 
  description: "",      
  address: undefined
};

const EditCompany: React.FC<Props> = (props) => {

  const classes = useStyles();
  const { t } = useTranslation();
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const { company, countriesList, changeFlagEditing, cleanCompanyEdit, createRequest, updateRequest, countryRequest } = props;
  const [flagEditing, setFlagEditing] = useState(false);
  const [countrySelected, setCountrySelected] = useState<Country | null>(null);
  const [subtitle, setSubtitle] = useState(t("titles.submit_company"));

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(100, t("errors.too_long"))
      .required(t("errors.name_required")),
    cnpj: Yup.string()
      .max(100, t("errors.too_long"))
      .required(t("errors.cnpj_required")),
    description:  Yup.string()
    .max(100, t("errors.too_long"))
  });

  useEffect(() => {
    console.log("Company")
    console.log(company)
    if (company) {
      setInitialValues(company);
      setFlagEditing(true);
      setSubtitle(t("titles.edit_company"))
    }
  }, [company]);

  useEffect(() => {
    countryRequest()
  }, []);

  function handleSubmit(values: Company, actions: any) {
    actions.setSubmitting(false);
    
    if (flagEditing) {
      updateRequest(values);
    } else {
      createRequest(values);
    }
  }

  function handleCancel() {
    changeFlagEditing();
    cleanCompanyEdit();
  }

  return (
    <div className="page-containner">
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(props: FormikProps<Company>) => {
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
                      <InputLabel className="form-label" >{t("labels.cnpj")}</InputLabel>
                      <TextField
                        name="cnpj"
                        type="text"
                        placeholder=""
                        value={values.cnpj}
                        onChange={handleChange}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                        helperText={errors.cnpj}
                        error={
                          errors.cnpj && touched.cnpj
                            ? true
                            : false
                        }
                      />
                    </Grid>
                   

                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.address")}</InputLabel>
                      <ModalAddress addressSrc={values.address} addressSetup={handleAddress} typeSrc='company' name={values.name} />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.create_date")}</InputLabel>
                      <TextField
                        name="createDate"
                        type="date"
                        value={values.createDate}
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
                      <InputLabel className="form-label" >{t("labels.description")}</InputLabel>
                      <TextField
                        name="description"
                        type="text"
                        placeholder=""
                        value={values.description}
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

EditCompany.displayName = 'EditCompany';

const mapStateToProps = (state: ApplicationState) => ({
  company: state.companies.companyData,
  countriesList: state.addresses.countriesListData,
});
const actions = { ...companiesActions, ...addressesActions };
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditCompany);

