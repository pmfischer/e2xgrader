import React from 'react';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import NewAssignmentDialog from '../components/dialogs/NewAssignmentDialog';

import AssignmentsTable from '../components/tables/AssignmentsTable';

const api = window.e2xAPI;

export default function Assignments() {
    const [assignments, setAssignments] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      api.get_assignments().then((assignments) => {
          setAssignments(assignments);
          setLoading(false);
      });
    }, []);

    return (
        <Stack spacing={2}>
          <Typography variant="h3" sx={{mt: 2}}>Assignments</Typography>
          <AssignmentsTable rows={assignments} loading={loading}/>
          <Stack direction="row">
            <NewAssignmentDialog />
          </Stack>
        </Stack>
    );
}