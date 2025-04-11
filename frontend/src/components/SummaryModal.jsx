import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    TextField,
    CircularProgress,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    IconButton,
    Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BookIcon from '@mui/icons-material/Book';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import axios from 'axios';

const SummaryModal = ({ isOpen, onClose, books }) => {
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedBook, setSelectedBook] = useState('');
    const [bookTitles, setBookTitles] = useState([]);

    // Extract book titles from books prop
    useEffect(() => {
        if (books && books.length > 0) {
            const titles = books.map(book => book.title);
            setBookTitles(titles);
        }
    }, [books]);

    const handleBookChange = (event) => {
        setSelectedBook(event.target.value);
        // Clear previous summary when book changes
        setSummary('');
    };

    const handleGenerateSummary = async () => {
        if (!selectedBook) return;
        
        setLoading(true);
        try {
            const response = await axios.post('https://book-exchange-backend-phi.vercel.app/api/ai', {
                booktitle: selectedBook
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            setSummary(response.data.text || 'No summary available');
        } catch (error) {
            console.error('Error generating summary:', error);
            setSummary('Failed to generate summary. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog 
            open={isOpen} 
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                    overflow: 'hidden'
                }
            }}
        >
            <DialogTitle sx={{ 
                bgcolor: '#000000', 
                color: '#ffffff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2.5
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <AutoStoriesIcon />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Book Summary Generator
                    </Typography>
                </Box>
                <IconButton 
                    edge="end" 
                    color="inherit" 
                    onClick={onClose} 
                    aria-label="close"
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            
            <DialogContent sx={{ p: 4 }}>
                <Typography variant="body1" sx={{ mb: 3 }}>
                    Select a book title and generate a comprehensive summary with a single click.
                </Typography>
                
                <Box sx={{ mb: 4 }}>
                    <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
                        <InputLabel id="book-select-label">Book Title</InputLabel>
                        <Select
                            labelId="book-select-label"
                            id="book-select"
                            value={selectedBook}
                            onChange={handleBookChange}
                            label="Book Title"
                            disabled={loading || bookTitles.length === 0}
                            startAdornment={<BookIcon sx={{ color: 'action.active', mr: 1 }} />}
                            sx={{ 
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'rgba(0, 0, 0, 0.23)',
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'rgba(0, 0, 0, 0.87)',
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: '#000000',
                                }
                            }}
                        >
                            {bookTitles.length === 0 ? (
                                <MenuItem disabled value="">
                                    <em>No books available</em>
                                </MenuItem>
                            ) : (
                                bookTitles.map((title) => (
                                    <MenuItem key={title} value={title}>
                                        {title}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                    </FormControl>
                    
                    <Button
                        variant="contained"
                        onClick={handleGenerateSummary}
                        disabled={loading || !selectedBook}
                        fullWidth
                        size="large"
                        sx={{
                            bgcolor: '#000000',
                            '&:hover': {
                                bgcolor: '#333333'
                            },
                            py: 1.5
                        }}
                        startIcon={loading ? null : <AutoStoriesIcon />}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Summary'}
                    </Button>
                </Box>
                
                {summary && (
                    <Box sx={{ mt: 3 }}>
                        <Divider sx={{ mb: 3 }} />
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <BookIcon />
                            Summary for "{selectedBook}"
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={6}
                            value={summary}
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                                sx: {
                                    bgcolor: '#f8f8f8',
                                    borderRadius: 1,
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(0, 0, 0, 0.12)',
                                    }
                                }
                            }}
                        />
                    </Box>
                )}
            </DialogContent>
            
            <DialogActions sx={{ p: 3, borderTop: '1px solid #e0e0e0', justifyContent: 'space-between' }}>
                <Typography variant="caption" color="text.secondary">
                    Summaries are AI-generated and may vary in accuracy
                </Typography>
                <Button 
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        color: '#000000',
                        borderColor: '#000000',
                        '&:hover': {
                            bgcolor: 'rgba(0,0,0,0.04)',
                            borderColor: '#000000'
                        }
                    }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SummaryModal;