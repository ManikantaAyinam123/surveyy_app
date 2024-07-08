import React from 'react';
import { Navigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import {Icon} from "@iconify/react";

const PrivateRoute = ({ element: Component, allowedRoles }) => {
  const token = localStorage.getItem('token'); 
  const userType = localStorage.getItem('userType'); 
  console.log("token from private route",token);
  console.log("userType from private route",userType);

  const isAuthenticated = !!token;
  const isAuthorized = allowedRoles.includes(userType);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return isAuthorized ? (
    
    <Component />
  ) : (
    <Box
      display="flex"
       flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
    <Icon icon="ic:outline-do-not-disturb-alt" width="70" height="70" sx={{color: 'black'}} />
      <Typography variant="h5" sx={{fontWeight:'bold',mt:'5px'}}>
        You are not authorized
      </Typography>
      <Typography>It seems like you don't have permission to use this portal.</Typography>
      <Typography>Please sign with a different account</Typography>
    </Box>
  );
};

export default PrivateRoute;
