const database = require('./connect.js')
const db = database.db

const GetMoviesBy = (type, param) => {
    return new Promise((resolve,reject) => {
        switch (type){
            case 'title':
                sql = `SELECT distinct title, movieId FROM Movies Where title LIKE '%${param}%'`;
                break;
            case 'genre':
                sql = `SELECT distinct m.title, m.movieId FROM Categorizes c, Movies m  WHERE  m.movieId = c.movieId AND c.genre = '${param}'`
                break;
            case 'actor':
                sql = `SELECT distinct m.title, m.movieId FROM Actors a, Movies m  WHERE  m.movieId = a.movieId AND a.actorName LIKE '%${param}%'`
                break;
            case 'director':
                sql = `SELECT m.title, m.movieId FROM DirectsIn d, Movies m WHERE d.directorId = (SELECT directorId FROM Directors WHERE directorName = '${param}' LIMIT 1) AND m.movieId = d.movieId`
                break;
            case 'tag':
                sql = `SELECT m.title, m.movieId FROM Tags t, Movies m WHERE t.tagId = (SELECT tagId FROM TagTitles WHERE tagName = '${param}' LIMIT 1) AND m.movieId = t.movieId`
                break;
            default:
                sql = `SELECT distinct m.title, m.movieId FROM Movies Where title LIKE '${param}'`;
        }
        try{
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
                returnDataObj = {
                    movies: _movies
                }
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

const GetMovieDetails = async (id) => {
    return new Promise( async (resolve,reject) => { 
        sql = `SELECT DISTINCT m.title, m.rtAllCriticsRating, d2.directorName, a.actorName, g.genre, t2.tagName, c.content
        FROM Movies AS m
        INNER JOIN Actors AS a
        INNER JOIN Tags AS t1
        INNER JOIN DirectsIn AS d1
        INNER JOIN Categorizes AS g
        INNER JOIN TagTitles AS t2
        INNER JOIN Directors AS d2
        INNER JOIN Comments AS c
        ON g.movieId = '${id}' AND a.movieId='${id}' AND t1.movieId='${id}' AND t1.tagId=t2.tagId AND d1.movieId='${id}' AND d1.directorId=d2.directorId AND m.movieId='${id}' AND (c.movieId = '${id}' OR c.movieId = 'null')
        `
        const rows = await new Promise((rslv, rjct) => db.query(sql, (err, result) => {
            if (err) throw err
            if(result.length != 0){
                Title = result[0].title
                Rating = result[0].rtAllCriticsRating
                Dir = result[0].directorName
                actors = []
                genres = []
                tags = []
                comments = []
                result.forEach(element => { 
                    if(!actors.includes(element.actorName))
                        actors.push(element.actorName)
                    if(!genres.includes(element.genre))
                        genres.push(element.genre)
                    if(!tags.includes(element.tagName))
                        tags.push(element.tagName)
                    if(!comments.includes(element.content))
                        comments.push(element.content)
                });
                val = comments.pop()
                comments[0] = val
                if(val == ''){
                    comments = []
                }
                obj = {
                    title: Title,
                    director: Dir,
                    actors: actors,
                    genres: genres,
                    rating: Rating,
                    tags: tags,
                    comments: comments
                }
                rslv(obj)
            }
        obj = {
            title: '',
            director: '',
            actors: [],
            genres: [],
            rating: '',
            tags: [],
            comments: []
        }
        rjct(obj)
    }))
    resolve(rows)
    })
}

module.exports = {
    GetMoviesBy: GetMoviesBy,
    GetMovieDetails: GetMovieDetails
}