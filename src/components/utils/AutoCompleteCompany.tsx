import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { ApplicationState } from '../../store';
import * as companiesActions from '../../store/ducks/companies/actions';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

import { CompanyDTO } from '../../store/ducks/companies/types';
import { CircularProgress } from '@material-ui/core';
import '../../styles/global.css';

interface StateProps {
  companies?: CompanyDTO[]

}

interface DispatchProps {
  findByNameRequest(name: string): void
  publisherSelected(company: CompanyDTO): void
}

type Props = StateProps & DispatchProps

const autocompleteService = { current: null };

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

const AutoCompleteCompany: React.FC<Props> = (props) => {

  const classes = useStyles();
  const { companies, findByNameRequest, publisherSelected } = props;
  const [value, setValue] = useState<CompanyDTO | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<CompanyDTO[]>([]);
  const loaded = useRef(false);
  const [open, setOpen] = useState(false);
  const loading = open && options && options.length === 0;


  useEffect(() => {
    let active = true;
    console.log("inputValue")
    console.log(inputValue)
    if (!loading) {
      return undefined;
    }
    if (inputValue && inputValue.length > 2 && active) {
      findByNameRequest(inputValue);
    }

    if (active) {
      setOptions(companies as CompanyDTO[]);
    }

    return () => {
      active = false;
    };
  }, [loading, inputValue]);

  useEffect(() => {
    console.log("value")
    console.log(value)
    publisherSelected(value as CompanyDTO);
  }, [value]);

  return (
    <Autocomplete
      id="auto-complete-company"
      className={"form-select-field"}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionLabel={(option) => (option.name)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event: any, newValue: CompanyDTO | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

AutoCompleteCompany.displayName = 'AutoCompleteCompany';

const mapStateToProps = (state: ApplicationState) => ({
  companies: state.companies.companiesAutoComplete
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(companiesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AutoCompleteCompany);