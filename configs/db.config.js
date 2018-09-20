require('dotenv');

const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/celebrities'

mongoose.connect(MONGO_URI);
mongoose.connection.on('connected', () => {
    console.info(`Connected to database: ${MONGO_URI}`);
});
mongoose.connection.on('error', (error) => {
    console.error('Database connection error:', error);
});
