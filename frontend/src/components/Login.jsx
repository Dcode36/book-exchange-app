import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Avatar,
    Link,
    IconButton,
    InputAdornment,
    Divider,
    useTheme,
    ThemeProvider,
    createTheme
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// Custom monochrome theme matching the landing page
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
    divider: '#e0e0e0'
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

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('https://book-exchange-backend-phi.vercel.app/api/auth/login', {
                email: formData.email,
                password: formData.password
            });
    
            console.log('Login successful:', response.data);
    
            // You can store the token in localStorage/sessionStorage if required
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/');
            // Redirect or update UI
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
            // Optionally show error to user
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <ThemeProvider theme={monochromeTheme}>
            <Box sx={{ 
                minHeight: '100vh', 
                display: 'flex', 
                backgroundImage: 'linear-gradient(45deg, #f5f5f5 25%, #eeeeee 25%, #eeeeee 50%, #f5f5f5 50%, #f5f5f5 75%, #eeeeee 75%, #eeeeee 100%)',
                backgroundSize: '40px 40px'
            }}>
                <Container maxWidth="xs" sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    py: 4
                }}>
                    <Paper 
                        elevation={4} 
                        sx={{ 
                            width: '100%',
                            overflow: 'hidden',
                            border: '1px solid',
                            borderColor: 'divider',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                        }}
                    >
                        <Box sx={{ 
                            bgcolor: 'primary.main', 
                            color: 'primary.contrastText',
                            py: 4,
                            px: 2,
                            textAlign: 'center'
                        }}>
                            <Box 
                                sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    mb: 2
                                }}
                            >
                                <MenuBookIcon sx={{ fontSize: 32, mr: 1 }} />
                                <Typography 
                                    variant="h5" 
                                    component="div" 
                                    sx={{ fontWeight: 700, letterSpacing: 1 }}
                                >
                                    BOOKSWAP
                                </Typography>
                            </Box>
                            <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
                                Sign in to your account
                            </Typography>
                        </Box>

                        <Box sx={{ p: 4 }}>
                            <Box component="form" onSubmit={handleSubmit}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={formData.email}
                                    onChange={handleChange}
                                    variant="outlined"
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    autoComplete="current-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={toggleShowPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                
                                <Box sx={{ textAlign: 'right', mt: 1 }}>
                                    <Link href="/forgot-password" variant="body2" underline="hover">
                                        Forgot password?
                                    </Link>
                                </Box>
                                
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ 
                                        mt: 3, 
                                        mb: 2,
                                        py: 1.5,
                                        fontSize: '1rem',
                                        fontWeight: 600
                                    }}
                                >
                                    Sign In
                                </Button>
                                
                                <Divider sx={{ my: 3 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        OR
                                    </Typography>
                                </Divider>
                                
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        Don't have an account?
                                    </Typography>
                                    <Button
                                        href="/register"
                                        variant="outlined"
                                        fullWidth
                                        sx={{ 
                                            mb: 2,
                                            py: 1.5,
                                            fontSize: '1rem'
                                        }}
                                    >
                                        Create Account
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default Login;