import {
  FILTER_BY_CASTED_STATUS_REQUEST,
  FILTER_BY_CASTED_STATUS_SUCCESS,
  FILTER_BY_CASTED_STATUS_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  data: [],
  currentPage: 1,
  totalPages: null,
  error: null
};

const filterByCastedStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_BY_CASTED_STATUS_REQUEST:
      return { ...state, loading: true, error: null };
    case FILTER_BY_CASTED_STATUS_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        data: action.payload.voters, 
        totalPages: action.payload.total_pages,
        error: null 
      };
    case FILTER_BY_CASTED_STATUS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


export default filterByCastedStatusReducer;
