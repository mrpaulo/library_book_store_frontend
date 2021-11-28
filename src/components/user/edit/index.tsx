import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../../../store';

import * as usersActions from '../../../store/ducks/users/actions';
import * as addressesActions from '../../../store/ducks/addresses/actions';
import { Role, User } from '../../../store/ducks/users/types';

import { Formik, Form, FormikProps, Field } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from "react-i18next";
import "../../../services/i18n/i18n";

import '../../../styles/global.css';
import { useStyles } from '../../../styles/Styles';
import { Grid, TextField, Button, InputLabel, CardContent, Card, CardHeader } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';
import ModalAddress from '../../address'
import { Address } from '../../../store/ducks/addresses/types';
import CustomObjSelect from '../../utils/CustomObjSelect';

interface StateProps {
  user?: User,
  rolesList?: Role[],
}

interface DispatchProps {
  updateRequest(user: User): void,
  createRequest(user: User): void,
  changeFlagEditing(): void,
  changeFlagDetail(): void,
  cleanUserEdit(): void,
  findByIdRequest(id: number): void,
  roleRequest(): void
}

type Props = StateProps & DispatchProps

const INITIAL_VALUES: User = {
  id: 0,
  name: '',
  username: '',
  cpf: '', 
  email: "",      
  address: undefined
};

const EditUser: React.FC<Props> = (props) => {

  const classes = useStyles();
  const { t } = useTranslation();
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const { user, rolesList, changeFlagEditing, cleanUserEdit, createRequest, updateRequest, roleRequest } = props;
  const [flagEditing, setFlagEditing] = useState(false);  
  const [roles, setRoles] = useState<Role[]>([]);
  const [subtitle, setSubtitle] = useState(t("titles.submit_user"));

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(100, t("errors.too_long")),      
    cpf: Yup.string()
      .max(100, t("errors.too_long")), 
    email:  Yup.string()
    .max(100, t("errors.too_long"))
  });

  useEffect(() => {
    console.log("User")
    console.log(user)
    if (user) {
      setInitialValues(user);
      setFlagEditing(true);
      setRoles(user.roles as Role[])
      setSubtitle(t("titles.edit_user"))
    }
  }, [user]);

  useEffect(() => {
    roleRequest()    
  }, []);

  function handleSubmit(values: User, actions: any) {
    actions.setSubmitting(false);
    
    if (flagEditing) {
      updateRequest(values);
    } else {
      createRequest(values);
    }
  }

  function handleCancel() {
    changeFlagEditing();
    cleanUserEdit();
  }

  return (
    <div className="page-containner">
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(props: FormikProps<User>) => {
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

          const getRolesSelected = (roles: Role[]) => {
            values.roles = roles;       
            setRoles(roles) ;
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
                      <InputLabel className="form-label" >{t("labels.role")}</InputLabel>
                      <Field
                        className="form-select-field"
                        name="roles"
                        options={rolesList}
                        value={roles}
                        component={CustomObjSelect}
                        setValueSelected={getRolesSelected}
                        placeholder={t("placeholder.select_role")}
                        isObject
                        isMulti
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
                        type="email"
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
                      <InputLabel className="form-label" >{t("labels.address")}</InputLabel>
                      <ModalAddress addressSrc={values.address} addressSetup={handleAddress} typeSrc='user' name={values.name} />
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

EditUser.displayName = 'EditUser';

const mapStateToProps = (state: ApplicationState) => ({
  user: state.users.userData,
  rolesList: state.users.rolesListData,
});
const actions = { ...usersActions, ...addressesActions };
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);

