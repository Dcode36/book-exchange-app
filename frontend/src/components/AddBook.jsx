import React, { useState } from 'react';
import axios from 'axios';
import { 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Paper, 
  Container,
  MenuItem,
  InputAdornment,
  Snackbar,
  Alert,
  CircularProgress,
  Divider,
  IconButton,
  ThemeProvider,
  createTheme
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TitleIcon from '@mui/icons-material/Title';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

// Define genres for the dropdown
const genres = [
  'Fiction',
  'Non-Fiction',
  'Science Fiction',
  'Fantasy',
  'Mystery',
  'Thriller',
  'Romance',
  'Biography',
  'History',
  'Self-Help',
  'Business',
  'Children',
  'Young Adult',
  'Poetry',
  'Science',
  'Technology',
  'Art',
  'Philosophy',
  'Religion',
  'Other'
];

// Custom monochrome theme matching the rest of the app
const monochromeTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
      light: '#333333',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffffff',
      light: '#ffffff',
      dark: '#cccccc',
      contrastText: '#000000',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
    divider: '#e0e0e0',
    success: {
      main: '#4caf50',
    },
    error: {
      main: '#f44336',
    }
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 22px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
          marginBottom: '20px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

const AddBook = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        city: '',
        contact: '',
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [loading, setLoading] = useState(false);
    
    // In a real implementation, you would use react-router's useNavigate
    const navigate = useNavigate ? useNavigate() : () => {};

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(
                'https://book-exchange-backend-phi.vercel.app/api/books',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Y4MjBkMzA0NDdiNzdjZmZiZDAwMGYiLCJyb2xlIjoiT3duZXIiLCJpYXQiOjE3NDQzMTQ2ODksImV4cCI6MTc0NDMxODI4OX0.PcztAm3JQHbHyLxlqZ6VRsHc6qVVVzL3Zjx0h6hxI9g'}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            setSnackbarMessage('Book added successfully!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            
            // Reset form
            setFormData({
                title: '',
                author: '',
                genre: '',
                city: '',
                contact: '',
            });
        } catch (error) {
            console.error('Error adding book:', error);
            setSnackbarMessage('Failed to add book. Please try again.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const goBack = () => {
        navigate(-1);
    };

    return (
        <ThemeProvider theme={monochromeTheme}>
            <Box sx={{ 
                minHeight: '100vh', 
                display: 'flex', 
                flexDirection: 'column',
                backgroundImage: 'linear-gradient(45deg, #f5f5f5 25%, #eeeeee 25%, #eeeeee 50%, #f5f5f5 50%, #f5f5f5 75%, #eeeeee 75%, #eeeeee 100%)',
                backgroundSize: '40px 40px',
                py: 4
            }}>
                <Container maxWidth="sm">
                    <Paper elevation={4} sx={{ 
                        width: '100%',
                        overflow: 'hidden',
                        border: '1px solid',
                        borderColor: 'divider',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                    }}>
                        <Box sx={{ 
                            bgcolor: 'primary.main', 
                            color: 'primary.contrastText',
                            py: 3,
                            px: 3,
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <IconButton 
                                sx={{ 
                                    color: 'white',
                                    mr: 2
                                }}
                                onClick={goBack}
                            >
                                <ArrowBackIcon />
                            </IconButton>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <MenuBookIcon sx={{ fontSize: 28, mr: 1.5 }} />
                                <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
                                    Add New Book
                                </Typography>
                            </Box>
                        </Box>
                        
                        <Container sx={{ py: 4 }}>
                            <Box component="form" onSubmit={handleSubmit}>
                                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                                    Book Details
                                </Typography>
                                <Divider sx={{ mb: 3 }} />
                                
                                <TextField
                                    label="Book Title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <TitleIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    placeholder="Enter the title of the book"
                                    sx={{ mb: 2.5 }}
                                />
                                
                                <TextField
                                    label="Author"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    placeholder="Enter the author's name"
                                    sx={{ mb: 2.5 }}
                                />
                                
                                <TextField
                                    select
                                    label="Genre"
                                    name="genre"
                                    value={formData.genre}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CategoryIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    helperText="Please select the book's genre"
                                    sx={{ mb: 3.5 }}
                                >
                                    {genres.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                
                                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 500 }}>
                                    Location & Contact Information
                                </Typography>
                                <Divider sx={{ mb: 3 }} />
                                
                                <TextField
                                    label="City"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LocationCityIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    placeholder="Enter your city"
                                    sx={{ mb: 2.5 }}
                                />
                                
                                <TextField
                                    label="Contact Number"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <ContactPhoneIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    placeholder="Enter your contact number"
                                    sx={{ mb: 3.5 }}
                                />
                                
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={loading}
                                    fullWidth
                                    size="large"
                                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AddCircleOutlineIcon />}
                                    sx={{ 
                                        py: 1.5,
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        mt: 2
                                    }}
                                >
                                    {loading ? 'Adding Book...' : 'Add Book'}
                                </Button>
                            </Box>
                        </Container>
                    </Paper>
                    
                    <Box sx={{ textAlign: 'center', mt: 3 }}>
                        <Button
                            variant="outlined"
                            onClick={goBack}
                            sx={{ px: 4 }}
                        >
                            Back to Books
                        </Button>
                    </Box>
                </Container>
                
                <Snackbar 
                    open={openSnackbar} 
                    autoHideDuration={6000} 
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert 
                        onClose={handleCloseSnackbar} 
                        severity={snackbarSeverity} 
                        sx={{ width: '100%' }}
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </ThemeProvider>
    );
};

export default AddBook;