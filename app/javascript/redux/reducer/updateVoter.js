import {
  UPDATE_VOTER_REQUEST,
  UPDATE_VOTER_SUCCESS,
  UPDATE_VOTER_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  updatedVoter: null,
  error: null
};

const updateVoterReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VOTER_REQUEST:
      return { ...state, loading: true, error: null, updatedVoter: null };
    case UPDATE_VOTER_SUCCESS:
      return { ...state, loading: false, updatedVoter: action.payload, error: null };
    case UPDATE_VOTER_FAILURE:
      return { ...state, loading: false, error: action.payload, updatedVoter: null };
    default:
      return state;
  }
};

export default updateVoterReducer;
