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
  valueSelected?: CompanyDTO,
  helperText?: String,
  error?: boolean
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
  const { companies, valueSelected, helperText, error, findByNameRequest, publisherSelected } = props;
  const [value, setValue] = useState<CompanyDTO | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<CompanyDTO[]>([]);
  const loaded = useRef(false);
  const [open, setOpen] = useState(false);
  const loading = open && options && options.length === 0;

useEffect(() => {
  setValue(valueSelected as CompanyDTO);
}, [valueSelected])

  useEffect(() => {
    let active = true;    
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
        publisherSelected(newValue as CompanyDTO);
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
          helperText={helperText}
          error={error}
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