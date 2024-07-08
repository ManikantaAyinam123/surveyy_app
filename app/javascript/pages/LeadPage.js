import React from 'react';
import LeadData from '../components/LeadData';
import ResponsiveAppBar from '../components/ResponsiveAppBar'
import { TextField, Button, Typography, Box, Grid } from '@mui/material';

const LeadPage = () => {
  return (
    <Grid sx={{backgroundColor:'#ffffff'}}>
    <ResponsiveAppBar/>
    <LeadData/>
    
    </Grid>
  );
};

export default LeadPage;
