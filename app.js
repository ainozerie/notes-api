require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const notesRouter = require('./notesRoutes');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/notes', notesRouter);

mongoose
    .connect(process.env.DB_URI)
    .then(() => {
        console.log('DB connected succesfully!')
        app.listen(PORT, () => {
            console.log('Server has started!');
        });
    });