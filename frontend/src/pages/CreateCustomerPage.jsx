import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCustomer } from '../api/customerApi';
import Navbar from '../components/Navbar';
import { Container, Paper, Typography, TextField, Button, Box, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';

const CreateCustomerPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        createCustomer(formData)
            .then(() => {
                setSubmitting(false);
                navigate('/customers'); // Redirect back to list on success
            })
            .catch((err) => {
                console.error("Creation error:", err);
                setError(err.response?.data?.message || "Failed to create customer record.");
                setSubmitting(false);
            });
    };

    return (
        <>
            <Navbar />
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                {/* Back Link Button */}
                <Button 
                    startIcon={<ArrowBackIcon />} 
                    onClick={() => navigate('/customers')}
                    sx={{ mb: 2 }}
                >
                    Back to Directory
                </Button>

                <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                        Create New Customer
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            startIcon={<SaveIcon />}
                            disabled={submitting}
                            sx={{ mt: 4, py: 1.2 }}
                        >
                            {submitting ? "Saving Record..." : "Save Customer"}
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </>
    );
};

export default CreateCustomerPage;
