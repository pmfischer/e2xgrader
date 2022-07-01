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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

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

export default function NewAssignmentDialog() {
  const [open, setOpen] = React.useState(false);
  const [assignmentName, setAssignmentName] = React.useState("");
  const [assignmentNameValid, setAssignmentNameValid] = React.useState(true);
  const [date, setDate] = React.useState(null);

  const assignmentNameRegex = /^[A-Za-z\d]+[\w-]*$/;

  const handleAssignmentNameChange = (event) => {
    setAssignmentName(event.target.value);
    setAssignmentNameValid(assignmentNameRegex.test(event.target.value));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = () => {
    setOpen(false);
    console.log('CONFIRM');
    console.log(date);
    console.log(assignmentName);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} startIcon={<AddIcon />}>
        Add Assignment
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Create new assignment
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Fill in the assignment information:
          </Typography>
          <Stack spacing={2} sx={{width: '30ch'}}>
            <TextField 
              required
              label="Assignment Name" 
              id="assignment-name" 
              variant="filled" 
              value={assignmentName}
              onChange={handleAssignmentNameChange}
              error={!assignmentNameValid}
              helperText={!assignmentNameValid ? 'Name can only consist of letters, digits, "-" and "_"!' : ''}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker 
                renderInput={(props) => <TextField {...props} />}
                label="Due date (optional)"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
              />
            </LocalizationProvider>
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
