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
    Search.GetMoviesBy(searchType,searchParam).then( (results) => {
        Data = results
        if(Data.movies.length != 0){
            res.render('results.pug', Data)
        } else {
            Data = {
                msg: "There were no movies found with the given information!"
            }
            res.render('message.pug', Data)
        }
    })
})

app.get('/movie/:movieId', (req, res) => {
    movieId = req.params['movieId']
    res.render('search.pug')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})