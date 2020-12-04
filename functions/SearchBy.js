/*
Search Db By:
    -Genre
    -Title
    -Actor
    -Director
    -Tag
    -GetMovieDetails
*/
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
        obj = {
            movieData: [],
            comments: []
        }
        return obj
    })
}

const GetDirectors = (id) => {

}
const GetActors = (id) => {
    
}
const GetGenres = (id) => {
    sql = ` SELECT distinct( c.genre ) 
    FROM Categorizes c, Movies m  
    WHERE "${id}" = c.viewId
    `
}
const GetTags = (id) => {
 
}
const GetComments = (id) => {
    
}
module.exports = {
    GetMoviesBy: GetMoviesBy,
    GetMovieDetails: GetMovieDetails
}