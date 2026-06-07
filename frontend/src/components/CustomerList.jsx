import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCustomers, deleteCustomer } from '../api/customerApi';
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, TextField, TableRow, 
    Paper, Typography, CircularProgress, Alert, Button, Box, InputAdornment, IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search'
import DeleteIcon from '@mui/icons-material/Delete'

const CustomerList = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer record?")) {
        deleteCustomer(id)
            .then(() => {
                setCustomers(prevCustomers => prevCustomers.filter(customer => customer.id !== id));
            })
            .catch((err) => {
                console.error("Deletion failed:", err);
                alert("Failed to delete the customer record.");
            });
    }
};


    useEffect(() => {
        setLoading(true);
        const delayDebounceFn = setTimeout(() => {
            getCustomers(searchTerm)
                .then((data) => {
                    setCustomers(data || []);
                    setLoading(false);
                })
                .catch((err) =>  {
                    console.error("Fetch error:", err);
                    setError("Failed to load customers.");
                    setLoading(false);
                });
        }, 300); 
        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm]);

    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <TextField
                    label="Search Customers"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Type a name..."
                    sx={{ width: 300, backgroundColor: 'white' }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/customers/new')}
                >
                    Add Customer
                </Button>
            </Box>

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
                            <TableCell sx={{ color: 'primary.contrastText', fontWeight: 'bold' }} align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                                    <CircularProgress size={24} />
                                </TableCell>
                            </TableRow>
                        ) : customers.length > 0 ? (
                            customers.map((customer) => (
                                <TableRow 
                                    key={customer.id} 
                                    hover
                                    sx={{
                                        '&:nth-of-type(even)': { backgroundColor: 'action.hover' },
                                        '&:hover': {backgroundColor: 'rgba(25, 118, 210, 0.08) !important', cursor: 'pointer'},
                                        '&:last-child td, &:last-child th': { border: 0 }
                                    }}
                                >
                                    <TableCell>{customer.id}</TableCell>
                                    <TableCell>{customer.name}</TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                    <TableCell align="right">
                                        <IconButton 
                                            color="error" 
                                            onClick={() => handleDelete(customer.id)}
                                            title="Delete Customer"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                                    No customers found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default CustomerList;
