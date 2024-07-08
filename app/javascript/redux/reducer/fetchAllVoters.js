import {
  FETCH_ALL_VOTERS_REQUEST,
  FETCH_ALL_VOTERS_SUCCESS,
  FETCH_ALL_VOTERS_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  data: [],
  totalPages: 0,
  currentPage: 1,
  error: null
};

const fetchAllVotersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_VOTERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ALL_VOTERS_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        data: action.payload.voters, 
        totalPages: action.payload.total_pages, 
        currentPage: action.payload.current_page,
        error: null 
      };
    case FETCH_ALL_VOTERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default fetchAllVotersReducer;
