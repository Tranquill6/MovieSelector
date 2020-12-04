const database = require('./connect.js')
const db = database.db

const GetMoviesBy = (type, param) => {
    return new Promise((resolve,reject) => {
        switch (type){
            case 'title':
                sql = `SELECT distinct Title, MovieId FROM Movies Where Title LIKE '${param}'`;
                break;
            case 'genre':
                sql = `SELECT distinct m.Title, m.MovieId FROM Categorizes c, Movies m  WHERE  m.MovieId = c.viewId AND c.genre = '${param}'`
                break;
            case 'actor':
                sql = `SELECT distinct m.Title, m.MovieId FROM Actors a, Movies m  WHERE  m.MovieId = a.viewId AND a.ActorName = '${param}'`
                break;
            case 'director':
                sql = `SELECT m.Title, m.MovieId FROM DirectsIn d, Movies m WHERE d.directorID = (SELECT directorID FROM Directors WHERE directorName = '${param}' LIMIT 1) AND m.MovieId = d.viewID`
                break;
            case 'tag':
                sql = `SELECT m.Title, m.MovieId FROM Tags t, Movies m WHERE t.tagID = (SELECT TagId FROM TagTitles WHERE TagName = '${param}' LIMIT 1) AND m.MovieId = t.viewID`
                break;
            default:
                sql = `SELECT distinct m.Title, m.MovieId FROM Movies Where Title LIKE '${param}'`;
        }
        try{
            console.log(sql)
            _movies = new Array()
            returnDataObj = {}
            db.query(sql, (err, result) => {
                if(err) throw err
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