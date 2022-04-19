const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors({
    credential: true,
    origin: process.env.CLIENT_URL
}));

app.use('/api', router);
app.use(errorHandler);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {}, async () => {
            console.log('Database connected successfully!');
        });

        app.listen(PORT, () => {
            console.log(`Server has been started on localhost:${PORT}`);
        });
    } catch (e) {
        console.log('Error! Server is not running!');
        console.log('Message =>' + e.message);
    }
}

start();