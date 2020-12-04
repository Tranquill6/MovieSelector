const express = require('express')
const app = express()
const path = require('path');
const { query } = require('express');

const port = process.env.PORT || 3000;
const { check, validationResult } = require('express-validator');
const Comment = require('./functions/Comment.js')
const Search = require('./functions/SearchBy.js')
const Rate = require('./functions/RateMovie.js')
const SimilarMovie = require('./functions/SimilarMovie.js')
const Database = require('./functions/Connect.js')
const db = Database.db

app.set("view engine", "pug")
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index.pug')
})

app.get('/Search', (req, res) => {
    res.render('search.pug')
})

app.get('/Results', async (req, res) => {
    searchParam = req.query.param
    searchType = req.query.type
})

app.get('/movie/:movieId', (req, res) => {
    movieId = req.params['movieId']
    res.render('search.pug')
})

app.get('/example/:title', async (req, res) => {
    title = req.params['title']
    Search.GetMoviesBy('title',title).then( (results) => {
        res.send(results)
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function getColour(username, roomCount) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT hexcode FROM colours WHERE precedence = ?",
        [roomCount],
        (err, result) => {
          return err ? reject(err) : resolve(result[0].hexcode);
        }
      );
    });
  }