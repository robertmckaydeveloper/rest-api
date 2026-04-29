import { useActionState, useEffect, useState } from 'react';
import { getCustomers } from '../api/customerApi';
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, 
    TableRow, Paper, Typography, CircularProgress, Alert 
} from '@mui/material';

const CustomerList = () => {
    const[customers, setCustomers] = useState([]);
    const[loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCustomers()
            .then((data) => {
                setCustomers(data);
                setLoading(false);
            })
            .catch((err) =>  {
                console.error("Fetch error:", err);
                setError("Failed to load customers.");
                setLoading(false);
            });
    }, [])

    if (loading) return <CircularProgress sx={{ display: 'block', m: '50px auto' }} />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Typography variant="h5" sx={{ p: 2, fontWeight: 'bold' }}>
                Customer Directory
            </Typography>
            <Table sx={{ minWidth: 650 }}>
                <TableHead sx={{ backgroundColor: 'primary.main' }}>
                    <TableRow>
                        <TableCell sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}>ID</TableCell>
                        <TableCell sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}>Name</TableCell>
                        <TableCell sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}>Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customers.map((customer) => (
                        <TableRow 
                            key={customer.id} 
                            hover
                            sx={{
                                '&:nth-of-type(even)': { backgroundColor: 'action.hover' },
                                '&:last-child td, &:last-child th': { border: 0 }
                            }}
                        >
                            <TableCell>{customer.id}</TableCell>
                            <TableCell>{customer.name}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CustomerList;