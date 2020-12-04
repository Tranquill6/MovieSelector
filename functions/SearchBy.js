const mysql = require('mysql');
const database = require('./connect.js')
const db = database.db

const GetMoviesBy = (type, param) => {
    return new Promise((resolve,reject) => {
        try{
            sql = `SELECT distinct * FROM Movies Where ${type} LIKE '${param}'`;
            console.log(sql)
            _movies = new Array()
            returnDataObj = {}
            db.query(sql, (err, result) => {
                result.forEach(element => {
                    obj = {
                    title: element.Title,
                    id: element.MovieId
                }
                _movies.push(obj)
                });
                console.log(_movies)
                returnDataObj = {
                    movies: _movies
                }
                console.log(returnDataObj)
                resolve(returnDataObj)
            });
        }
        catch{
            Data = {
                movies: []
            }
            reject(Data)
        }
    })
}

const GetMovieDetails = (id) => {
    return new Promise((resolve,reject) => {
        sql = "Silver bullet"
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            result.forEach(element => { 
                obj = {
                    title: element.title,
                    director: element.director,
                    actors: element.actors,
                    genres: element.genres,
                    rating: element.ratings,
                    tags: element.tags,
                    comments: element.content
                }
                resolve(obj)
            });
        });
        obj = {
            title: '',
            director: '',
            actors: [],
            genres: [],
            rating: '',
            tags: [],
            comments: []
        }
        reject(obj)
    })
}

module.exports = {
    GetMoviesBy: GetMoviesBy,
    GetMovieDetails: GetMovieDetails
}