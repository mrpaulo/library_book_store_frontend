/**
 * Copyright (C) 2022 paulo.rodrigues
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
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
//Actions and store
import * as authenticationsActions from '../../../store/ducks/authentications/actions';
import * as usersActions from '../../../store/ducks/users/actions';
import { ApplicationState } from '../../../store';
//Types, constants and local components
import { Login, UpdatePassword } from '../../../store/ducks/authentications/types';
import { User } from '../../../store/ducks/users/types';
import { LOGIN_URL } from '../../../services/api/constants';
//Third party
import { Formik, Form, FormikProps } from 'formik';
//Translation
import { useTranslation } from "react-i18next";
import "../../../services/i18n/i18n";
//Style
import { Button, Grid, InputLabel, IconButton, TextField, Card, CardContent, CardActions, CardHeader } from '@material-ui/core';
import { useStyles } from '../../../styles/Styles';
import CloseIcon from '@material-ui/icons/Close'

interface StateProps {  
  fromModalUser: boolean,
  createdSuccess: boolean
}

interface DispatchProps {
  createRequest(user: User): void,
  submitToModalUser(user: Login): void,
  handleClose(flag: boolean): void,
  cleanUserEdit(): void,
}

type Props = StateProps & DispatchProps

const INITIAL_VALUES: UpdatePassword = {
  username: '',
  currentPassword: '',
  newPassword: '',
  repeatPassword: '',
};

const UpdatePasswordPage: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { fromModalUser, createdSuccess, createRequest, submitToModalUser, handleClose, cleanUserEdit } = props;
  
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {    
    if (createdSuccess && submitted) {
      window.location.href = LOGIN_URL;
      setSubmitted(false)
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdSuccess, submitted]);

  const handleModalClose = () => {
    handleClose(true)
  };

  function handleSubmit(values: UpdatePassword, actions: any) {
    if (values.newPassword !== values.repeatPassword) {
      alert("Erro senhas dif");
      return
    }
    console.log('Form submitted!');
    console.log(values);    
    
      let newUser: Login = {
        username: values.username,
        password: values.newPassword
      };
      submitToModalUser(newUser as Login)
   
      createRequest(newUser as User)
    
    actions.setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={INITIAL_VALUES}
        className={classes.root}
      >
        {(props: FormikProps<UpdatePassword>) => {
          const {           
            handleChange,
            isSubmitting,
          } = props
          return (
            <Card className={classes.root} >
              <Form>
                <CardHeader
                  title={t("titles.update_password")}
                  subheader={fromModalUser ?
                    (<>
                      <IconButton
                        aria-label={t("buttons.close")}
                        className={classes.closeModalButton}
                        onClick={handleModalClose}>
                        <CloseIcon />
                      </IconButton>
                    </>) :
                    <></>
                  }
                  style={{ textAlign: 'center' }}
                />
                <CardContent>
                  <Grid container justify="center" alignItems="center">
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <InputLabel className="form-label" >{t("labels.user_name")}</InputLabel>
                      <TextField
                        name="username"
                        type="text"
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                        onChange={handleChange}
                        disabled
                      />
                      <InputLabel className="form-label" >{t("labels.current_password")}</InputLabel>
                      <TextField
                        name="currentPassword"
                        type="password"
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                        onChange={handleChange}
                      />
                      <InputLabel className="form-label" >{t("labels.new_password")}</InputLabel>
                      <TextField
                        name="newPassword"
                        type="password"
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                        onChange={handleChange}
                      />
                      <InputLabel className="form-label" >{t("labels.repeat_password")}</InputLabel>
                      <TextField
                        name="repeatPassword"
                        type="password"
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                        // helperText={state.helperText}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Grid item lg={6} md={6} sm={6} xs={6} style={{ paddingBottom: '80px' }}>
                    <Grid container justify="flex-end" alignItems="flex-end" >
                      <Button
                        className={classes.resetButton}
                        type="reset"
                        disabled={isSubmitting}
                        color="secondary"
                        variant="outlined"
                      >
                        {t("buttons.clear")}
                      </Button>
                      <Button
                        className={classes.submitButton}
                        type="submit"
                        disabled={isSubmitting}
                        color="primary"
                        variant="outlined"
                      >
                        {t("buttons.submit")}
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>
              </Form>
            </Card>
          )
        }}
      </Formik>
    </>
  );
}

const mapStateToProps = (state: ApplicationState) => ({
  login: state.authentications.loginData,
  token: state.authentications.tokenData,
  createdSuccess: state.users.createdSuccess
});

const actions = { ...authenticationsActions, ...usersActions };
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePasswordPage);