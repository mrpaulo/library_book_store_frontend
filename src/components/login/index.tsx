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
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
//Actions and store
import * as authenticationsActions from '../../store/ducks/authentications/actions';
import { ApplicationState } from '../../store';
//Types, constants and local components
import { Login, Token } from '../../store/ducks/authentications/types';
import { CREATE_LOGIN_URL } from '../../services/api/constants';
//Third party
import { Formik, Form, FormikProps } from 'formik';
//Translation
import { useTranslation } from "react-i18next";
import "../../services/i18n/i18n";
//Style
import { useStyles } from '../../styles/Styles';
import { Button, Grid, InputLabel, TextField, Card, CardContent, CardActions, CardHeader } from '@material-ui/core';

interface StateProps {
  login?: Login,
  token?: Token,
  failure: boolean,
  path?: String
}

interface DispatchProps {
  loginRequest(login: Login): void,
  logoutRequest(): void,
}

type Props = StateProps & DispatchProps

const INITIAL_VALUES: Login = {
  username: '',
  password: ''
};

const LoginPage: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { token, failure, path, loginRequest, logoutRequest } = props;
  const [submitted, setSubmitted] = useState<boolean>(false);
  const history = useNavigate();

  useEffect(() => {
    if (token && submitted) {
      if (path) {        
        history(path as string);
      } else {
        window.location.href = "/";
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, submitted]);

  const handleLogout = () => {
    logoutRequest()
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {

  };

  function handleSubmit(values: Login, actions: any) {    
    loginRequest(values as Login)
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
        {(props: FormikProps<Login>) => {
          const {
            handleChange,
            isSubmitting,
          } = props
          return (
            <Card className={classes.root} >
              <Form>
                <CardHeader
                  title={t("titles.login")}
                  subheader=""
                  style={{ textAlign: 'center' }}
                />
                <CardContent>
                  <Grid container justify="center" alignItems="center">
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <InputLabel className="form-label" >{t("labels.user_name")}</InputLabel>
                      <TextField
                        error={failure}
                        name="username"
                        type="text"
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                        // helperText={state.helperText}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                      />
                      <InputLabel className="form-label" >{t("labels.password")}</InputLabel>
                      <TextField
                        error={failure}
                        name="password"
                        type="password"
                        className={classes.textField}
                        InputProps={{
                          className: classes.input,
                        }}
                        variant="outlined"
                        // helperText={state.helperText}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
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
                        onClick={handleLogout}
                        disabled={isSubmitting}
                        color="secondary"
                        variant="outlined"
                      >
                        {t("buttons.logout")}
                      </Button>
                      <Button
                        className={classes.submitButton}
                        type="submit"
                        disabled={isSubmitting}
                        color="primary"
                        variant="outlined"

                      >
                        {t("buttons.login")}
                      </Button>
                      <Grid container justify="flex-end" alignItems="flex-end" >
                        <a href={CREATE_LOGIN_URL}><h3>{t("links.sing_up")}</h3></a>
                      </Grid>
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
  failure: state.authentications.failure,
  path: state.authentications.path
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(authenticationsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);