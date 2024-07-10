import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllVotersAction } from '../redux/actions/action';
import VoterTable from './VoterTable';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Box, Typography, FormControl, Select, MenuItem } from '@mui/material';

const AllDataComponent = ({ boothName }) => {

  console.log("props in all data component boothName", boothName)
  
  const dispatch = useDispatch();
  const { data: allVotersdata, currentPage, totalPages } = useSelector((state) => state.fetchAllVoters);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAllVotersAction(page, boothName));
  }, [dispatch, page, boothName]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      
        <VoterTable voters={allVotersdata} />
      

      {allVotersdata.length !== 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '10px' }}>
          <Stack spacing={2} direction="row">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              sx={{
                '& .MuiPaginationItem-page.Mui-selected': { backgroundColor: '#EE8832',color: '#ffffff','&:hover': {backgroundColor: '#FFAA55',},},
                '& .MuiPaginationItem-page:not(.Mui-selected):hover': { backgroundColor: '#FFAA55',  color: '#ffffff',  },
                }}
            />
          </Stack>
       </Box>

      )}
    </>
  );
};

export default AllDataComponent;