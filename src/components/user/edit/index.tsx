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
import { ApplicationState } from '../../../store';
import * as usersActions from '../../../store/ducks/users/actions';
import * as addressesActions from '../../../store/ducks/addresses/actions';
//Types and local components
import { Role, User } from '../../../store/ducks/users/types';
import ModalAddress from '../../address'
import ModalUser from '../modal'
import { Address } from '../../../store/ducks/addresses/types';
import CustomObjSelect from '../../utils/CustomObjSelect';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Login } from '../../../store/ducks/authentications/types';
import CustomSelect from '../../utils/CustomSelect';
import { SexList } from '../../utils/constants';
//Third party
import { Formik, Form, FormikProps, Field } from 'formik';
import * as Yup from 'yup';
//Translation
import { useTranslation } from "react-i18next";
import "../../../services/i18n/i18n";
//Style
import '../../../styles/global.css';
import { useStyles } from '../../../styles/Styles';
import { Grid, TextField, Button, InputLabel, CardContent, Card, CardHeader } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';


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
  sex: '',
  cpf: '',
  email: "",
  roles: []
};

const EditUser: React.FC<Props> = (props) => {

  const classes = useStyles();
  const { t } = useTranslation();
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const { user, rolesList, changeFlagEditing, cleanUserEdit, createRequest, updateRequest, roleRequest } = props;
  const [flagEditing, setFlagEditing] = useState(false);
  const [openModalUser, setOpenModalUser] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [subtitle, setSubtitle] = useState(t("titles.submit_user"));

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(100, t("errors.too_long")),
    cpf: Yup.string()
      .max(100, t("errors.too_long")),
    email: Yup.string()
      .max(100, t("errors.too_long"))
  });

  useEffect(() => {
    if (user) {
      setInitialValues(user);
      setFlagEditing(true);
      setRoles(user.roles as Role[])
      setSubtitle(t("titles.edit_user"))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    roleRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  function handleAddUser() {
    setOpenModalUser(true);
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

          const handleUserPassword = (login: Login) => {
            values.username = login.username;
            values.password = login.password;
          }

          const getRolesSelected = (selectedRoles: Role[]) => {
            if (values.roles && values.roles.length > 0) {
              values.roles.push(selectedRoles[0])
            } else {
              values.roles = selectedRoles;
            }
            setRoles(values.roles);
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
                        isAddress
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
                        value={values.cpf || ""}
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
                        InputProps={{
                          className: classes.input,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                      />
                    </Grid>
                    <ModalUser openModal={openModalUser} userSetup={handleUserPassword} handleCloseModal={setOpenModalUser} />
                  </Grid>
                </CardContent>
                <Grid item lg={10} md={10} sm={10} xs={10}>
                  <Grid container justify="center" alignItems="center" >
                    <Button
                      className={classes.resetButton}                      
                      onClick={handleAddUser}
                      disabled={isSubmitting}
                      color="primary"
                      variant="outlined"
                      startIcon={<PersonAddIcon />}
                    >
                      {t("buttons.add_login")}
                    </Button>
                  </Grid>
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

