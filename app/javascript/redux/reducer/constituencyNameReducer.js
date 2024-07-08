
import {
  FETCH_CONSISTENCY_NAMES_REQUEST,
  FETCH_CONSISTENCY_NAMES_SUCCESS,
  FETCH_CONSISTENCY_NAMES_FAILURE,
 
} from '../actions/actionTypes';

const initialConsistencyNamesState = {
  loading: false,
  names: [],
  error: null
};

const consistencyNameReducer = (state = initialConsistencyNamesState, action) => {
  switch (action.type) {
    case FETCH_CONSISTENCY_NAMES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CONSISTENCY_NAMES_SUCCESS:
      return { ...state, loading: false, names: action.payload, error: null };
    case FETCH_CONSISTENCY_NAMES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


export default consistencyNameReducer;
