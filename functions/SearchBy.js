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

const GetMoviesBy = (type, param) => {
    sql = `SELECT distinct * FROM Movies Where ${type} *${db.escape(param)}*`;
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
    sql = `SELECT distinct * FROM Movies Where MovieId *${db.escape(id)}*`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        result.forEach(element => {
            data = [element.Title, element.RtAllCriticsRating]
            data.push(GetDirectors(id))
            data.push(GetActors(id))
            data.push(GetGenres(id))
            data.push(GetTags(id))
            comment = GetComments(id)
            obj = {
                movieData: data,
                comments: comment
            }
            return obj
        });
    });
    returnDataObj = {
        movies: []
    }
    return returnDataObj
}

module.exports = {
    GetMoviesBy: GetMoviesBy,
    GetMovieDetails: GetMovieDetails
}