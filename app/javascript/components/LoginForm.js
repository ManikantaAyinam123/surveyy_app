import React, { useState } from 'react';
import axios from 'axios';
import { loginAction } from '../redux/actions/action';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.loginReducer.user);
     console.log(localStorage.getItem('token') )

     console.log(localStorage.getItem('userType') )
     console.log(localStorage.getItem('username') )
  console.log("login data", authState);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formIsValid = true;
    const newErrors = { email: '', password: '' };

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      formIsValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      formIsValid = false;
    } else if (formData.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters long';
      formIsValid = false;
    }

    setErrors(newErrors);
    if (formIsValid) {
      console.log("form valid")
      dispatch(loginAction(formData,navigate));
    }

  }
 
  


  
  return (
    <>
      <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
        <Grid item xs={12} sm={8} md={6} lg={3.5}>
          <Box sx={{ boxShadow: '5px 4px 8px 5px rgba(0, 0, 0, 0.2)', padding: '80px 30px', borderRadius: '10px' }}>
            <Box sx={{ textAlign: 'center', mb: '20px' }}>
              <Typography variant="h4" sx={{ fontWeight: '700', color: '#EE8832' }}>
                Sign in
              </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
              <Box mb={3}>
                <TextField
                  fullWidth
                  placeholder=" Enter Email"
                  name="email"
                  type="email"
                  required
                  variant="outlined"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!errors.email}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(0, 0, 0, 0.5)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(0, 0, 0, 0.5)",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(0, 0, 0, 0.5)",
                      }
                    }
                  }}
                />
                {errors.email && <Typography color="error">{errors.email}</Typography>}
              </Box>
              <Box mb={5}>
                <TextField
                  fullWidth
                  placeholder="Enter Password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  error={!!errors.password}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(0, 0, 0, 0.5)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(0, 0, 0, 0.5)",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(0, 0, 0, 0.5)",
                      }
                    }
                  }}
                />
                {errors.password && <Typography color="error">{errors.password}</Typography>}
              </Box>
              <Box mt={2}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: '#EE8832', fontSize: '18px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'none', padding: '10px', '&:hover': { backgroundColor: '#EE8832', color: 'white', } }}
                >
                  Login
                </Button>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
};

export default LoginForm;
