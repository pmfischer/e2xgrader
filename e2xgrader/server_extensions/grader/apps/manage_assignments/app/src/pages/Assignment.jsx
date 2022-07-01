import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import PublishIcon from '@mui/icons-material/Publish';

import { useParams } from 'react-router-dom';

import AssignmentTabs from '../components/assignment/AssignmentTabs';

const api = window.e2xAPI;

function AssignmentControls(props) {

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Button startIcon={<PublishIcon />} variant="contained" disabled={!props.releasable}>
          Release Assignment
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button startIcon={<PublishIcon />} variant="contained" disabled={!props.releasable}>
          Generate Student Version
        </Button>
      </Grid>
    </Grid>
  );
}

export default function Assignment() {
  const [assignmentInfo, setAssignmentInfo] = React.useState({});
  const [notebookInfo, setNotebookInfo] = React.useState([]);
  const [submissionInfo, setSubmissionInfo] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const params = useParams();
  const assignment = params.assignment;


  React.useEffect(() => {
    api.get_assignment(assignment).then((assignment) => {
      api.get_notebooks(assignment.name).then((notebooks) => {
        api.get_submissions(assignment.name).then((submissions) => {
          setAssignmentInfo(assignment);
          setNotebookInfo(notebooks);
          setSubmissionInfo(submissions);
          setLoaded(true);
        });        
      });
    });    
  }, [assignment]);

  return (
    <Stack spacing={2}>
      <Typography variant="h3" sx={{mt: 2}}>{ assignment }</Typography>
      {loaded ? (
         <AssignmentTabs {...assignmentInfo} notebooks={notebookInfo} submissions={submissionInfo} assignment={assignment}/>
       ) : <Stack alignItems="center"><CircularProgress /></Stack>}
    </Stack>
  );
}