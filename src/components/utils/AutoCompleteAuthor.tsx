import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { ApplicationState } from '../../store';
import * as authorsActions from '../../store/ducks/authors/actions';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { AuthorDTO } from '../../store/ducks/authors/types';
import { CircularProgress } from '@material-ui/core';
import '../../styles/global.css';

interface StateProps {
  authors?: AuthorDTO[]
  valueSelected: AuthorDTO[],
  helperText?: String,
  error?: boolean
}

interface DispatchProps {
  findByNameRequest(name: string): void
  authorsSelected(authors: AuthorDTO[]): void
}

type Props = StateProps & DispatchProps

const AutoCompleteAuthor: React.FC<Props> = (props) => {

  const { authors, valueSelected, helperText, error, findByNameRequest, authorsSelected } = props;
  const [value, setValue] = useState<AuthorDTO[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<AuthorDTO[]>([]);
  const [open, setOpen] = useState(false);
  const loading = open && options && options.length === 0;

  useEffect(() => {
    setValue(valueSelected);
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
      setOptions(authors as AuthorDTO[]);
    }

    return () => {
      active = false;
    };
  }, [loading, inputValue]);

  return (
    <Autocomplete
      multiple
      limitTags={2}
      id="auto-complete-author"
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
      onChange={(event: any, newValue: AuthorDTO[]) => {
        setOptions(options);
        setValue(newValue);
        authorsSelected(newValue)
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

AutoCompleteAuthor.displayName = 'AutoCompleteAuthor';

const mapStateToProps = (state: ApplicationState) => ({
  authors: state.authors.authorsAutoComplete
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(authorsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AutoCompleteAuthor);