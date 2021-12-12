import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../../../store';

import * as publishersActions from '../../../store/ducks/publishers/actions';
import { Publisher, PublisherRequestFilter as Filter } from '../../../store/ducks/publishers/types';

import { Formik, Form, FormikProps } from 'formik';
import { useTranslation } from "react-i18next";
import "../../../services/i18n/i18n";

import { useStyles } from '../../../styles/Styles';
import { Grid, TextField, Button, InputLabel, CardContent, Card, CardHeader, } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

interface StateProps {
  publishers?: Publisher[]  
}

interface DispatchProps {
  searchRequest(): void,  
  updateRequestFilter(requestFilter: Filter): void
  cleanRequestFilter(): void
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

const PublisherFilter: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();  
  const { searchRequest, updateRequestFilter, cleanRequestFilter } = props;

  function handleSubmit(values: Filter, actions: any) {
    console.log('Form submitted!');
    console.log(values);

    actions.setSubmitting(false);
    cleanRequestFilter();
    updateRequestFilter(values);
    searchRequest();
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
                  title={t("titles.search_publishers")}
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
                    <Grid className="form-grid" container lg={10} md={10} sm={10} xs={10}>                    
                      <Grid item lg={6} md={6} sm={6} xs={6}>
                        <InputLabel className="form-label" >{t("labels.start_date_create")}</InputLabel>
                        <TextField
                          name="startDate"
                          type="date"
                          value={values.startDate}
                          onChange={handleChange}
                          className={classes.textFieldDate}
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
                      <Grid item lg={6} md={6} sm={6} xs={6}>
                        <InputLabel className="form-label" >{t("labels.final_date")}</InputLabel>
                        <TextField
                          name="finalDate"
                          type="date"
                          value={values.finalDate}
                          onChange={handleChange}
                          className={classes.textFieldDate}
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

PublisherFilter.displayName = 'PublisherFilter';

const mapStateToProps = (state: ApplicationState) => ({
  
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(publishersActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PublisherFilter);