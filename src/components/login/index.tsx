import React, { useEffect, useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { useHistory } from "react-router-dom";
import * as authenticationsActions from '../../store/ducks/authentications/actions';
import { Formik, Form, FormikProps } from 'formik';
import { useTranslation } from "react-i18next";
import "../../services/i18n/i18n";

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { Login, Token } from '../../store/ducks/authentications/types';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { useStyles } from '../../styles/Styles';

import { Grid, InputLabel } from '@material-ui/core';
import { CREATE_LOGIN_URL } from '../../services/api/constants';

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
  const { login, token, failure, path, loginRequest, logoutRequest } = props;
  const [disableLoginBtn, setDisableLoginBtn] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    if (login && login.username.trim() && login.password.trim()) {
      setDisableLoginBtn(false)
    } else {
      setDisableLoginBtn(true)
    }
  }, [login]);

  useEffect(() => {
    console.log("token")
    console.log(token)
    console.log("submitted")
    console.log(submitted)
    if (token && submitted) {
      console.log("Path no login")
      console.log(path)
      if (path) {        
        history.push(path as string);
      } else {
        window.location.href = "/";
      }
    }
  }, [token, submitted]);

  const handleLogout = () => {
    logoutRequest()
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {

  };

  function handleSubmit(values: Login, actions: any) {
    console.log('Form submitted!');
    console.log(values);
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
            values,
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