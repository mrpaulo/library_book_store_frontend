/**
 * Copyright (C) 2021 paulo.rodrigues
 * Profile: <https://github.com/mrpaulo>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

//React
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
//Actions and store
import { ApplicationState } from '../../store';
import * as publishersActions from '../../store/ducks/publishers/actions';
//Types and local components
import { PublisherDTO } from '../../store/ducks/publishers/types';
//Style
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
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
    if (inputValue && inputValue.length > 1 && active) {
      findByNameRequest(inputValue);
    }

    if (active) {
      setOptions(publishers as PublisherDTO[]);
    }

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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