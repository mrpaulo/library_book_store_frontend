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
import * as publishersActions from '../../../store/ducks/publishers/actions';
import * as addressesActions from '../../../store/ducks/addresses/actions';
import { ApplicationState } from '../../../store';
//Types and local components
import { Publisher } from '../../../store/ducks/publishers/types';
import { Address, Country } from '../../../store/ducks/addresses/types';
import ModalAddress from '../../address'
//Third party
import { Formik, Form, FormikProps } from 'formik';

//Tranlation
import { useTranslation } from "react-i18next";
import "../../../services/i18n/i18n";
//Style
import '../../../styles/global.css';
import { useStyles } from '../../../styles/Styles';
import { Grid, TextField, Button, InputLabel, CardContent, Card, CardHeader } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';
//Validation
import { validationPublisherSchema } from '../../utils/validationUtil';
import { formattedDate, maskCNPJValue } from '../../utils/formatUtil';

interface StateProps {
  publisher?: Publisher,
  countriesList?: Country[],
}

interface DispatchProps {
  updateRequest(publisher: Publisher): void,
  createRequest(publisher: Publisher): void,
  changeFlagEditing(): void,
  changeFlagDetail(): void,
  cleanPublisherEdit(): void,
  findByIdRequest(id: number): void,
  countryRequest(): void
}

type Props = StateProps & DispatchProps

const INITIAL_VALUES: Publisher = {
  id: 0,
  name: '',
  cnpj: '',
  description: "",
  address: undefined,
  foundationDate: undefined
};

const EditPublisher: React.FC<Props> = (props) => {

  const classes = useStyles();
  const { t } = useTranslation();
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const { publisher, changeFlagEditing, cleanPublisherEdit, createRequest, updateRequest, countryRequest } = props;
  const [flagEditing, setFlagEditing] = useState(false);
  const [subtitle, setSubtitle] = useState(t("titles.submit_publisher"));
  const [foundationDate, setFoundationDate] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (publisher) {
      setInitialValues(publisher);
      setFlagEditing(true);
      setSubtitle(t("titles.edit_publisher"))
      if(publisher.foundationDate){        
        setFoundationDate(formattedDate(new Date(publisher.foundationDate)))
      }
      if(publisher.cnpj){
        publisher.cnpj = maskCNPJValue(publisher.cnpj as string);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publisher]);

  useEffect(() => {
    countryRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(values: Publisher, actions: any) {
    actions.setSubmitting(false);

    if (flagEditing) {
      updateRequest(values);
    } else {
      createRequest(values);
    }
  }

  function handleCancel() {
    changeFlagEditing();
    cleanPublisherEdit();
  }

  return (
    <div className="page-containner">
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationPublisherSchema}
      >
        {(props: FormikProps<Publisher>) => {
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

          const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {            
            const { name, value } = e.target;
            let dateValue = new Date(value.replace(/-/g, '/')); 
            setFoundationDate(formattedDate(dateValue));
            setFieldValue(name, value);
          };

          const handleChangeMask = (e: React.ChangeEvent<HTMLInputElement>) => {            
            const { name, value } = e.target;
            setFieldValue(name, maskCNPJValue(value));
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
                      <InputLabel className="form-label" >{t("labels.cnpj")}</InputLabel>
                      <TextField
                        name="cnpj"
                        type="text"
                        placeholder=""
                        value={values.cnpj || ""}
                        onChange={handleChangeMask}
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                        helperText={t(errors.cnpj as unknown as string)}
                        error={
                          errors.cnpj && touched.cnpj
                            ? true
                            : false
                        }
                      />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.address")}</InputLabel>
                      <ModalAddress addressSrc={values.address} addressSetup={handleAddress} name={values.name} />
                    </Grid>
                    <Grid className="form-grid" item lg={10} md={10} sm={10} xs={10}>
                      <InputLabel className="form-label" >{t("labels.create_date")}</InputLabel>
                      <TextField
                        name="foundationDate"
                        type="date"
                        value={foundationDate || ""}
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
//);

EditPublisher.displayName = 'EditPublisher';

const mapStateToProps = (state: ApplicationState) => ({
  publisher: state.publishers.publisherData,
  countriesList: state.addresses.countriesListData,
});
const actions = { ...publishersActions, ...addressesActions };
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditPublisher);

