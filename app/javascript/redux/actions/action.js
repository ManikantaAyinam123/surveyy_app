import { 
  FETCH_ALL_VOTERS_REQUEST, FETCH_ALL_VOTERS_SUCCESS, FETCH_ALL_VOTERS_FAILURE, 
  SEARCH_BY_NAME_REQUEST, SEARCH_BY_NAME_SUCCESS, SEARCH_BY_NAME_FAILURE, 
  FILTER_BY_CASTED_STATUS_REQUEST, FILTER_BY_CASTED_STATUS_SUCCESS, FILTER_BY_CASTED_STATUS_FAILURE ,UPDATE_VOTER_REQUEST,
  UPDATE_VOTER_SUCCESS,
  UPDATE_VOTER_FAILURE,
  FETCH_CONSISTENCY_NAMES_REQUEST,
  FETCH_CONSISTENCY_NAMES_SUCCESS,
  FETCH_CONSISTENCY_NAMES_FAILURE,
  FETCH_BOOTH_NAMES_REQUEST, FETCH_BOOTH_NAMES_SUCCESS, FETCH_BOOTH_NAMES_FAILURE,
   LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE 
} from './actionTypes';
import { fetchAllVotersData, searchByNameData, filterByCastedStatusData, updateVoter,fetchConsistencyNamesData, fetchBoothNamesData,loginData } from '../api/getData'; 
import axios from 'axios';
export const fetchAllVotersAction = (page = 1,boothName) => {
 
  console.log("action all voters data",boothName);
  return async (dispatch) => {
    dispatch({ type: FETCH_ALL_VOTERS_REQUEST });
    try {
      const data = await fetchAllVotersData(page,boothName);
       console.log("api",data)
      dispatch({ type: FETCH_ALL_VOTERS_SUCCESS, payload: data });
        console.log("redux fetch",data)
    } catch (error) {
      dispatch({ type: FETCH_ALL_VOTERS_FAILURE, payload: error.message });

    }
  };
};

export const searchByNameAction = (searchName,boothName) => {
  console.log("name in action ===============>",searchName,boothName);
  return async (dispatch) => {
    dispatch({ type: SEARCH_BY_NAME_REQUEST });
    try {
      const data = await searchByNameData(searchName,boothName); 
      dispatch({ type: SEARCH_BY_NAME_SUCCESS, payload: data });

    } catch (error) {
      dispatch({ type: SEARCH_BY_NAME_FAILURE, payload: error.message });
    }
  };
};

export const filterByCastedStatusAction = (casted, page = 1, boothName) => {
  console.log("casted status in action------------------>", casted,page, boothName);
  
  return async (dispatch) => {
    dispatch({ type: FILTER_BY_CASTED_STATUS_REQUEST });
    try {
      const data = await filterByCastedStatusData(casted, page, boothName);
      dispatch({ type: FILTER_BY_CASTED_STATUS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FILTER_BY_CASTED_STATUS_FAILURE, payload: error.message });
    }
  };
};


export const updateVoterAction = (voterId, updatedFields) => {
  console.log("this is action for update",updatedFields)
  return async (dispatch) => {
    dispatch({ type: UPDATE_VOTER_REQUEST });
    try {
      const data = await updateVoter(voterId, updatedFields); 
      console.log('Voter updated successfully:', data);
      dispatch({ type: UPDATE_VOTER_SUCCESS, payload: data });
    } catch (error) {
      console.error('Error updating voter:', error);
      dispatch({ type: UPDATE_VOTER_FAILURE, payload: error.message });
    }
  };
};

export const fetchConsistencyNamesAction = (name) => {
  console.log("in action",name);
  return async (dispatch) => {
    dispatch({ type: FETCH_CONSISTENCY_NAMES_REQUEST });
    try {
      const data = await fetchConsistencyNamesData(name);
      dispatch({ type: FETCH_CONSISTENCY_NAMES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_CONSISTENCY_NAMES_FAILURE, payload: error.message });
    }
  };
};

export const fetchBoothNamesAction = (name) => {
  console.log("Action in booth",name);
  return async (dispatch) => {
    dispatch({ type: FETCH_BOOTH_NAMES_REQUEST });
    try {
      const data = await fetchBoothNamesData(name);
      console.log("booth data -->",data)
      dispatch({ type: FETCH_BOOTH_NAMES_SUCCESS, payload: data });
      console.log("redux booth name -->",data)
    } catch (error) {
      dispatch({ type: FETCH_BOOTH_NAMES_FAILURE, payload: error.message });
    }
  };
};

export const loginAction = (formData,navigate) => {
  console.log("Login action triggered with formData:", formData);
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
     
      const data = await loginData(formData);
      console.log("in action --------------->",data);
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      console.log("total data",data.data);
      if (data.status === 200 )
      {
        
        localStorage.setItem('userType', data.data.user_type);
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('name', data.data.username);
         console.log("local storage data in action ========>")
         console.log(localStorage.getItem('userType'));
         console.log(localStorage.getItem('token'));
         console.log(localStorage.getItem('name'));
          if(localStorage.getItem('userType') === 'volunteer') 
          {    
          navigate('/VolunteerData');
          } 
          else
          {
            navigate('/LeadData');
          }
     }
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };
};

