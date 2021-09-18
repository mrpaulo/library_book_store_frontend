import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../../../store';

import * as authorsActions from '../../../store/ducks/authors/actions';
import { Author, AuthorRequestFilter as Filter } from '../../../store/ducks/authors/types';
import CustomSelect from '../../utils/CustomSelect';
import { SexList } from '../../utils/constants';

import { Formik, Form, FormikProps, Field } from 'formik';
import { useTranslation } from "react-i18next";
import "../../../services/i18n/i18n";

import { useStyles } from '../../../styles/Styles';
import { Grid, TextField, Button, InputLabel, CardContent, Card, CardHeader, } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import { selectors } from '../../../store/ducks/authors';

interface StateProps {
  authors?: Author[]
}

interface DispatchProps {
  searchRequest(): void,
  updateRequestFilter(requestFilter: Filter): void,
  cleanRequestFilter(): void
}

type Props = StateProps & DispatchProps

const INITIAL_VALUES: Filter = {
  rowsPerPage: 10,
  currentPage: 1,
  name: '',
  sex: '',
  startDate: undefined,
  finalDate: undefined
};

const AuthorFilter: React.FC<Props> = (props) => {
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
    cleanRequestFilter();
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
                  title={t("titles.search_authors")}
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
                      <InputLabel className="form-label" >{t("labels.sex")}</InputLabel>
                      <Field
                        className="form-select-field"
                        name="format"
                        options={SexList}
                        component={CustomSelect}
                        placeholder={t("placeholder.select_sex")}
                        isMulti={false}
                      />
                    </Grid>                    
                    <Grid className="form-grid" container lg={10} md={10} sm={10} xs={10}>                    
                      <Grid item lg={6} md={6} sm={6} xs={6}>
                        <InputLabel className="form-label" >{t("labels.start_date_birth")}</InputLabel>
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

AuthorFilter.displayName = 'AuthorFilter';

const mapStateToProps = (state: ApplicationState) => ({

});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(authorsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuthorFilter);