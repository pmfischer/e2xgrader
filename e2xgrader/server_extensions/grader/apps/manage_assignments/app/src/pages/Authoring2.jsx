import React from 'react';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import TaskSelect from '../components/TaskSelect';

function SelectTasksInfo() {
  return (
    <Alert severity="info">
      <AlertTitle>Help</AlertTitle>
      Select the tasks you want to use here.<br/>
      <ol>
        <li>Select a task pool</li>
        <li>Select tasks from the pool you want to use</li>
        <li>Repeat</li>
      </ol>
    </Alert>
  );
}

export default function Authoring() {  
  return (
    <Stack spacing={2}>
      <Typography variant="h3" sx={{mt: 2}}>Authoring</Typography>
      <SelectTasksInfo />
      <TaskSelect />
    </Stack>
  );
}