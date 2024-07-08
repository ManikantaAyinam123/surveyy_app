import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { Box, FormControl, InputLabel, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {Icon} from "@iconify/react";

const ResponsiveAppBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [section, setSection] = useState('all');
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        localStorage.removeItem('name');
        console.log("this is token after logout",localStorage.getItem('token'))
        console.log("this is usertype after logout",localStorage.getItem('userType'))
        console.log("this is usertype after logout",localStorage.getItem('name'))
        navigate('/');
    };

    const handleSectionChange = (event) => {
        console.log('Section changed to:', event.target.value);
        setSection(event.target.value);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#EE8832' }}>
            <Toolbar>
                <Typography variant="h6"  sx={{ flexGrow: 1, color: 'white',letterSpacing:'1.2px',textTransform:'uppercase' }}>
                    {localStorage.getItem('userType')}
                </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center',mr:2 }}>
                          <Icon icon="lets-icons:user-alt-fill" width="24" height="24" style={{ color: 'white' }} />
                           <Box sx={{ display: 'flex', alignItems: 'center' }}>
                           <Typography variant="subtitle1" sx={{ marginRight: 1, color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
                             {localStorage.getItem('name')}
                           </Typography>
                     </Box>
                     </Box>
                    <Button color="inherit" onClick={handleLogout}  sx={{ backgroundColor: 'white', color: '#EE8832',textTransform: 'none',letterSpacing:'1.3px',fontSize:'15px',padding:'5px 20px',fontWeight:'bold','&:hover':{color:'#EE8832',backgroundColor:'#ffffff'} }}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default ResponsiveAppBar;
