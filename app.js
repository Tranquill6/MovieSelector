const express = require('express')
const app = express()
const path = require('path');
const { query } = require('express');

const port = process.env.PORT || 3000;
const Comment = require('./functions/Comment.js')
const Search = require('./functions/SearchBy.js')
const Rate = require('./functions/RateMovie.js')
const SimilarMovie = require('./functions/SimilarMovie.js')
const Database = require('./functions/Connect.js')

app.set("view engine", "pug")
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('search.pug')
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
                link: "/",
                msg: "There were no movies found with the given information!"
            }
            res.render('message.pug', Data)
        }
    })
})

app.get('/SimilarMovie/:movieId', (req, res)=> {
    movieId = req.params['movieId']
    SimilarMovie.GetMovie(movieId).then((RES) => {
        Search.GetMovieDetails(RES).then((results) => {
            try{
                Data = {
                    results: results,
                    id: RES
                }
                res.render('movie.pug', Data)
            }
            catch (err) {
                Data = {
                    link: "/",
                    msg: "Failed to Retrieve Movie"
                }
                res.render('message.pug', Data)
            }
        }).catch((err) => {
            Data = {
                link: "/",
                msg: "Failed to Retrieve Movie"
            }
            res.render('message.pug', Data)
        })
    })
})

app.get('/movie/:movieId', (req, res) => {
    movieId = req.params['movieId']
    Search.GetMovieDetails(movieId).then((results) => {
        try{
            Data = {
                results: results,
                id: movieId
            }
            res.render('movie.pug', Data)
        }
        catch (err) {
            Data = {
                link: "/",
                msg: "Failed to Retrieve Movie"
            }
            res.render('message.pug', Data)
        }
    }).catch((err) => {
        Data = {
            link: "/",
            msg: "Failed to Retrieve Movie"
        }
        res.render('message.pug', Data)
    })
})

app.get('/ratemovie/:movieId/:rating', (req, res) => {
    movieId = req.params['movieId']
    rating = req.params['rating']
    Rate.addRating(movieId, rating).then((results) => {
        Data = {
            link: `movie/${movieId}`,
            msg: "Your rating was counted!"
        }
        res.render('message.pug', Data)
    })
})

app.get('/comment/:movieId/:comment', (req, res) => {
    movieId = req.params['movieId']
    comment = req.params['comment']
    Comment.makeComment(comment, movieId).then((results) => {
        Data = {
            link: `movie/${movieId}`,
            msg: "Your comment was added!"
        }
        res.render('message.pug', Data)
    })
})

app.get('/delete/:content/:movieId', (req, res) => {
    movieId = req.params['movieId']
    content = req.params['content']
    Comment.removeComment(movieId, content).then((results) => {
        Data = {
            link: `movie/${movieId}`,
            msg: `Your comment was removed!`
        }
        res.render('message.pug', Data)
    })
})

app.get('*', (req, res) => {
    Data = {
        link: "/",
        msg: "Sorry, We Could Not Find what you were looking for!"
    }
    res.render('message.pug', Data)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})