import React from 'react';

import Button from '@mui/material/Button';
import BoltIcon from '@mui/icons-material/Bolt';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';

import format from 'date-fns/format';

import DataTable from './DataTable';

const pathJoin = window.pathJoin;

const columns = [
  {
    field: 'student',
    headerName: 'Student ID',
    flex: 1,
  },
  {
    field: 'fullName',
    headerName: 'Student Name',
    flex: 2,
    valueGetter: (params) =>
      `${params.row.first_name || 'None'} ${params.row.last_name || 'None'}`,
  },
  {
    field: 'timestamp',
    headerName: 'Timestamp',
    flex: 3,
    valueGetter: (params) =>
      `${params.row.display_timestamp ? format(new Date(params.row.timestamp), 'yyyy-MM-dd HH:mm:ss OOOO') : 'No timestamp'}`
  },
  {
    field: 'student_score',
    headerName: 'Score',
    flex: 1,
    valueGetter: (params) =>
      `${params.row.score} / ${params.row.max_score}`,
  },
  {
    field: 'autograde',
    headerName: 'Autograde',
    flex: 1,
    renderCell: (params) => (
      <Button><BoltIcon /></Button>
    ),
  },
  {
    field: 'generate_feedback',
    headerName: 'Generate Feedback',
    flex: 1.5,
    renderCell: (params) => (
      <Button><FeedbackIcon /></Button>
    ),
  },
  {
    field: 'release_feedback',
    headerName: 'Release Feedback',
    flex: 1.5,
    renderCell: (params) => (
      <Button><ForwardToInboxIcon /></Button>
    ),
  }
];

export default function SubmissionsTable(props) {
  return (    
    <DataTable
      {...props}
      columns={columns}
    />    
  );
}