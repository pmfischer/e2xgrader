import React from 'react';
import { Chip } from '@mui/material';

export default function AssignmentStatus(props) {
    const colors = {
        'draft': 'primary',
        'released': 'success'
    }
    return (
        <Chip label={props.status} color={colors[props.status]} />
    );
}