import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from '../actions/actionTypes';

const initialLoginState = {
  loading: false,
  user: null,
  token: null,
  error: null,
};

const loginReducer = (state = initialLoginState, action) => {
  
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: null };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
   
    default:
      return state;
  }
};

export default loginReducer;
