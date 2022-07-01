import React from 'react';

import { Link } from 'react-router-dom';

import DataTable from './DataTable';


const pathJoin = window.pathJoin;

const columns = [
  {
    field: 'id',
    headerName: 'Student ID',
    flex: 2,
    renderCell: (params) => (<Link to={pathJoin(['/e2xgrader', 'students', params.row.id])}>{params.row.id}</Link>)
  },
  {
    field: 'fullName',
    headerName: 'Student Name',
    flex: 4,
    valueGetter: (params) =>
      `${params.row.first_name || 'None'} ${params.row.last_name || 'None'}`,
  },
  {
    field: 'email',
    headerName: 'E-Mail',
    flex: 3,
    valueGetter: (params) =>
      `${params.row.email || 'None'}`,
  },
  {
    field: 'score',
    headerName: 'Total Score',
    flex: 1,
  },
  {
    field: 'max_score',
    headerName: 'Max Score',
    flex: 1,
  },
];

export default function StudentsTable(props) {
  return (    
    <DataTable
      {...props}
      columns={columns}
    />    
  );
}