const database = require('./connect.js')
const db = database.db

const GetMoviesBy = (type, param) => {
    return new Promise((resolve,reject) => {
        switch (type){
            case 'title':
                sql = `SELECT distinct title, movieId FROM Movies Where title LIKE '${param}'`;
                break;
            case 'genre':
                sql = `SELECT distinct m.title, m.movieId FROM Categorizes c, Movies m  WHERE  m.movieId = c.viewId AND c.genre = '${param}'`
                break;
            case 'actor':
                sql = `SELECT distinct m.title, m.movieId FROM Actors a, Movies m  WHERE  m.movieId = a.viewId AND a.actorName = '${param}'`
                break;
            case 'director':
                sql = `SELECT m.title, m.movieId FROM DirectsIn d, Movies m WHERE d.directorId = (SELECT directorId FROM Directors WHERE directorName = '${param}' LIMIT 1) AND m.movieId = d.viewId`
                break;
            case 'tag':
                sql = `SELECT m.title, m.movieId FROM Tags t, Movies m WHERE t.tagId = (SELECT tagId FROM tagTitles WHERE tagName = '${param}' LIMIT 1) AND m.movieId = t.viewId`
                break;
            default:
                sql = `SELECT distinct m.title, m.movieId FROM Movies Where title LIKE '${param}'`;
        }
        try{
            console.log(sql)
            _movies = new Array()
            returnDataObj = {}
            db.query(sql, (err, result) => {
                if(err) throw err
                result.forEach(element => {
                    obj = {
                    title: element.title,
                    id: element.movieId
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
    }).catch((err)=>{
        console.log(err)
    })
}

const GetMovieDetails = (id) => {
    return new Promise((resolve,reject) => {
        sql = `SELECT DISTINCT m.title, m.rtAllCriticsRating, d2.directorName, a.actorName, g.genre, t2.TagName
        FROM Movies AS m
        INNER JOIN Actors AS a
        INNER JOIN Tags AS t1
        INNER JOIN DirectsIn AS d1
        INNER JOIN Categorizes AS g
        INNER JOIN TagTitles AS t2
        INNER JOIN Directors AS d2
        ON g.movieId = m.movieId AND a.movieId=m.movieId AND t1.movieId=m.movieId AND t1.tagId=t2.tagId AND d1.movieId=m.movieId AND d1.directorId=d2.directorId AND m.movieId='${id}';
        `
        console.log(sql)
        db.query(sql, (err, result) => {
            if (err) throw err
            console.log(result)
            if(result.length != 0){
                Title = result[0].title
                Rating = result[0].rtAllCriticsRating
                Dir = result[0].directorName
                actors = []
                genres = []
                tags = []
                result.forEach(element => { 
                    if(!actors.includes(element.actorName))
                        actors.push(element.actorName)
                    if(!genres.includes(element.genre))
                        genres.push(element.genre)
                    if(!tags.includes(element.tagName))
                        tags.push(element.tagName)
                });
                obj = {
                    title: Title,
                    director: Dir,
                    actors: actors,
                    genres: genres,
                    rating: Rating,
                    tags: tags,
                }
            resolve(obj)
            }
        });
        obj = {
            title: '',
            director: '',
            actors: [],
            genres: [],
            rating: '',
            tags: [],
        }
        reject(obj)
    })
}

module.exports = {
    GetMoviesBy: GetMoviesBy,
    GetMovieDetails: GetMovieDetails
}