import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import AuthoringTabs from '../components/authoring/AuthoringTabs';

const api = window.e2xAPI;

export default function Authoring() {
  const [pools, setPools] = React.useState([]);
  
  const [loaded, setLoaded] = React.useState(false);


  React.useEffect(() => {
    api.get_pools().then((pools) => {
      setPools(pools);
      setLoaded(true);
    });
  }, []);

  return (
    <Stack spacing={2}>
      <Typography variant="h3" sx={{mt: 2}}>Authoring</Typography>
      {loaded ? (
         <AuthoringTabs pools={pools}/>
       ) : <Stack alignItems="center"><CircularProgress /></Stack>}
    </Stack>
  );
}