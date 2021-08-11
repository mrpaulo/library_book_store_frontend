import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../../../store';

import * as companiesActions from '../../../store/ducks/companies/actions';
import { Company, CompanyFilter as Filter } from '../../../store/ducks/companies/types';
import CustomSelect from '../../utils/CustomSelect';
import { SexList } from '../../utils/constants';

import { Formik, Form, FormikProps, Field } from 'formik';
import { useTranslation } from "react-i18next";
import "../../../services/i18n/i18n";

import { useStyles } from '../../../styles/Styles';
import { Grid, TextField, Button, InputLabel, CardContent, Card, CardHeader, } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

interface StateProps {
  companies?: Company[]  
}

interface DispatchProps {
  searchRequest(filter: Filter): void,  
}

type Props = StateProps & DispatchProps

const INITIAL_VALUES: Filter = {
  rowsPerPage: 10,
  currentPage: 1,
  name: '',
  cnpj: '',  
  startDate: undefined,
  finalDate: undefined
};

const CompanyFilter: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();  
  const { searchRequest } = props;

  // useEffect(() => {
  //   bookSubjectRequest();
  // }, []);

  function handleSubmit(values: Filter, actions: any) {
    console.log('Form submitted!');
    console.log(values);

    actions.setSubmitting(false);
    searchRequest(values);
  }
  function handleClear() {
    console.log('clear button');
  }
  
  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={INITIAL_VALUES}
        className={classes.root}
      >
        {(props: FormikProps<Filter>) => {
          const {
            values,            
            handleChange,
            isSubmitting,
          } = props
          return (
            <Card className={classes.root}>
              <Form>
                <CardHeader
                  title={t("titles.search_companies")}
                  subheader=""
                />
                <CardContent>
                  <Grid container justify="space-around" direction="row">
                    <Grid item lg={10} md={10} sm={10} xs={10}>
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
                      />
                    </Grid>
                    <Grid item lg={10} md={10} sm={10} xs={10}>
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
                      />
                    </Grid>                            
                  </Grid>
                </CardContent>
                <Grid item lg={10} md={10} sm={10} xs={10} style={{ paddingBottom: '80px' }}>
                  <Grid container justify="flex-end" alignItems="flex-end" >
                    <Button
                      className={classes.resetButton}
                      type="reset"
                      onClick={handleClear}
                      disabled={isSubmitting}
                      color="secondary"
                      variant="outlined"
                      startIcon={<ClearIcon />}
                    >
                      {t("buttons.clear")}
                    </Button>
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
                  </Grid>
                </Grid>
              </Form>
            </Card>
          )
        }}
      </Formik>
    </>

  );
}

CompanyFilter.displayName = 'CompanyFilter';

const mapStateToProps = (state: ApplicationState) => ({
  
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(companiesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CompanyFilter);