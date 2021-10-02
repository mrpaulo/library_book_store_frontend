import React, { useReducer, useEffect, useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import * as authenticationsActions from '../../store/ducks/authentications/actions';
import { Formik, Form, FormikProps, Field } from 'formik';
import { useTranslation } from "react-i18next";
import "../../../services/i18n/i18n";

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
import SearchIcon from '@material-ui/icons/Search';

interface StateProps {
  login?: Login,
  token?: Token,
  failure: boolean  
}

interface DispatchProps {    
  loginRequest(login: Login): void,
  logoutRequest(login: Login): void,
}

type Props = StateProps & DispatchProps

const INITIAL_VALUES: Login = {
   userName: '',
  password: ''  
};

const LoginPage: React.FC<Props> = (props)=> {
  const classes = useStyles();
  const { t } = useTranslation();  
  const { login, token, failure, loginRequest, logoutRequest } = props;
  const [disableLoginBtn, setDisableLoginBtn] = useState<boolean>(false);
  

  useEffect(() => {
    if (login && login.userName.trim() && login.password.trim()) {
    setDisableLoginBtn(false)
    } else {
      setDisableLoginBtn(true)
    }
  }, [login]);

  const handleLogin = () => {
   loginRequest(login as Login)
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      disableLoginBtn || handleLogin();
    }
  };

  function handleSubmit(values: Login, actions: any) {
    console.log('Form submitted!');
    console.log(values);
    loginRequest(login as Login)
    actions.setSubmitting(false);
   
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
            <Card className={classes.root}>
              <Form>
                <CardHeader
                  title={t("titles.search_publishers")}
                  subheader=""
                />
        <CardContent>
          <div>
            <TextField
              error={failure}
              fullWidth
              id="username"
              type="email"
              label="Username"
              placeholder="Username"
              margin="normal"
              // helperText={state.helperText}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              error={failure}
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              // helperText={state.helperText}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </CardContent>
        <CardActions>
        <Button
            className={classes.submitButton}
            type="submit"
            disabled={isSubmitting}
            color="primary"
            variant="outlined"
            startIcon={<SearchIcon />}
          >
            {t("buttons.search")}
          </Button>
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

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(authenticationsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);