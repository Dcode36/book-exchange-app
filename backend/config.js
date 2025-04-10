module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'your-jwt-secret-key',
    MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/book-exchange'
  };
  