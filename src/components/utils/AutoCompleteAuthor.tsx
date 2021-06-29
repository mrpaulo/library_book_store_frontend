import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { ApplicationState } from '../../store';
import * as peopleActions from '../../store/ducks/people/actions';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

import { PersonDTO } from '../../store/ducks/people/types';
import { CircularProgress } from '@material-ui/core';
import '../../styles/global.css';

interface StateProps {
  people?: PersonDTO[]
  valueSelected: PersonDTO[]
}

interface DispatchProps {
  findByNameRequest(name: string): void
  authorsSelected(people: PersonDTO[]): void
}

type Props = StateProps & DispatchProps

const AutoCompletePerson: React.FC<Props> = (props) => {

  const { people, valueSelected, findByNameRequest, authorsSelected } = props;
  const [value, setValue] = useState<PersonDTO[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<PersonDTO[]>([]);
  const [open, setOpen] = useState(false);
  const loading = open && options && options.length === 0;

  useEffect(() => {
    setValue(valueSelected);
  }, [valueSelected])

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
      setOptions(people as PersonDTO[]);
    }

    return () => {
      active = false;
    };
  }, [loading, inputValue]);

  // useEffect(() => {
  //   console.log("value")
  //   console.log(value)
  //   authorsSelected(value);
  // }, [value]);

  return (
    <Autocomplete
      multiple
      limitTags={2}
      id="auto-complete-person"
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
      onChange={(event: any, newValue: PersonDTO[]) => {
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
        />
      )}
    />
  );
}

AutoCompletePerson.displayName = 'AutoCompletePerson';

const mapStateToProps = (state: ApplicationState) => ({
  people: state.people.peopleAutoComplete
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(peopleActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AutoCompletePerson);