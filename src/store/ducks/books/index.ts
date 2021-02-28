import { Reducer } from 'redux';
import { BooksState, BooksTypes } from './types'

const INITIAL_STATE: BooksState = {
  data: [ {id: 1, title: 'Paulo'}],
  error: false,
  loading: false
};

const reducer: Reducer<BooksState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BooksTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case BooksTypes.LOAD_SUCCESS:
      return { ...state, loading: false, error: false, data: action.payload.data };
    case BooksTypes.LOAD_FAILURE:
      return { ...state, loading: false, error: true, data: [] };
    default:
      return state;
  }
}


export default reducer;