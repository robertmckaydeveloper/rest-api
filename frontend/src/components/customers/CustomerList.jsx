import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCustomers, deleteCustomer } from '../../api/customerApi';
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
    Paper, Typography, CircularProgress, Alert, Box 
} from '@mui/material';
import SearchBar from './SearchBar';
import CustomerRow from './CustomerRow';

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
                    setCustomers(prev => prev.filter(c => c.id !== id));
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
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box sx={{ width: '100%' }}>
            <SearchBar 
                searchTerm={searchTerm} 
                onSearchChange={setSearchTerm} 
                onAddClick={() => navigate('/customers/new')} 
            />

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
                                <CustomerRow 
                                    key={customer.id} 
                                    customer={customer} 
                                    onDelete={handleDelete} 
                                />
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