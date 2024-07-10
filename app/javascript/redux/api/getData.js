import axios from 'axios';
import API from "../../API/API";
const api = new API();
const all_voters = "voters";
const booth_names_url ="voters/search_by_booth_name"

const login = "auth/login";
const filter_casted_status = "voters/filter_casted_status";
// const all_voters = "http://localhost:3000/voters";
const search_by_name = "voters/search_by_name";
const update ="voters/";
// const filter_casted_status = "http://localhost:3000/voters/filter_casted_status";

const consistency_names_url = "http://localhost:3000/voters/search_by_constituency";
// const booth_names_url = "http://localhost:3000/voters/search_by_booth_name";

// export const fetchAllVotersData = async (page,boothName) => {

//    console.log("apinames in allvoters",boothName)
//   try {
//     const response = await axios.get(`${all_voters}?booth_name=${boothName}&page=${page}`);
//     const data = response.data;
//     console.log("thisis api data",data);
//     return data;
//   } catch (error) {
//     console.error('Error fetching all voters data:', error);
//     throw error;
//   }
// };



export const fetchAllVotersData = async (page,boothName) => {
  console.log("apinames in allvoters",boothName)
  return new Promise(async (resolve, reject) => {
    try {
        const result = await api.get(`${all_voters}?booth_name=${boothName}&page=${page}`);
      console.log("all voters data api:", result);
      const data = result.data;
      resolve(data);  
    } catch (error) {
      console.error("Error in allvoters API call:", error);
      reject(error);  
    }
  });
};
export const filterByCastedStatusData = async (casted, page, boothName) => {
  console.log("apinames in casted",boothName)
  return new Promise(async (resolve, reject) => {
    try {
       const result = await api.get(`${filter_casted_status}?casted=${casted}&booth_name=${boothName}&page=${page}`);
      console.log("all casted api:", result);
       const data = result?.data
      resolve(data);  
    } catch (error) {
      console.error("Error in allvoters API call:", error);
      reject(error);  
    }
  });
};
export const searchByNameData = async (name,boothName) => {
 console.log("from search api ============>", name,boothName);
  return new Promise(async (resolve, reject) => {
    try {
        
    const result = await api.get(`${search_by_name}?booth_name=${boothName}&voter_name=${name}`);
      console.log("search by name:", result);
      const data = result?.data
      resolve(data);  
    } catch (error) {
      console.error("Error in search name API call:", error);
      reject(error); 
    }
  });
};
export const updateVoter = async (id, updatedFields) => {

 return new Promise(async (resolve, reject) => {
    try {
        
   const result = await api.put(`${update}${id}`, updatedFields);
      console.log("update:", result);
      const data = result?.data
      resolve(data);  
    } catch (error) {
      console.error("Error in search name API call:", error);
      reject(error);  
    }
  });
};
// export const searchByNameData = async (name,boothName) => {
//  console.log("from search api ============>", name,boothName);
//   return new Promise(async (resolve, reject) => {
//     try {
        
//     const result = await axios.get(`${search_by_name}?voter_name=${name}&booth_name=${boothName}`);
//       console.log("search by name:", result);
//       resolve(result);  
//     } catch (error) {
//       console.error("Error in search name API call:", error);
//       reject(error);  // Ensure reject is called with the error
//     }
//   });
// };

// export const searchByNameData = async (name,boothName) => {
//  console.log("from search api ============>", name,boothName);
//   return new Promise(async (resolve, reject) => {
//     try {
        
//     const result = await axios.get(`${search_by_name}?voter_name=${name}&booth_name=${boothName}`);
//       console.log("search by name:", result);
//       resolve(result);  
//     } catch (error) {
//       console.error("Error in search name API call:", error);
//       reject(error);  // Ensure reject is called with the error
//     }
//   });
// };
// export const searchByNameData = async (name,boothName) => {
//   try {
//     console.log("from search api ============>", name,boothName);
//     const response = await axios.get(`${search_by_name}?voter_name=${name}&booth_name=${boothName}`);
//     console.log(response.data);
//     const data = response.data;
//     console.log("Search by Name Data from API ===================>", data);
//     return data;
//   } catch (error) {
//     console.error('Error searching by name:', error);
//     throw error;
//   }
// };

// export const filterByCastedStatusData = async (casted, page, boothName) => {
//   try {
//     console.log("Filter by Casted Status Data from API +++++>",casted, page, boothName );
//     const response = await axios.get(`${filter_casted_status}?casted=${casted}&booth_name=${boothName}&page=${page}`);
//     const data = response.data;
//     console.log("Filter by Casted Status Data from API ////////////", data);
//     return data;
//   } catch (error) {
//     console.error('Error filtering by casted status:', error);
//     throw error;
//   }
// };

// export const updateVoter = async (id, updatedFields) => {

// try {
//     const response = await axios.put(`http://localhost:3000/voters/${id}`, updatedFields);
//     console.log('Update voter response:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error updating voter:', error);
//     throw error;
//   }
// };

export const fetchConsistencyNamesData = async (name) => {
  console.log("in api",name);
  try {
    const response = await axios.get(`${consistency_names_url}?constituency=${name}`);
    const data = response.data;
    console.log("api constituency",data)
    return data;
  } catch (error) {
    console.error('Error fetching consistency names data:', error);
    throw error;
  }
};

// export const fetchBoothNamesData = async (name) => {
//   try {
//     console.log("Fetching booth names for:", name);
//     const response = await axios.get(`${booth_names_url}?booth_name=${name}`);
//     const data = response.data;
//     console.log("Booth Names Data from API", data);
//     return data;
//   } catch (error) {
//     console.error('Error fetching booth names data:', error);
//     throw error;
//   }
// };
export const fetchBoothNamesData = async (name) => {
  console.log("boothnames data",name)
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.get(`${booth_names_url}?booth_name=${name}`);
      console.log("booth names data:", result);
      const data = result?.data
      resolve(data);  
    } catch (error) {
      console.error("Error in boothName API call:", error);
      reject(error);  
    }
  });
};

// export const loginData = async(formdata) =>{
//   try {
//     console.log("formdata in api ",formdata)
//     const response = await axios.post('http://localhost:3000/auth/login', formdata);

//       const data = response.data;
//       console.log("data getting from api in api file",data)
//     return data;
//   } catch (error) {
//     console.error('error fectching login data:', error);
//     throw error;
//   }
// };



export const loginData = async (formData) => {
  console.log("Starting login API call with formData:", formData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.post(`${login}`, formData);
      console.log("Login API response:", result);
      resolve(result);
    } catch (error) {
      console.error("Error in login API call:", error);
      reject(error); 
    }
  });
};




