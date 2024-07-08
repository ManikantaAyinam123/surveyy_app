import React from 'react';
import VolunteerData from '../components/VolunteerData';
import ResponsiveAppBar from '../components/ResponsiveAppBar'
import { TextField, Button, Typography, Box, Grid } from '@mui/material';

const VolunteerPage = () => {
  return (
    <>
      <ResponsiveAppBar/>
      <VolunteerData/>
    </>
  );
};

export default VolunteerPage;
