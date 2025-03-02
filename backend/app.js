const express = require('express');
require('dotenv').config()
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoutes')

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();

app.use(express.json());
app.use('/api/auth', authRoute);

app.listen(PORT, (req, res) => {
    console.log(`Server is now start at PORT ${PORT}`);
})