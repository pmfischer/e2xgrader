import React from 'react';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

import { get_tasks, get_pools } from '../api';

const taskInList = (task, list) => {
  return (
      list.filter(
          (item) => (item.name === task.name && item.pool === task.pool)
      ).length > 0
  );
}

const removeTaskFromList = (task, list) => {
  return (
      list.filter(
          (item) => (item.name !== task.name || item.pool !== task.pool)
      )
  );
}

const describe = (task) => {
  return "Task: " + task.name + ", " + task.questions + " questions, " + task.points + " point(s)";
}

function PoolSelect({pools, selectedPool, handlePoolChange}) {
  return (
    <FormControl style={{minWidth: 200}}>
      <InputLabel id="select-pool-label">Task Pool</InputLabel>
      <Select
        labelId="select-pool-label"
        label="Task Pool"
        onChange={handlePoolChange}
        value={selectedPool.name}
        


      >
        {pools.map((pool, index) => 
          <MenuItem value={pool.name}>{pool.name}</MenuItem>
        )}
      </Select>
    </FormControl>
  );
}

function AvailableTasksList({availableTasks, selectedTasks, handleSelectTask}) {
  return (
    <Paper sx={{minHeight: 300}}>
      <Typography p={1} variant="h6">Available Tasks</Typography>
      <Divider/>
      <List dense component="div" role="list">
        {availableTasks.map((task) => {
          return (
            <Tooltip title={describe(task)}>
            <ListItem 
              key={task.name} 
              role="listitem"
            >              
              <ListItemText primary={task.name} />
              <ListItemIcon>
                <Button
                  color="success"
                  variant="contained"
                  disabled={taskInList(task, selectedTasks)}
                  onClick={handleSelectTask(task)}
                >Add</Button>
              </ListItemIcon>
            </ListItem>
            </Tooltip>
          );
        })}
      </List>
    </Paper>
  );
}

function SelectedTasksList({selectedTasks, handleSelectTask}) {
  return (
    <Paper sx={{minHeight: 300}}>
      <Typography  p={1} variant="h6">Selected Tasks</Typography>
      <Divider/>
      <List dense component="div" role="list">
        {selectedTasks.map((task) => {
          return (
            <Tooltip title={describe(task)}>
            <ListItem 
              key={task.name} 
              role="listitem"
            >              
              <ListItemText primary={task.pool + "/" + task.name} />
              <ListItemIcon>
                <Button
                  color="error"
                  variant="contained"
                  onClick={handleSelectTask(task)}
                >Remove</Button>
              </ListItemIcon>
            </ListItem>
            </Tooltip>
          );
        })}
      </List>
    </Paper>
  );
}

export function TaskSelect() {
  const [availableTasks, setAvailableTasks] = React.useState([]);
  const [selectedTasks, setSelectedTasks] = React.useState([]);

  const [pools, setPools] = React.useState([]);
  const [selectedPool, setSelectedPool] = React.useState('');

  const handlePoolChange = (event) => {
    setSelectedPool(event.target.value);
  }

  const handleSelectTask = (task) => () => {
    if (!taskInList(task, selectedTasks)) {
      const newSelected = [...selectedTasks];
      newSelected.push(task);
      setSelectedTasks(newSelected);
    } else {
      setSelectedTasks(removeTaskFromList(task, selectedTasks));
    }
  }

  React.useEffect(() => {
    get_pools().then((pools) => setPools(pools));
  }, []);

  React.useEffect(() => {
    if (selectedPool !== "") {
      get_tasks(selectedPool).then((tasks) => {
        setAvailableTasks(tasks);
      });
    }
  }, [selectedPool]);

  return (    
    <Grid 
      container 
      spacing={2} 
      sx={{width: "100%"}}
      justifyContent="center"
    >    
      <Grid item xs={6}></Grid>
      <Grid item xs={6}>
        <PoolSelect 
          pools={pools} 
          selectedPool={selectedPool} 
          handlePoolChange={handlePoolChange} 
        />
      </Grid>      
      <Grid item xs={6}>
        <SelectedTasksList
          selectedTasks={selectedTasks}
          handleSelectTask={handleSelectTask} 
        />
      </Grid>
      <Grid item xs={6}>  
        <AvailableTasksList 
          availableTasks={availableTasks} 
          selectedTasks={selectedTasks} 
          handleSelectTask={handleSelectTask}
        />
      </Grid>
    </Grid>    
  );
}