import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { searchByNameAction, fetchBoothNamesAction } from '../redux/actions/action';
import { Icon } from "@iconify/react";
import { FormControl, Select, MenuItem, Grid } from '@mui/material';
import VoterTable from './VoterTable';
import AllDataComponent from './AllDataComponent';
import CastedDataComponent from './CastedDataComponent';
import NotCastedDataComponent from './NotCastedDataComponent';
import Autocomplete from '@mui/material/Autocomplete';

const VolunteerData = () => {
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState('');
  const [searched, setSearched] = useState(false);
  const [filteredVoters, setFilteredVoters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBoothInAutocomplete, setSelectedBoothInAutocomplete] = useState('');
  const boothNames = useSelector((state) => state.boothNameReducer?.data || []);
  console.log("boothnames",boothNames)
  const [booth, setBooth] = useState('');
  const voters = useSelector((state) => state.searchByNameReducer?.data);
  console.log("voters data",voters)



  useEffect(() => {
    if (booth.trim() !== '') {
      dispatch(fetchBoothNamesAction(booth));
    }
  }, [booth, dispatch]);

  useEffect(() => {
    if (voters) {
      setFilteredVoters(voters.filter(item => !item.casted));
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [voters]);

  const handleSearch = (e) => {
    setLoading(true);
    setSearchName(e.target.value)
    dispatch(searchByNameAction(searchName, selectedBoothInAutocomplete));
    setSearched(true);
  };

  const handleClear = () => {
    setSearchName('');
    setFilteredVoters([]);
    setSearched(false);
  };

  const handleInputBoothChange = (event) => {
    console.log(event.target.value);
    setBooth(event.target.value);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container sx={{ padding: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Grid item >
          <Box sx={{ borderRadius: '7px', backgroundColor: "white", padding: '2px 5px' }}>
            <Autocomplete
                disablePortal
                size="small"
                id="combo-box-demo"
                options={boothNames}
                sx={{ width: 300 }}
                renderInput={(params) => {
                console.log("params", params);
                setSelectedBoothInAutocomplete(params.inputProps.value);
                console.log("setSelectedboothInAutocomplete usestate",selectedBoothInAutocomplete);
                console.log("params from booth", params.inputProps.value);
                return (
                  <TextField 
                  onChange={handleInputBoothChange}
                   sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#888888", 
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#888888", 
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#888888", 
                  }
                }
              }}{...params} placeholder="Booth name"/>);
                }}
              />
          </Box>
        </Grid>
        <Grid item>
          <TextField
            size="small"
            placeholder="Search by entering a name"
            variant="outlined"
            autoComplete="off"
            value={searchName}
            onChange={handleSearch}
            InputProps={{
              endAdornment: <Icon icon="material-symbols-light:search" width="25" height="25" style={{ color: 'black' }} />,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3e4241",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3e4241",
                },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#3e4241", }
              },
              mr: 2
            }}
          />

         
        </Grid>
      </Grid>

       
      {selectedBoothInAutocomplete &&  (
        <>
          {searchName.trim() !== '' ? (
            filteredVoters?.length === 0 ? (
               <img src="https://t4.ftcdn.net/jpg/05/86/21/03/360_F_586210337_WOGOw0l7raEB8F61Muc4hWbvVcyQdk9Z.jpg" alt="No data available"  
                style={{ marginTop: 16, display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
         
            ) : (
              <VoterTable voters={filteredVoters} />
            )
          ) : (
            <NotCastedDataComponent boothName={selectedBoothInAutocomplete} />
          )}
        </>
      )}
       
    
    </Box>
  );
};

export default VolunteerData;
 
 