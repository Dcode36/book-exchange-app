const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { GoogleGenAI } = require('@google/genai');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

dotenv.config();
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.post('/api/ai', async (req, res) => {
  const { booktitle } = req.body;
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Generate a book summary for the following book: ${booktitle}. Make sure to include the author, the main characters, and the plot. and length of the summary should be 300 words.`,
  });
  res.json({ text: response.text });
});
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
