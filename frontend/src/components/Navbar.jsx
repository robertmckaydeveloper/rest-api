import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuth } from "../auth/KeycloakProvider";

const Navbar = () => {
    const { keycloak } = useAuth();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
                    Customer Portal
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2}}>
                    <Typography variant="body1">
                        {keycloak?.tokenParsed?.preferred_username}
                    </Typography>
                    <Button color="inherit" variant="outlined" onClick={() => keycloak.logout()}>
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;