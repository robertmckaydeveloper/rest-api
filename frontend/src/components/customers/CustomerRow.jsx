import React from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CustomerRow = ({ customer, onDelete }) => {
    return (
        <TableRow 
            hover
            sx={{
                '&:nth-of-type(even)': { backgroundColor: 'action.hover' },
                '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.08) !important', cursor: 'pointer' },
                '&:last-child td, &:last-child th': { border: 0 }
            }}
        >
            <TableCell>{customer.id}</TableCell>
            <TableCell>{customer.name}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell align="right">
                <IconButton 
                    color="error" 
                    onClick={(e) => {
                        e.stopPropagation(); // Safe! Keeps the parent row from triggering a click event
                        onDelete(customer.id);
                    }}
                    title="Delete Customer"
                >
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default CustomerRow;