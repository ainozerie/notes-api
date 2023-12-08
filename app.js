const express = require('express');
const bodyParser = require('body-parser');
const notesRouter = require('./notesRoutes');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/notes', notesRouter);

app.listen(PORT, () => {
    console.log('Server is listening on', PORT, 'port...');
});