const express = require('express');
const notesRouter = require('./notesRoutes');
const app = express();
const PORT = process.env.PORT || 8080;

app.use('/notes', notesRouter);

app.listen(PORT, () => {
    console.log('Server is listening on', PORT, 'port...');
});