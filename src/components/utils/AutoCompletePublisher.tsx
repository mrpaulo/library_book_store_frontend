import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { ApplicationState } from '../../store';
import * as publishersActions from '../../store/ducks/publishers/actions';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { PublisherDTO } from '../../store/ducks/publishers/types';
import { CircularProgress } from '@material-ui/core';
import '../../styles/global.css';

interface StateProps {
  publishers?: PublisherDTO[]
  valueSelected?: PublisherDTO,
  helperText?: String,
  error?: boolean
}

interface DispatchProps {
  findByNameRequest(name: string): void
  publisherSelected(publisher: PublisherDTO): void
}

type Props = StateProps & DispatchProps

const AutoCompletePublisher: React.FC<Props> = (props) => {
  
  const { publishers, valueSelected, helperText, error, findByNameRequest, publisherSelected } = props;
  const [value, setValue] = useState<PublisherDTO | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<PublisherDTO[]>([]);  
  const [open, setOpen] = useState(false);
  const loading = open && options && options.length === 0;

useEffect(() => {
  setValue(valueSelected as PublisherDTO);
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
      setOptions(publishers as PublisherDTO[]);
    }

    return () => {
      active = false;
    };
  }, [loading, inputValue]);

  return (
    <Autocomplete
      id="auto-complete-publisher"
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
      onChange={(event: any, newValue: PublisherDTO | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        publisherSelected(newValue as PublisherDTO);
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

AutoCompletePublisher.displayName = 'AutoCompletePublisher';

const mapStateToProps = (state: ApplicationState) => ({
  publishers: state.publishers.publishersAutoComplete
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(publishersActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AutoCompletePublisher);