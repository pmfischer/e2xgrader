// Importing files from Material-UI
import React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
//import IconButton from '@mui/material/IconButton';
//import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { Button } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ContactsIcon from '@mui/icons-material/Contacts';
import CreateIcon from '@mui/icons-material/Create';

const pathJoin = window.pathJoin;

const MenuButton = (props) => {
  const navigate = useNavigate();

  return (
    <Button 
      startIcon={props.startIcon} 
      variant="contained" 
      disableElevation
      onClick={() => {
        navigate(pathJoin(['/e2xgrader', props.link]));
      }}
    >
      {props.label}
    </Button>
  );
};


export default function Navbar() {
  return (
    <div>
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit">
          <Stack direction="row" spacing={2}>
            <MenuButton startIcon={<AssignmentIcon/>} label="Assignments" link="assignments"/>
            <MenuButton startIcon={<ContactsIcon/>} label="Students" link="students"/>
            <MenuButton startIcon={<CreateIcon/>} label="Authoring" link="authoring"/>
            <MenuButton startIcon={<AssessmentIcon/>} label="Analytics" link="analytics"/>
          </Stack>
        </Typography>
      </Toolbar>
    </AppBar>
    </div>
  );
}
