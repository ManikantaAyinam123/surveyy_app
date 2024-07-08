import { 
  FETCH_ALL_VOTERS_REQUEST, 
  FETCH_ALL_VOTERS_SUCCESS, 
  FETCH_ALL_VOTERS_FAILURE 
} from './actionTypes';
import { fetchAllVotersData } from '../api/getData'; 

export const fetchAllVotersAction = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ALL_VOTERS_REQUEST });
    try {
      const data = await fetchAllVotersData();
      console.log("action",data); 
      dispatch({ type: FETCH_ALL_VOTERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_ALL_VOTERS_FAILURE, payload: error.message });
    }
  };
};
