import { 
  SEARCH_BY_NAME_REQUEST, 
  SEARCH_BY_NAME_SUCCESS, 
  SEARCH_BY_NAME_FAILURE 
} from './actionTypes';
import { searchByNameData } from '../api/getData'; 

export const searchByNameAction = (searchName) => {
  return async (dispatch) => {
    dispatch({ type: SEARCH_BY_NAME_REQUEST });
    try {
      const data = await searchByNameData(searchName); 
      dispatch({ type: SEARCH_BY_NAME_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: SEARCH_BY_NAME_FAILURE, payload: error.message });
    }
  };
};
