import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchByNameAction, fetchConsistencyNamesAction, fetchBoothNamesAction } from '../redux/actions/action';
import { TextField, Box, Typography, FormControl, Select, MenuItem, Grid } from '@mui/material';
import VoterTable from './VoterTable';
import AllDataComponent from './AllDataComponent';
import CastedDataComponent from './CastedDataComponent';
import NotCastedDataComponent from './NotCastedDataComponent';
import { Icon } from "@iconify/react";
import Autocomplete from '@mui/material/Autocomplete';

const LeadData = () => {
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState('');
  const [constituency, setConstituency] = useState('');
  const [section, setSection] = useState('all');
  const [filteredSearchData, setFilteredSearchData] = useState([]);
  const [selectedConstituencyInAutocomplete, setSelectedConstituencyInAutocomplete] = useState('');
  const [selectedBoothInAutocomplete, setSelectedBoothInAutocomplete] = useState('');
  const [booth, setBooth] = useState('');
  const [selectedConstituency, setSelectedConstituency] = useState('');
  const searchData = useSelector((state) => state.searchByNameReducer?.data || []);
  console.log("im searchData",searchData);
  const constituencyNames = useSelector((state) => state.constituencyNameReducer?.names || []);
  const boothNames = useSelector((state) => state.boothNameReducer?.data|| []); 
console.log("i am in booth names file",boothNames)
  useEffect(() => {
    if (booth.trim() != '') {
      dispatch(fetchBoothNamesAction(booth));
    }
  }, [booth, dispatch]);

  useEffect(() => {
    if (constituency.trim() != '') {
      dispatch(fetchConsistencyNamesAction(constituency));
    }
  }, [constituency, dispatch]);

  useEffect(() => {
    if (section === 'all') {
      setFilteredSearchData(searchData);
    } else if (section === 'casted') {
      setFilteredSearchData(searchData?.filter(voter => voter.casted));
    } else if (section === 'not-casted') {
      setFilteredSearchData(searchData?.filter(voter => !voter.casted));
    }
  }, [section, searchData]);

  const handleSectionChange = (event) => {
    const value = event.target.value;
    setSection(value);
  };

  const handleInputSearchChange = (event) => {
    setSearchName(event.target.value);
    console.log("search --------->",event.target.value);
    console.log("search  ---------->",selectedBoothInAutocomplete);
    if (searchName !== '')
    {
      console.log(searchName);
    dispatch(searchByNameAction(event.target.value, selectedBoothInAutocomplete));
    }
  };

  const handleInputconstituencyChange = (event) => {
    setConstituency(event.target.value);
  };

  const handleInputBoothChange = (event) => {
    setBooth(event.target.value);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container sx={{ padding: '20px', display: 'flex', justifyContent: 'space-between', }}>
        <Grid item>
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
          <FormControl size="small" sx={{ boxShadow: '0px 0px 3px #888888', borderRadius: '7px', backgroundColor: "white", mt: '4px', "& .MuiOutlinedInput-root": {
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            }
          } }}>
            <Select value={section} onChange={handleSectionChange}>
              <MenuItem value="all">All Voters</MenuItem>
              <MenuItem value="casted">Casted Votes</MenuItem>
              <MenuItem value="not-casted">Not Casted Votes</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <Box sx={{ boxShadow: '0px 0px 3px #888888', borderRadius: '7px', backgroundColor: "white", }}>
            <TextField
              size="small"
              placeholder="Search by entering a name"
              value={searchName}
              onChange={handleInputSearchChange}
              autoComplete="off"
              InputProps={{
                endAdornment: <Icon icon="material-symbols-light:search" width="25" height="25" style={{ color: 'black' }} />,
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  }
                }
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <>
        {selectedBoothInAutocomplete && (
          <>
            {searchName.trim() !== '' ? (
              filteredSearchData?.length === 0 ? (
                     <img src="https://t4.ftcdn.net/jpg/05/86/21/03/360_F_586210337_WOGOw0l7raEB8F61Muc4hWbvVcyQdk9Z.jpg" alt="No data available"  style={{ marginTop: 16, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}  />
              ) : (
                <VoterTable voters={filteredSearchData} />
              )
            ) : (
              <>
                {section === 'all' && <AllDataComponent boothName={selectedBoothInAutocomplete} />}
                {section === 'casted' && <CastedDataComponent constituencyName={selectedConstituencyInAutocomplete} boothName={selectedBoothInAutocomplete} />}
                {section === 'not-casted' && <NotCastedDataComponent boothName={selectedBoothInAutocomplete} />}
              </>
            )}
          </>
        )}
      </>
    </Box>
  );
};

export default LeadData;