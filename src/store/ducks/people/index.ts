import { Reducer } from 'redux';
import { PeopleState, PeopleTypes } from './types'

const INITIAL_STATE: PeopleState = {
  personData: undefined,
  peopleData: [],
  peopleAutoComplete: [],
  error: false,
  loading: false,
  flagEditing: false,
  flagDetail: false
};

const reducer: Reducer<PeopleState> = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case PeopleTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case PeopleTypes.LOAD_SUCCESS:
      return { ...state, loading: false, error: false, peopleData: action.payload.peopleData };    
    case PeopleTypes.SEARCH_REQUEST:
      return { ...state, loading: true };
    case PeopleTypes.SEARCH_SUCCESS:
      return { ...state, loading: false, error: false, peopleData: action.payload.peopleData };    
    case PeopleTypes.FIND_BY_ID_REQUEST:
      return { ...state, loading: true };
    case PeopleTypes.FIND_BY_ID_SUCCESS:
      return { ...state, loading: false, error: false, personData: action.payload.personData };    
    case PeopleTypes.FIND_BY_NAME_REQUEST:
      return { ...state, loading: true };
    case PeopleTypes.FIND_BY_NAME_SUCCESS:
      return { ...state, loading: false, error: false, peopleAutoComplete: action.payload.peopleData };    
    case PeopleTypes.UPDATE_REQUEST:
      return { ...state, loading: true };
    case PeopleTypes.UPDATE_SUCCESS:
      return { ...state, loading: false, error: false, flagEditing: !state.flagEditing, personData: undefined };    
    case PeopleTypes.CREATE_REQUEST:
      return { ...state, loading: true };
    case PeopleTypes.CREATE_SUCCESS:
      return { ...state, loading: false, error: false, flagEditing: !state.flagEditing, personData: undefined };    
    case PeopleTypes.DELETE_BY_ID_REQUEST:
      return { ...state, loading: true };
    case PeopleTypes.DELETE_BY_ID_SUCCESS:
      return { 
        ...state, 
        loading: true,
        peopleData: state.peopleData.filter(
          (person) => person.id !== action.payload.data.id
        ) };       
    case PeopleTypes.CHANGE_FLAG_EDITING:
      return { ...state, flagEditing: !state.flagEditing };
    case PeopleTypes.CHANGE_FLAG_DETAIL:
      return { ...state, flagDetail: !state.flagDetail };
    case PeopleTypes.CLEAN_BOOK_EDIT:
      return { ...state, personData: undefined };    
    default:
      return state;
  }
}

export default reducer;