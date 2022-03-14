const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser')

// routes import
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// routes
app.use('/user', authRoutes);
app.use(postRoutes);

mongoose.connect(
    '',
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(result => {
        app.listen(8080)
    })
    .catch(err => {
        console.log(err);
    })