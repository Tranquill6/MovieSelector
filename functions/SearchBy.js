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
        sql = ` SELECT m.Title, m.rtAllCriticsRating, d2.directorName, a.actorName, g.genre, t2.value
            FROM Movies AS m
            INNER JOIN Actors AS a
            INNER JOIN tags AS t1
            INNER JOIN directsin AS d1
            INNER JOIN movie_genres AS g
            INNER JOIN tagsTitles AS t2
            INNER JOIN movie_directors AS d2
            ON g.movieID = m.movieID AND a.movieID=m.movieID AND t1.movieID=m.movieID AND t1.tagID=t2.id AND d1.movieID=m.movieID AND d1.directorID=d2.directorID AND m.movieID='${id}';
        `
        db.query(sql, (err, result) => {
            if (err) throw err;
            Title = result[0].title
            Rating = result[0].rtAllCriticsRating
            Dir = result[0].directorName
            actorName = []
            genre = []
            tagName = []
            result.forEach(element => { 
                if(!actors.includes(element.actorname))
                    actors.push(element.actorname)
                if(!genres.includes(element.genre))
                    genres.push(element.genre)
                if(!tags.includes(element.TagName))
                    tags.push(element.TagName)
            });
            resolve(obj)
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