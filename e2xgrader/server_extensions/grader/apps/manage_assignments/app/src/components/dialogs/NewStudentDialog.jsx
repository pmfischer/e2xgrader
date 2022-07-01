import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

const api = window.e2xAPI;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function NewStudentDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [studentID, setStudentID] = React.useState(props.studentID ? props.studentID : "");
  const [firstName, setFirstName] = React.useState(null);
  const [lastName, setLastName] = React.useState(null);
  const [eMail, setEMail] = React.useState(null);

  React.useEffect(() => {
    setStudentID(props.studentID);
  }, [props.studentID])

  const handleStudentIDChange = (event) => {
    setStudentID(event.target.value);
  };
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleEMailChange = (event) => {
    setEMail(event.target.value);
  };

  const handleReset = () => {
    setStudentID("");
    setFirstName(null);
    setLastName(null);
    setEMail(null);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    handleReset();
  };
  const handleConfirm = () => {
    setOpen(false);
    api.create_student(studentID, firstName, lastName, eMail);
    props.handleUpdate();
    handleReset();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} startIcon={<AddIcon />}>
        Add Student
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Create new student
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Fill in the student information:
          </Typography>
          <Stack spacing={2}>
            <TextField
              required 
              label="Student ID" 
              id="student-id" 
              variant="filled" 
              value={studentID}
              onChange={handleStudentIDChange}
            />
            <TextField 
              label="First Name (optional)" 
              id="first-name" 
              variant="filled" 
              value={firstName}
              onChange={handleFirstNameChange}
            />
            <TextField 
              label="Last Name (optional)" 
              id="last-name" 
              variant="filled" 
              value={lastName}
              onChange={handleLastNameChange}
            />
            <TextField 
              label="E-Mail (optional)" 
              id="email" 
              variant="filled" 
              value={eMail}
              onChange={handleEMailChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="success" onClick={handleConfirm}>
            Save
          </Button>
          <Button autoFocus variant="contained" color="error" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
