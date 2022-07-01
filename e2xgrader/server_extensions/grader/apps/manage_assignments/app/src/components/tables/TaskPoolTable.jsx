import React from 'react';

import { Link } from 'react-router-dom';

import DataTable from './DataTable';

const pathJoin = window.pathJoin;

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 2,
    renderCell: (params) => (<Link to={pathJoin(['/e2xgrader', 'pools', params.row.name])}>{params.row.name}</Link>)
  },
  {
    field: 'tasks',
    headerName: '# Tasks',
    flex: 1,
  },
];

export default function TaskPoolTable(props) {
  return (    
    <DataTable
      {...props}
      columns={columns}
      getRowId={(row) => row.name}
    />    
  );
}