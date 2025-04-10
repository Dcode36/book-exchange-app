import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    IconButton,
    InputAdornment,
    ThemeProvider,
    createTheme,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Divider,
    Stepper,
    Step,
    StepLabel
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();

    const steps = ['Account Info', 'Profile Details'];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post('https://book-exchange-backend-phi.vercel.app/api/auth/register', {
                name: formData.name,
                mobile: formData.mobile,
                email: formData.email,
                password: formData.password,
                role: formData.role
            });

            if (res.status === 200 || res.status === 201) {
                alert("Account created successfully!");
                navigate('/login');
            }
        } catch (err) {
            console.error("Registration error:", err);
            alert(err?.response?.data?.message || "Registration failed");
        }
    };

    return (
        <ThemeProvider theme={monochromeTheme}>
            <Box sx={{ 
                minHeight: '100vh', 
                display: 'flex', 
                backgroundImage: 'linear-gradient(45deg, #f5f5f5 25%, #eeeeee 25%, #eeeeee 50%, #f5f5f5 50%, #f5f5f5 75%, #eeeeee 75%, #eeeeee 100%)',
                backgroundSize: '40px 40px',
                py: 4
            }}>
                <Container maxWidth="sm" sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
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
                            py: 3,
                            px: 2,
                            textAlign: 'center',
                            position: 'relative'
                        }}>
                            {activeStep > 0 && (
                                <IconButton 
                                    sx={{ 
                                        position: 'absolute', 
                                        left: 16, 
                                        top: '50%', 
                                        transform: 'translateY(-50%)',
                                        color: 'white' 
                                    }}
                                    onClick={handleBack}
                                >
                                    <ArrowBackIcon />
                                </IconButton>
                            )}
                            <Box 
                                sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    mb: 1
                                }}
                            >
                                <MenuBookIcon sx={{ fontSize: 28, mr: 1 }} />
                                <Typography 
                                    variant="h5" 
                                    component="div" 
                                    sx={{ fontWeight: 700, letterSpacing: 1 }}
                                >
                                    BOOKSWAP
                                </Typography>
                            </Box>
                            <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
                                Create your account
                            </Typography>
                        </Box>

                        <Box sx={{ width: '100%', p: 2 }}>
                            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>

                        <Box component="form" onSubmit={handleSubmit} sx={{ p: 4, pt: 2 }}>
                            {activeStep === 0 ? (
                                <>
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
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        autoComplete="new-password"
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
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        autoComplete="new-password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={toggleShowConfirmPassword}
                                                        edge="end"
                                                    >
                                                        {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ 
                                                py: 1.2,
                                                px: 4,
                                                fontSize: '1rem'
                                            }}
                                        >
                                            Continue
                                        </Button>
                                    </Box>
                                </>
                            ) : (
                                <>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Full Name"
                                        name="name"
                                        autoComplete="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="mobile"
                                        label="Mobile Number"
                                        name="mobile"
                                        autoComplete="tel"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        inputProps={{ maxLength: 10 }}
                                    />
                                    <FormControl fullWidth margin="normal" required>
                                        <InputLabel id="role-label">I want to</InputLabel>
                                        <Select
                                            labelId="role-label"
                                            id="role"
                                            name="role"
                                            value={formData.role}
                                            label="I want to"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="Owner">Share my books (Owner)</MenuItem>
                                            <MenuItem value="Seeker">Borrow books (Seeker)</MenuItem>
                                        </Select>
                                    </FormControl>
                                    
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ 
                                            mt: 4, 
                                            mb: 2,
                                            py: 1.5,
                                            fontSize: '1rem',
                                            fontWeight: 600
                                        }}
                                    >
                                        Create Account
                                    </Button>
                                </>
                            )}
                            
                            <Divider sx={{ my: 3 }} />
                            
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="body2" color="text.secondary">
                                    Already have an account?
                                </Typography>
                                <Button
                                    href="/login"
                                    variant="outlined"
                                    sx={{ 
                                        mt: 1,
                                        width: '60%'
                                    }}
                                >
                                    Sign In
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default RegisterPage;
