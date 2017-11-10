'use strict'
//////// Initialization //////////
const express = require('express');
const cors = require('cors');
const pg = require('pg');
const fs = require('fs');
const bodyParser = require('body-parser').urlencoded({extended: true});

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL;

const client = new pg.Client(process.env.DATABASE_URL);

client.connect();
client.on('error', err => console.error(err));


////// Middleware ////////
app.use(cors());
app.get('/', (req, res) => res.send('<h1>Hello, world.</h1>'));

app.get('/api/v1/books', (req, res) => {
  client.query(`SELECT book_id, title, author, image_url, isbn FROM books;`)
    .then (results => res.send(results.rows))
    .catch(console.error);
});

app.get('/api/v1/books/:id', (req, res) => {
  client.query(`SELECT * FROM books WHERE book_id=${req.params.id}`)
    .then (results => res.send(results.rows))
    .then(results => res.send(console.log(results.rows)))
    .catch(console.error)
})

app.put('/api/v1/books/:id', (req, res) => {
  let {book_id, title, author, isbn, image_url, description} = req.body;
  client.query(
    `UPDATE books
    Set
    title=$1, author=$2, isbn=$3, image_url=$4, description=$5
    WHERE book_id=${req.params.id}`,
    [title, author, isbn, image_url, description, book_id]
  )
    .then(results => res.sendStatus(201))
    .catch(console.error)
})

app.post('/api/v1/books', bodyParser, (req, res) => {
  let {book_id, title, author, isbn, image_url, description} = req.body;
  client.query(`
    INSERT INTO books(book_id, title, author, isbn, image_url, description) VALUES($1, $2, $3, $4, $5, $6)`,
    [book_id, title, author, isbn, image_url, description]
  )
    .then(results => res.sendStatus(201))
    .catch(console.error)
})

app.delete('/api/v1/books/:id', (req, res) => {
  client.query(`DELETE FROM books WHERE book_id=${req.params.id}`)
    .then(results => res.sendStatus(204))
    .catch(console.log('deleted'));
});

app.get('*', (req, res) =>res.redirect(CLIENT_URL));

//loadDB();

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
