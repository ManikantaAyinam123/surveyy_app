import { 
  FILTER_BY_CASTED_STATUS_REQUEST, 
  FILTER_BY_CASTED_STATUS_SUCCESS, 
  FILTER_BY_CASTED_STATUS_FAILURE 
} from './actionTypes';
import { filterByCastedStatusData } from '../api/getData'; 

export const filterByCastedStatusAction = (casted) => {
  return async (dispatch) => {
    dispatch({ type: FILTER_BY_CASTED_STATUS_REQUEST });
    try {
      const data = await filterByCastedStatusData(casted); 
      dispatch({ type: FILTER_BY_CASTED_STATUS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FILTER_BY_CASTED_STATUS_FAILURE, payload: error.message });
    }
  };
};
