import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    TextField,
    Box,
    Chip,
    Avatar,
    IconButton,
    InputAdornment,
    Paper,
    Divider,
    useTheme,
    ThemeProvider,
    createTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import SummaryModal from './SummaryModal';

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
        grey: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#eeeeee',
            300: '#e0e0e0',
            400: '#bdbdbd',
            500: '#9e9e9e',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121',
        }
    },
    typography: {
        fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        h1: {
            fontWeight: 700,
        },
        h2: {
            fontWeight: 700,
        },
        h3: {
            fontWeight: 700,
        },
        h4: {
            fontWeight: 600,
        },
        h5: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
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
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                },
            },
        },
    },
});

const HomePage = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    const getBooks = async () => {
        try {
            const response = await axios.get('https://book-exchange-backend-phi.vercel.app/api/books');
            console.log(response.data);
            setBooks(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching books:', error);
            return [];
        }
    }

    useEffect(() => {
        getBooks();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredBooks = books.filter(book => {
        return book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.genre.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
    }
    return (
        <ThemeProvider theme={monochromeTheme}>
            <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <AppBar position="static" elevation={0} color="primary">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                            <MenuBookIcon sx={{ mr: 1.5 }} />
                            BOOKSWAP
                        </Typography>

                        {
                            !user ? (
                                <>
                                    <Button color="inherit" sx={{ mr: 1 }} onClick={() => navigate('/login')}>Sign in</Button>
                                    <Button variant="outlined" color="secondary" onClick={() => navigate('/register')}>Register</Button>
                                </>) : (
                                <>
                                    <Typography variant="h6" component="div" >Logged in as {user.name} </Typography>

                                    <Button color="inherit" variant='outlined' sx={{ mx: 1 }} onClick={handleLogout}>Logout</Button>
                                </>
                            )
                        }


                    </Toolbar>
                </AppBar>

                <Box sx={{
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    py: { xs: 6, md: 10 },
                    borderBottom: '1px solid #333'
                }}>
                    <Container maxWidth="md">
                        <Typography
                            variant="h2"
                            component="h1"
                            align="center"
                            gutterBottom
                            sx={{
                                fontWeight: 800,
                                letterSpacing: '-0.02em',
                                mb: 2
                            }}
                        >
                            Exchange Books,<br />Exchange Ideas
                        </Typography>
                        <Typography
                            variant="h6"
                            align="center"
                            paragraph
                            sx={{
                                mb: 5,
                                opacity: 0.8,
                                maxWidth: '700px',
                                mx: 'auto'
                            }}
                        >
                            A minimalist platform for book lovers to connect and swap books in their community
                        </Typography>

                        <Paper
                            component="form"
                            elevation={0}
                            sx={{
                                p: 1,
                                display: 'flex',
                                mx: 'auto',
                                maxWidth: 600,
                                border: '2px solid #ffffff',
                                borderRadius: 2,
                                bgcolor: 'rgba(255,255,255,0.1)'
                            }}
                        >
                            <InputAdornment position="start" sx={{ pl: 1 }}>
                                <SearchIcon sx={{ color: 'white' }} />
                            </InputAdornment>
                            <TextField
                                fullWidth
                                variant="standard"
                                placeholder="Search by title, author or genre..."
                                InputProps={{
                                    disableUnderline: true,
                                    style: { color: 'white' }
                                }}
                                value={searchTerm}
                                onChange={handleSearch}
                                sx={{
                                    '& ::placeholder': {
                                        color: 'rgba(255,255,255,0.7)',
                                        opacity: 1
                                    }
                                }}
                            />
                        </Paper>
                    </Container>
                </Box>

                <Container maxWidth="lg" sx={{ my: 6, flexGrow: 1 }}>
                    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <Box>
                            <Typography variant="h4" component="h2" sx={{ fontWeight: 700 }}>
                                Available Books
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {filteredBooks.length} books found
                            </Typography>
                        </Box>
                        <Box>
                            {
                                user && user.role === 'Owner' && (
                                    <Button variant="contained" color="primary" onClick={() => navigate('/add-book')}>Add Book</Button>
                                )
                            }
                            <Button
                                color="inherit"
                                sx={{ ml: 2 }}
                                onClick={() => setOpenModal(true)}
                                variant="outlined"
                            >
                                Generate Summary
                            </Button>
                        </Box>
                    </Box>
                    <hr />
                    <Container maxWidth="lg" sx={{ py: 5 }}>
                        <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {filteredBooks.length > 0 ? (
                                filteredBooks.map((book) => {
                                    const user = JSON.parse(localStorage.getItem("user"));
                                    const isOwner = user && book.owner?._id === user._id;
                                    return (
                                        <Grid item key={book._id} xs={12} sm={6} md={4} lg={3} sx={{ flexGrow: 1 }}>
                                            <Card
                                                sx={{
                                                    height: "100%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    borderRadius: 2,
                                                    overflow: "hidden",
                                                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                                                    position: "relative",
                                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                                    "&:hover": {
                                                        transform: "translateY(-6px)",
                                                        boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                                                    },
                                                    background: "#ffffff",
                                                    border: "1px solid #f0f0f0",
                                                }}
                                            >
                                                {/* Cover image area with monochrome background */}
                                                <Box
                                                    sx={{
                                                        height: 160,
                                                        background: book.status === "Available"
                                                            ? "#000000"
                                                            : "#e0e0e0",
                                                        position: "relative",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    <MenuBookIcon sx={{
                                                        fontSize: 60,
                                                        color: book.status === "Available" ? "#ffffff" : "#888888"
                                                    }} />

                                                    {/* Status Badge */}
                                                    {book.status === "Available" ? (
                                                        <Box
                                                            sx={{
                                                                position: "absolute",
                                                                top: 16,
                                                                right: 16,
                                                                background: "#ffffff",
                                                                color: "#000000",
                                                                fontWeight: 700,
                                                                fontSize: "0.75rem",
                                                                py: 0.7,
                                                                px: 1.5,
                                                                borderRadius: 1,
                                                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                                            }}
                                                        >
                                                            Available
                                                        </Box>
                                                    ) : (
                                                        <Box
                                                            sx={{
                                                                position: "absolute",
                                                                top: 16,
                                                                right: 16,
                                                                background: "#000000",
                                                                color: "#ffffff",
                                                                fontWeight: 700,
                                                                fontSize: "0.75rem",
                                                                py: 0.7,
                                                                px: 1.5,
                                                                borderRadius: 1,
                                                            }}
                                                        >
                                                            Unavailable
                                                        </Box>
                                                    )}
                                                </Box>

                                                <CardContent sx={{ flexGrow: 1, pt: 3, pb: 2 }}>
                                                    {/* Title */}
                                                    <Typography
                                                        variant="h6"
                                                        component="div"
                                                        sx={{
                                                            fontWeight: 700,
                                                            fontSize: "1.1rem",
                                                            lineHeight: 1.3,
                                                            mb: 1,
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            display: "-webkit-box",
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: "vertical",
                                                            color: "#000000",
                                                        }}
                                                    >
                                                        {book.title}
                                                    </Typography>

                                                    {/* Author */}
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{
                                                            mb: 2.5,
                                                            display: "flex",
                                                            alignItems: "center",
                                                            color: "#555555",
                                                        }}
                                                    >
                                                        <PersonIcon
                                                            fontSize="small"
                                                            sx={{ mr: 1, color: "#555555" }}
                                                        />
                                                        <span style={{
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            whiteSpace: "nowrap",
                                                            maxWidth: "100%"
                                                        }}>
                                                            {book.author}
                                                        </span>
                                                    </Typography>

                                                    <Divider sx={{ my: 2, backgroundColor: "#e5e5e5" }} />

                                                    {/* Info Row */}
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                            mb: 2.5,
                                                        }}
                                                    >
                                                        {/* Genre Chip */}
                                                        <Chip
                                                            label={book.genre}
                                                            size="small"
                                                            sx={{
                                                                fontWeight: 600,
                                                                borderRadius: 1,
                                                                bgcolor: "#f5f5f5",
                                                                color: "#000000",
                                                                border: "1px solid #e0e0e0",
                                                            }}
                                                        />

                                                        {/* Location */}
                                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                                            <LocationOnIcon
                                                                fontSize="small"
                                                                sx={{ mr: 0.5, color: "#555555" }}
                                                            />
                                                            <Typography
                                                                variant="body2"
                                                                sx={{ fontWeight: 500, color: "#555555" }}
                                                            >
                                                                {book.city}
                                                            </Typography>
                                                        </Box>
                                                    </Box>

                                                    {/* Owner Controls with monochrome styling */}
                                                    {isOwner && (
                                                        <Box
                                                            sx={{
                                                                mt: 1,
                                                                mb: 1,
                                                                p: 1.5,
                                                                backgroundColor: "#f7f7f7",
                                                                borderRadius: 1,
                                                                border: "1px solid #e0e0e0",
                                                            }}
                                                        >
                                                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: "#000000" }}>
                                                                Owner Controls
                                                            </Typography>
                                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                                <Switch
                                                                    size="small"
                                                                    checked={book.status === "Available"}
                                                                    sx={{
                                                                        '& .MuiSwitch-switchBase.Mui-checked': {
                                                                            color: "#000000",
                                                                        },
                                                                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                                            backgroundColor: "#000000",
                                                                        },
                                                                    }}
                                                                    onChange={async (e) => {
                                                                        const newStatus = e.target.checked ? "Available" : "Rented/Exchanged";
                                                                        try {
                                                                            await axios.put(
                                                                                `https://book-exchange-backend-phi.vercel.app/api/books/${book._id}`,
                                                                                { status: newStatus },
                                                                                {
                                                                                    headers: {
                                                                                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                                                                                        "Content-Type": "application/json",
                                                                                    },
                                                                                }
                                                                            );
                                                                            getBooks();
                                                                        } catch (error) {
                                                                            console.error("Failed to update status", error);
                                                                        }
                                                                    }}
                                                                />
                                                                <Typography variant="body2" color="#555555">Visibility</Typography>
                                                            </Box>
                                                        </Box>
                                                    )}
                                                </CardContent>

                                                {/* Action Button */}
                                                <CardActions
                                                    sx={{
                                                        p: 2,
                                                        pt: 0,
                                                    }}
                                                >
                                                    <Button
                                                        variant={book.status === "Available" ? "contained" : "outlined"}
                                                        fullWidth
                                                        disableElevation
                                                        sx={{
                                                            fontWeight: 600,
                                                            textTransform: "none",
                                                            borderRadius: 1,
                                                            py: 1.2,
                                                            backgroundColor: book.status === "Available" ? "#000000" : "transparent",
                                                            color: book.status === "Available" ? "#ffffff" : "#000000",
                                                            borderColor: "#000000",
                                                            "&:hover": {
                                                                backgroundColor: book.status === "Available" ? "#333333" : "rgba(0,0,0,0.04)",
                                                                borderColor: "#000000",
                                                            },
                                                        }}
                                                        startIcon={book.status === "Available" ? <PhoneIcon /> : <BlockIcon />}
                                                        disabled={book.status !== "Available"}
                                                    >
                                                        {book.status === "Available" ? `Contact: +91 ${book.contact}` : "Not Available"}
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    );
                                })
                            ) : (
                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            p: 6,
                                            textAlign: "center",
                                            border: "1px solid #e0e0e0",
                                            borderRadius: 2,
                                            backgroundColor: "#f9f9f9",
                                        }}
                                    >
                                        <SearchOffIcon sx={{ fontSize: 60, color: "#888888", mb: 2 }} />
                                        <Typography variant="h5" fontWeight={700} gutterBottom color="#000000">
                                            No books found
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            color="#555555"
                                            sx={{ mt: 1, mb: 3, maxWidth: 500, mx: "auto" }}
                                        >
                                            We couldn't find any books matching your search criteria. Try different keywords or browse all available books.
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            disableElevation
                                            sx={{
                                                mt: 2,
                                                borderRadius: 1,
                                                px: 4,
                                                py: 1,
                                                fontWeight: 600,
                                                textTransform: "none",
                                                backgroundColor: "#000000",
                                                color: "#ffffff",
                                                "&:hover": {
                                                    backgroundColor: "#333333",
                                                }
                                            }}
                                            onClick={() => setSearchTerm("")}
                                            startIcon={<RefreshIcon />}
                                        >
                                            View All Books
                                        </Button>
                                    </Box>
                                </Grid>
                            )}
                        </Grid>
                    </Container>

                </Container>

                <Box
                    component="footer"
                    sx={{
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        p: 4,
                        mt: 'auto'
                    }}
                >
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                                    <MenuBookIcon sx={{ mr: 1.5 }} />
                                    BOOKSWAP
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
                                    A minimalist platform for book lovers
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                                    © 2025 BookSwap. All rights reserved.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>

                <SummaryModal
                    isOpen={openModal}
                    onClose={() => setOpenModal(false)}
                    books={books}
                />
            </Box>
        </ThemeProvider>
    );
};

export default HomePage;