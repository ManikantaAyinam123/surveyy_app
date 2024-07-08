import {
  SEARCH_BY_NAME_REQUEST,
  SEARCH_BY_NAME_SUCCESS,
  SEARCH_BY_NAME_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  data: [],
  error: null
};

const searchByNameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_BY_NAME_REQUEST:
      return { ...state, loading: true, error: null };
    case SEARCH_BY_NAME_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case SEARCH_BY_NAME_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default searchByNameReducer;
