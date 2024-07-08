import {
  FETCH_BOOTH_NAMES_REQUEST,
  FETCH_BOOTH_NAMES_SUCCESS,
  FETCH_BOOTH_NAMES_FAILURE,
} from '../actions/actionTypes';

const initialBoothNamesState = {
  loading: false,
  data: [], // Ensure this is initialized as an array
  error: null,
};

const boothNameReducer = (state = initialBoothNamesState, action) => {
  switch (action.type) {
    case FETCH_BOOTH_NAMES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_BOOTH_NAMES_SUCCESS:
      console.log("Booth Names Fetch Success: ", action.payload);
      return { ...state, loading: false, data: action.payload || [] }; // Ensure it's an array
    case FETCH_BOOTH_NAMES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default boothNameReducer;
