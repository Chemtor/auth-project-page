const express = require('express');
require('dotenv').config()

const app = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT, (req, res) => {
    console.log(`Server is now start at PORT ${PORT}`);
})