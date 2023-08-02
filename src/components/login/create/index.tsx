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
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
//Actions and store
import * as authenticationsActions from '../../../store/ducks/authentications/actions';
import * as usersActions from '../../../store/ducks/users/actions';
import { ApplicationState } from '../../../store';
//Types, constants and local components
import { Login, NewLogin } from '../../../store/ducks/authentications/types';
import { User } from '../../../store/ducks/users/types';
import { LOGIN_URL } from '../../../services/api/constants';
//Third party
import { Formik, Form, FormikProps } from 'formik';
//Translation
import { useTranslation } from "react-i18next";
import "../../../services/i18n/i18n";
//Style
import { Button, Grid, InputLabel, IconButton, TextField, Card, CardContent, CardActions, CardHeader } from '@mui/material';
import { useStyles } from '../../../styles/Styles';
import CloseIcon from '@mui/icons-material/Close'
import { AlertDialog } from '../../utils/AlertDialog';
//Validation
import { validationLoginSchema } from '../../utils/validationUtil';

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

const INITIAL_VALUES: NewLogin = {
  username: '',
  password: '',
  repeatPassword: '',
};

const LoginCreatePage: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { fromModalUser, createdSuccess, createRequest, submitToModalUser, handleClose, cleanUserEdit } = props;
  const [openPasswordAlert, setOpenPasswordAlert] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (!fromModalUser) {
      cleanUserEdit()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromModalUser]);

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

  function handleSubmit(values: NewLogin, actions: any) {
    if (values.password !== values.repeatPassword) {
      setOpenPasswordAlert(true);
      actions.setSubmitting(false);
      return
    }

    if (fromModalUser) {
      let newUser: Login = {
        username: values.username,
        password: values.password
      };
      submitToModalUser(newUser as Login)
    } else {
      let newUser: User = {
        username: values.username,
        password: values.password
      };
      createRequest(newUser as User)
    }

    actions.setSubmitting(false);
    setSubmitted(true);
  }

  return <>
    <Formik
      onSubmit={handleSubmit}
      initialValues={INITIAL_VALUES}
      className={classes.root}
      validationSchema={validationLoginSchema}
    >
      {(props: FormikProps<NewLogin>) => {
        const {
          handleChange,
          isSubmitting,
          isValid,
          errors,
          touched
        } = props
        return (
          <Card className={classes.root} >
            <Form>
              <CardHeader
                title={t("titles.create_login")}
                subheader={fromModalUser ?
                  (<>
                    <IconButton
                      aria-label={t("buttons.close")}
                      className={classes.closeModalButton}
                      onClick={handleModalClose}
                      size="large">
                      <CloseIcon />
                    </IconButton>
                  </>) :
                  <></>
                }
                style={{ textAlign: 'center' }}
              />
              <CardContent>
                <Grid container justifyContent="center" alignItems="center">
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
                      helperText={t(errors.username as unknown as string)}
                      error={
                        errors.username && touched.username
                          ? true
                          : false
                      }
                    />
                    <InputLabel className="form-label" >{t("labels.password")}</InputLabel>
                    <TextField
                      name="password"
                      type="password"
                      className={classes.textField}
                      InputProps={{
                        className: classes.input,
                      }}
                      variant="outlined"
                      onChange={handleChange}
                      helperText={t(errors.password as unknown as string)}
                      error={
                        errors.password && touched.password
                          ? true
                          : false
                      }
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
                      onChange={handleChange}
                      helperText={t(errors.repeatPassword as unknown as string)}
                      error={
                        errors.repeatPassword && touched.repeatPassword
                          ? true
                          : false
                      }
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item>
                    <Button
                      className={classes.resetButton}
                      type="reset"
                      color="secondary"
                      variant="outlined"
                    >
                      {t("buttons.clear")}
                    </Button>
                    <Button
                      className={classes.submitButton}
                      type="submit"
                      disabled={isSubmitting || !isValid}
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
        );
      }}
    </Formik>
    <AlertDialog
      title={t("messages.alert")}
      content={t("messages.passwords_match")}
      agreeBtnLabel={t("buttons.ok")}
      disagreeBtnLabel={t("buttons.cancel")}
      isOpen={openPasswordAlert}
      setAgreed={() => setOpenPasswordAlert(false)}
      handleClose={() => setOpenPasswordAlert(false)}
    />
  </>;
}

const mapStateToProps = (state: ApplicationState) => ({
  login: state.authentications.loginData,
  token: state.authentications.tokenData,
  createdSuccess: state.users.createdSuccess
});

const actions = { ...authenticationsActions, ...usersActions };
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginCreatePage);