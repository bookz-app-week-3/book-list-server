const express = require('express');
const cors = require('cors');
const pg = require('pg');

const app = express();
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

const client = new pg.Client(process.env.DATABASE_URL);

// client.connect();
// client.on('error', err => console.err(err));

app.use(cors());

app.get('/test', (req, res) => res.send('<h1>Hello, world.</h1>'));

app.listen(PORT, () => console.log(`listening on port: ${PORT}`))
