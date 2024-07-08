import React, { useState } from 'react';
import { Icon } from "@iconify/react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Modal } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ModalForm from './ModalForm';
import { updateVoterAction } from '../redux/actions/action';
import { useDispatch, useSelector } from 'react-redux';

const VoterTable = ({ voters }) => {
  const dispatch = useDispatch();
  const [userType, setUserType] = useState(localStorage.getItem('userType')); 
  const [selectedVoter, setSelectedVoter] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    voter_name: '',
    age: '',
    gender: '',
    house_number: '',
    mobile_No: '',
    booth_name: '',
    casted: false,
    figured_by: ''
  });

  const updateData = useSelector((state) => state); 

  const handleOpen = (voter) => {
    setSelectedVoter(voter);
    setFormData({ ...voter });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleSubmit = () => {
    const figuredBy = localStorage.getItem('name');
    const { voter_name, age, gender, house_number, mobile_No, booth_name, casted, figured_by } = formData;
    const updatedFields = { voter_name, age, gender, house_number, mobile_No, booth_name, casted, figured_by: figuredBy };

    dispatch(updateVoterAction(selectedVoter.id, { voter: updatedFields }));
    setOpen(false);

      toast.success('Voter data updated successfully!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
       
        onClose: () => {
       
        window.location.reload();
      }
        });
   
  };

  return (
    <>
     {voters.length !=0 &&(
      <TableContainer sx={{ boxShadow: '0px 0px 5px #888888',borderRadius:'15px'}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{backgroundColor:'#EE8832',}}>
            <TableRow>
              <TableCell sx={{fontWeight:'bold',color:'white'}}>ID</TableCell>
              <TableCell sx={{fontWeight:'bold',color:'white'}}>Name</TableCell>
              <TableCell sx={{fontWeight:'bold',color:'white'}}>Age</TableCell>
              <TableCell sx={{fontWeight:'bold',color:'white'}}>Gender</TableCell>
              <TableCell sx={{fontWeight:'bold',color:'white'}}>House No</TableCell>
              <TableCell sx={{fontWeight:'bold',color:'white'}}>Mobile No</TableCell>
              <TableCell sx={{fontWeight:'bold',color:'white'}}>Booth Name</TableCell>
              <TableCell sx={{fontWeight:'bold',color:'white'}}>Casted</TableCell>
              <TableCell sx={{fontWeight:'bold',color:'white'}}>Figured By</TableCell>
              {userType === 'volunteer' && <TableCell sx={{fontWeight:'bold',color:'white'}}>Action </TableCell>} 
            </TableRow>
          </TableHead>
          <TableBody>
            {voters.map((voter) => (
              <TableRow key={voter.id} sx={{ '&:nth-child(even)': { backgroundColor: '#fef' } }}>
                <TableCell>{voter.id}</TableCell>
                <TableCell>{voter.voter_name}</TableCell>
                <TableCell>{voter.age}</TableCell>
                <TableCell>{voter.gender}</TableCell>
                <TableCell>{voter.house_number}</TableCell>
                <TableCell>{voter.mobile_number}</TableCell>
                <TableCell>{voter.booth_name}</TableCell>
                <TableCell>{voter.casted ? "Yes" : "No"}</TableCell>
                <TableCell>{voter.figured_by}</TableCell>
                {userType === 'volunteer' && (
                  <TableCell>
                    <Button onClick={() => handleOpen(voter)}>
                      <Icon icon="clarity:edit-solid" width="18" height="18"  style={{color: 'black'}} />
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      )}
      <ModalForm 
        open={open} 
        handleClose={handleClose} 
        formData={formData} 
        handleChange={handleChange} 
        handleSubmit={handleSubmit} 
      />
      <ToastContainer />
    </>
  );
};

export default VoterTable;
