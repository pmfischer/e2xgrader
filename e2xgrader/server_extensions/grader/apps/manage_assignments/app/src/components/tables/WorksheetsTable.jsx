import React from 'react';

import { Link } from 'react-router-dom';

import DataTable from './DataTable';

const pathJoin = window.pathJoin;

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 2,
    renderCell: (params) => (<Link to={pathJoin(['/e2xgrader', 'worksheets', params.row.name])}>{params.row.name}</Link>)
  },
  {
    field: 'num_submissions',
    headerName: '# Submissions',
    flex: 1,
  },
  {
    field: 'max_score',
    headerName: 'Max Score',
    flex: 1,
  },
  {
    field: 'average_score',
    headerName: 'Average Score',
    flex: 1,
    valueGetter: (params) =>
      `${Math.round(params.row.average_score*100)/100}`
  },
];

export default function WorksheetsTable(props) {
  return (    
    <DataTable
      {...props}
      columns={columns}
    />    
  );
}