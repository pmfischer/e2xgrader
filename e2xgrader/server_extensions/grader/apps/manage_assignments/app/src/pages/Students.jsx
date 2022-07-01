import React from 'react';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import StudentsTable from '../components/tables/StudentsTable';
import NewStudentDialog from '../components/dialogs/NewStudentDialog';

const api = window.e2xAPI;

export default function Students() {
  const [students, setStudents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    api.get_students().then((students) => {
        setStudents(students);
        setLoading(false);
    });
  }, []);

  const updateTable = () => {
    setLoading(true);
    api.get_students().then((students) => {
        setStudents(students);
        setLoading(false);
    });
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h3" sx={{mt: 2}}>Students</Typography>
      <StudentsTable loading={loading} rows={students} />
      <Stack direction="row">
        <NewStudentDialog handleUpdate={updateTable} studentID="superstudent2s"/>
      </Stack>
    </Stack>
  );
}