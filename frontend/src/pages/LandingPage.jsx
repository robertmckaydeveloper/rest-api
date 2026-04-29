import React from 'react';
import { Box, Button, Container, Typography, Paper, Stack } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import keycloak from "../auth/keycloak";

const LandingPage = () => {
    return (
        <Box 
            sx={{ 
                minHeight: '100vh', 
                display: 'flex', 
                alignItems: 'center', 
                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)' 
            }}
        >
            <Container maxWidth="sm">
                <Paper 
                    elevation={6} 
                    sx={{ p: 5, textAlign: 'center', borderRadius: 4 }}
                >
                    <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Customer CRM
                    </Typography>
                    
                    <Typography variant="h6" color="text.secondary" paragraph>
                        A secure, enterprise-grade portal for managing your directory. 
                        Powered by Keycloak and Spring Boot.
                    </Typography>
                    <Button 
                        variant="contained" 
                        size="large" 
                        startIcon={<LoginIcon />}
                        onClick={() => keycloak.login()}
                        sx={{ marginTop: '2rem' }}
                    >
                        Sign In
                    </Button>
                </Paper>
            </Container>
        </Box>
    );
};

export default LandingPage;