/*
Search Db By:
    -Genre
    -Title
    -Actor
    -Director
    -Tag
    -GetMovieDetails
*/
const credentials = require('../credentials.json')
const mysql = require('mysql');
const database = require('./connect.js')
const db = database.db

const GetMoviesByTitle = (title) => {
    sql = `SELECT distinct * FROM Movies Where title LIKE *${db.escape(searchParam)}*`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        _movies = new Array()
        result.forEach(element => {
            obj = {
                title: element.Title,
                id: element.MovieId
            }
            _movies[_movies.length] = obj
        });
        returnDataObj = {
            movies: _movies
        }
        return returnDataObj
    });
    returnDataObj = {
        movies: []
    }
    return returnDataObj
}

const GetMoviesByGenre = (genre) => {
    sql = `SELECT distinct * FROM Movies Where title LIKE *${db.escape(searchParam)}*`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        _movies = new Array()
        result.forEach(element => {
            obj = {
                title: element.Title,
                id: element.MovieId
            }
            _movies[_movies.length] = obj
        });
        returnDataObj = {
            movies: _movies
        }
        return returnDataObj
    });
    returnDataObj = {
        movies: []
    }
    return returnDataObj
}

const GetMoviesByDirector = (genre) => {
    sql = `SELECT distinct * FROM Movies Where title LIKE *${db.escape(searchParam)}*`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        _movies = new Array()
        result.forEach(element => {
            obj = {
                title: element.Title,
                id: element.MovieId
            }
            _movies[_movies.length] = obj
        });
        returnDataObj = {
            movies: _movies
        }
        return returnDataObj
    });
    returnDataObj = {
        movies: []
    }
    return returnDataObj
}

const GetMoviesByActor = (genre) => {
    sql = `SELECT distinct * FROM Movies Where title LIKE *${db.escape(searchParam)}*`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        _movies = new Array()
        result.forEach(element => {
            obj = {
                title: element.Title,
                id: element.MovieId
            }
            _movies[_movies.length] = obj
        });
        returnDataObj = {
            movies: _movies
        }
        return returnDataObj
    });
    returnDataObj = {
        movies: []
    }
    return returnDataObj
}

const GetMoviesByTag = (genre) => {
    sql = `SELECT distinct * FROM Movies Where title LIKE *${db.escape(searchParam)}*`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        _movies = new Array()
        result.forEach(element => {
            obj = {
                title: element.Title,
                id: element.MovieId
            }
            _movies[_movies.length] = obj
        });
        returnDataObj = {
            movies: _movies
        }
        return returnDataObj
    });
    returnDataObj = {
        movies: []
    }
    return returnDataObj
}

const GetMovieDetails = (id) => {
    sql = `SELECT distinct * FROM Movies Where title LIKE *${db.escape(searchParam)}*`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        _movies = new Array()
        result.forEach(element => {
            obj = {
                title: element.Title,
                id: element.MovieId
            }
            _movies[_movies.length] = obj
        });
        returnDataObj = {
            movies: _movies
        }
        return returnDataObj
    });
    returnDataObj = {
        movies: []
    }
    return returnDataObj
}

module.exports = {
    GetMoviesByTitle: GetMoviesByTitle,
    GetMoviesByGenre: GetMoviesByGenre,
    GetMoviesByDirector: GetMoviesByDirector,
    GetMoviesByActor: GetMoviesByActor,
    GetMoviesByTag: GetMoviesByTag,
    GetMovieDetails: GetMovieDetails
}