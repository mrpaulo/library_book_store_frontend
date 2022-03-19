import React, { useEffect, useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';

import * as authenticationsActions from '../../../store/ducks/authentications/actions';
import * as usersActions from '../../../store/ducks/users/actions';
import { Formik, Form, FormikProps } from 'formik';
import { useTranslation } from "react-i18next";
import "../../../services/i18n/i18n";

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { Login, NewLogin, Token } from '../../../store/ducks/authentications/types';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import { useStyles } from '../../../styles/Styles';

import { Grid, IconButton, InputLabel } from '@material-ui/core';
import { User } from '../../../store/ducks/users/types';
import CloseIcon from '@material-ui/icons/Close'

interface StateProps {
  login?: Login,
  token?: Token,
  failure: boolean,
  fromModalUser: boolean
}

interface DispatchProps {
  createRequest(user: User): void,
  submitToModalUser(user: Login): void,
  handleClose(flag: boolean): void
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
  const { login, token, failure, fromModalUser, createRequest, submitToModalUser, handleClose } = props;
  const [disableLoginBtn, setDisableLoginBtn] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);


  useEffect(() => {
    if (login && login.username.trim() && login.password.trim()) {
      setDisableLoginBtn(false)
    } else {
      setDisableLoginBtn(true)
    }
  }, [login]);

  // useEffect(() => {
  //   console.log("token")
  //   console.log(token)
  //   console.log("submitted")
  //   console.log(submitted)
  //   if (token && submitted) {
  //     window.location.href = "/";
  //   } 
  // }, [token, submitted]);

  const handleKeyPress = (event: React.KeyboardEvent) => {

  };
  const handleModalClose = () => {
    handleClose(true)
  };

  function handleSubmit(values: NewLogin, actions: any) {
    if (values.password != values.repeatPassword) {
      alert("Erro senhas dif");
      return
    }
    console.log('Form submitted!');
    console.log(values);
    debugger
    if (fromModalUser) {
      let newUser: Login = {
        username: values.username,
        password: values.password
      };
      submitToModalUser(newUser as Login)
    } else {
      let newUser: User = {
        username: values.username,
        email: values.password
      };
      createRequest(newUser as User)
    }

    actions.setSubmitting(false);
    //setSubmitted(true);
  }

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={INITIAL_VALUES}
        className={classes.root}
      >
        {(props: FormikProps<NewLogin>) => {
          const {
            values,
            handleChange,
            isSubmitting,
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
                      <InputLabel className="form-label" >{t("labels.repeat_password")}</InputLabel>
                      <TextField
                        error={failure}
                        name="repeatPassword"
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
  failure: state.authentications.failure
});

const actions = { ...authenticationsActions, ...usersActions };
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginCreatePage);