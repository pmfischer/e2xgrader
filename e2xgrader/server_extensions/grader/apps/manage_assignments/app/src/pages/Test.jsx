import React from 'react';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const pathJoin = window.pathJoin;

function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onMouseOver={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default function Test() {
  

  return (
    <Stack spacing={2}>
      <Typography variant="h3" sx={{mt: 2}}>Test</Typography>
      <iframe 
        seamless="seamless" 
        title="Test Notebook" 
        src={pathJoin([window.base_url, "e2xnotebooks", window.url_prefix, "Untitled.ipynb"])} 
        style={{border: "1px solid #ccc", height: "80vh"}} />
    </Stack>
  );
}