import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { get_tasks, get_pools } from '../api';

function SelectTasks() {
  const [pools, setPools] = React.useState([]);
  const [chosenTasks, setChosenTasks] = React.useState([]);
  const [availableTasks, setAvailableTasks] = React.useState([]);

  React.useEffect(() => {
    get_pools().then((pools) => {
      setPools(pools);
    });
  }, []);



  return (
    <FormControl>
      <InputLabel id="task-pool-select-label">Select a task pool</InputLabel>
      <Select
        labelId="task-pool-select-label"
        label="Select a task pool"
        
      >
        {pools.map((pool, index) => 
          <MenuItem value={pool.name}>{pool.name}</MenuItem>
        )}
      </Select>
    </FormControl>
  );

}

const customList1 = (title, items, handleToggle, handleToggleAll, numberOfChecked, checked) => (
  <Card>
    <CardHeader
      sx={{ px: 2, py: 1 }}
      avatar={
        <Checkbox
          onClick={handleToggleAll(items)}
          checked={numberOfChecked(items) === items.length && items.length !== 0}
          indeterminate={
            numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
          }
          disabled={items.length === 0}
          inputProps={{
            'aria-label': 'all items selected',
          }}
        />
      }
      title=<SelectTasks />
      subheader={`${numberOfChecked(items)}/${items.length} selected`}

    />
    <Divider />
    <List
      sx={{
        width: 400,
        height: 230,
        bgcolor: 'background.paper',
        overflow: 'auto',
      }}
      dense
      component="div"
      role="list"
    >
      {items.map((value) => {
        const labelId = `transfer-list-all-item-${value}-label`;

        return (
          <ListItem
            key={value}
            role="listitem"
            button
            onClick={handleToggle(value)}
          >
            <ListItemIcon>
              <Checkbox
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{
                  'aria-labelledby': labelId,
                }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`List item ${value + 1}`} />
          </ListItem>
        );
      })}
      <ListItem />
    </List>
  </Card>
);

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function TransferList() {
  const [pools, setPools] = React.useState([]);
  const [checked, setChecked] = React.useState([]);
  const [selected, setSelected] = React.useState(['a', 'b', 'my task']);
  const [available, setAvailable] = React.useState([4, 5, 6, 7]);

  const selectedChecked = intersection(checked, selected);
  const availableChecked = intersection(checked, available);

  React.useEffect(() => {
    get_pools().then((pools) => {
      setPools(pools);
    });
  }, []);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedAvailable = () => {
    setAvailable(available.concat(selectedChecked));
    setSelected(not(selected, selectedChecked));
    setChecked(not(checked, selectedChecked));
  };

  const handleCheckedSelected = () => {
    setSelected(selected.concat(availableChecked));
    setAvailable(not(available, availableChecked));
    setChecked(not(checked, availableChecked));
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 400,
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`List item ${value + 1}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList('Selected Tasks', selected)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedAvailable}
            disabled={selectedChecked.length === 0}
            aria-label="move selected available"
          >
            Remove
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedSelected}
            disabled={availableChecked.length === 0}
            aria-label="move selected selected"
          >
            Add
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList1('Available Tasks', available, handleToggle, handleToggleAll, numberOfChecked, checked)}</Grid>
    </Grid>
  );
}
