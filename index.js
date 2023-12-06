const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/test', (req, res, next) => {
    res.send('OK');
});

app.listen(PORT, () => {
    console.log('Server is listening on', PORT, 'port...');
});