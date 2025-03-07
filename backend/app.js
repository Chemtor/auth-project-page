const express = require('express');
require('dotenv').config()
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoutes')
const userRoute = require('./routes/userRoutes')
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);

app.listen(PORT, (req, res) => {
    console.log(`Server is now start at PORT ${PORT}`);
})