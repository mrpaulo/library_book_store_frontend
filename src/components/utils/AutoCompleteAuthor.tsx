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
import React, { useEffect, useState, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
//Actions and store
import * as authorsActions from '../../store/ducks/authors/actions';
import { ApplicationState } from '../../store';
//Types and local components
import { AuthorDTO } from '../../store/ducks/authors/types';
import Autocomplete from '@mui/lab/Autocomplete';
//Styles
import TextField from '@mui/material/TextField';
import { CircularProgress } from '@mui/material';
import '../../styles/global.css';

interface StateProps {
  authorChoiceList?: AuthorDTO[];
  valueSelected: AuthorDTO[];
  helperText?: string;
  error?: boolean;
}

interface DispatchProps {
  findByNameRequest(name: string): void;
  authorsSelected(authors: AuthorDTO[]): void;
  cleanAuthorsAutoCompleteList(): void;
}

type Props = StateProps & DispatchProps;

const AutoCompleteAuthor: React.FC<Props> = ({
  authorChoiceList,
  valueSelected,
  helperText,
  error,
  findByNameRequest,
  authorsSelected,
  cleanAuthorsAutoCompleteList
}) => {
  const [value, setValue] = useState<AuthorDTO[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<AuthorDTO[]>([]);
  const [open, setOpen] = useState(false);
  const loading = open && options && options.length === 0;

  useEffect(() => {
    setValue(valueSelected);
  }, [valueSelected]);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    if (inputValue && inputValue.length > 1 && active) {
      findByNameRequest(inputValue);
    }

    if (active) {
      setOptions(authorChoiceList as AuthorDTO[]);
    }

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, inputValue]);

  useEffect(() => {
    if (inputValue === '') {
      cleanAuthorsAutoCompleteList();
      setOptions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: ChangeEvent<{}>, newValue: AuthorDTO[]) => {
    setOptions(options);
    setValue(newValue);
    authorsSelected(newValue);
  };

  const handleInputChange = (event: ChangeEvent<{}>, newInputValue: string) => {
    setInputValue(newInputValue);
  };

  return (
    <Autocomplete
      multiple
      limitTags={2}
      id="auto-complete-author"
      className="form-select-field"
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      getOptionLabel={(option) => option.name}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={handleChange}
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading && <CircularProgress color="inherit" size={20} />}
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
};

AutoCompleteAuthor.displayName = 'AutoCompleteAuthor';

const mapStateToProps = (state: ApplicationState) => ({
  authorChoiceList: state.authors.authorsAutoComplete,
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(authorsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AutoCompleteAuthor);
