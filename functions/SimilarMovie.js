const database = require('./connect.js')
const db = database.db

const GetMovie = (id) => {
    sql = `SELECT t1.viewID
    FROM Tags t1
    WHERE t1.tagID IN (SELECT t1.tagID FROM Tags t1, TagTitles t2 WHERE ${id} = t1.viewID AND t2.TagId = t1.tagID AND MOD(t1.tagID,2) != 1) AND t1.viewID != ${id} LIMIT 1`
}

module.exports = {
    GetMovie: GetMovie
}
