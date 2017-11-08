'use strict'
//////// Initialization //////////
const express = require('express');
const cors = require('cors');
const pg = require('pg');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL;

const client = new pg.Client(process.env.DATABASE_URL);

client.connect();
client.on('error', err => console.err(err));


////// Middleware ////////
app.use(cors());

app.get('/test', (req, res) => res.send('<h1>Hello, world.</h1>'));

app.get('/api/v1/books', (req, res) => {
  client.query(`SELECT book_id, title, author, image_url, isbn FROM books;`)
    .then (results => res.send(results.rows))
    .catch(console.error);
});

app.get('*', (req, res) => {
  res.redirect(CLIENT_URL);
})

loadDB();

app.listen(PORT, () => console.log(`listening on port: ${PORT}`))

////////////// DATABASE LOADERS ////////////////////////
////////////////////////////////////////////////////////

function loadBooks() {
  fs.readFile('../book-list-client/data/books.json', (err, fd) => {
    JSON.parse(fd.toString()).forEach(ele => {
      client.query(
        'INSERT INTO books(book_id, author, title, isbn, image_url, description) VALUES($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING',
        [ele.book_id, ele.author, ele.title, ele.isbn, ele.image_url, ele.description]
      )
        .catch(console.error)
    })
  })
}

function loadDB() {
  client.query(`
    CREATE TABLE IF NOT EXISTS
    books (
      book_id SERIAL PRIMARY KEY,
      author VARCHAR(50),
      title VARCHAR(250),
      isbn VARCHAR(255),
      image_url VARCHAR(255),
      description TEXT
    );`
  )
    .then(loadBooks)
    .catch(console.error);
}
