const database = require('./connect.js')
const db = database.db

const GetMovie = (id) => {
    return new Promise( async (resolve,reject) => {
        sql = `SELECT t1.movieId
            FROM Tags t1
            WHERE t1.tagId IN (SELECT t1.tagId FROM Tags t1, TagTitles t2 WHERE ${id} = t1.movieId AND t2.tagId = t1.tagId AND MOD(t1.tagId,2) != 1) AND t1.movieId != ${id} LIMIT 1`
        const ID = await new Promise((rslv, rjct) => db.query(sql, (err, result) => {
            if (err) throw err
            rslv(result[0].movieId)
            rjct(result[0].movieId)
        }))
        resolve(ID)
    })
}


module.exports = {
    GetMovie: GetMovie
}
