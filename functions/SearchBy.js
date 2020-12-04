/*
Search Db By:

Genre
Title
Actor
Director
Tag
GetMovieDetails
*/
const credentials = require('../credentials.json')
const mysql = require('mysql');

function mySQLConnection() {
    return mysql.createConnection({
      host: credentials.host,
      user: credentials.user,
      password: credentials.password,
      database: credentials.database
    });
}

db = mySQLConnection()
db.connect()

const GetMoviesByTitle = (title) => {
sql = 'SELECT * FROM Movies Where title = ' + db.escape(searchParam);
db.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    Data = new Array()
    result.forEach(element => {
        Data[Data.length] = element.Title;
    });
    return Data
    });
}

const GetMoviesByGenre = (genre) => {

}

const GetMoviesByDirector = (genre) => {

}

const GetMoviesByActor = (genre) => {

}

const GetMoviesByTag = (genre) => {

}

const GetMovieDetails = (id) => {

}


module.exports = {
    GetMoviesByTitle: GetMoviesByTitle,
    GetMoviesByGenre: GetMoviesByGenre,
    GetMoviesByDirector: GetMoviesByDirector,
    GetMoviesByActor: GetMoviesByActor,
    GetMoviesByTag: GetMoviesByTag,
    GetMovieDetails: GetMovieDetails
}