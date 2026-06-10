import React from 'react';
import { Box, TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const SearchBar = ({ searchTerm, onSearchChange, onAddClick }) => {
    return (
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <TextField
                label="Search Customers"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
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
                onClick={onAddClick}
            >
                Add Customer
            </Button>
        </Box>
    );
};

export default SearchBar;