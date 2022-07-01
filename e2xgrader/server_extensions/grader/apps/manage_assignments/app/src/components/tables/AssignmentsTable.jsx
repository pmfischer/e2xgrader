import React from 'react';

import { Link } from 'react-router-dom';

import format from 'date-fns/format';

import DataTable from './DataTable';

import AssignmentStatus from '../assignment/AssignmentStatus';

const pathJoin = window.pathJoin;

const columns = [
  {
    field: 'name',
    headerName: 'Assignment Name',
    width: 160,
    flex: 2,
    renderCell: (params) => (<Link to={pathJoin(['/e2xgrader', 'assignments', params.row.name])}>{params.row.name}</Link>)
  },
  {
    field: 'duedate',
    headerName: 'Due Date',
    width: 250,
    flex: 2,
    valueGetter: (params) =>
      `${params.row.duedate !== null ? format(new Date(params.row.duedate), 'yyyy-MM-dd HH:mm:ss OOOO') : 'None'}`
  },
  {
    field: 'status',
    headerName: 'Status',
    renderCell: (params) => (<AssignmentStatus status={params.row.status} />),
    flex: 1
  },
];

export default function AssignmentsTable(props) {  
  return (
    <DataTable
        {...props}
        columns={columns}
        getRowId={(row) => row.id !== null ? row.id : row.name}
    />    
  );
}