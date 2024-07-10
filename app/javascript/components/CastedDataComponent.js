import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByCastedStatusAction } from '../redux/actions/action';
import VoterTable from './VoterTable';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Box, Typography } from '@mui/material';

const CastedDataComponent = ({ section, constituencyName, boothName }) => {
  const dispatch = useDispatch();
  const { data: castedData, currentPage, totalPages } = useSelector((state) => state.filterByCastedStatusReducer);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(filterByCastedStatusAction(true, page, boothName));
    console.log("useEffect triggered with page:", page);
  }, [dispatch, page, constituencyName, boothName]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      {castedData?.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <img 
            src="https://t4.ftcdn.net/jpg/05/86/21/03/360_F_586210337_WOGOw0l7raEB8F61Muc4hWbvVcyQdk9Z.jpg" 
            alt="No data available" 
            style={{ maxWidth: '100%', height: 'auto' }} 
          />
        
        </Box>
      ) : (
        <>
          <VoterTable voters={castedData} />
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
        </>
      )}
    </>
  );
};

export default CastedDataComponent;