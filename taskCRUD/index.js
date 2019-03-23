const express = require('express');
const app = express();
const mongoose = require('./config/db');
const port = 3001;

const { routes } = require('./config/routes');


app.use(express.json());

app.use('/', routes);

app.listen(port, () => {
    console.log(`listening on port:${port}`);
});