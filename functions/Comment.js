/*
communicate with comment db
add comment
remove comment
edit comment
*/
const database = require('./connect.js')
const db = database.db

const makeComment = (text, movieID) => {
    return new Promise((resolve, reject) => {
        sql = `INSERT INTO Comments(content) VALUES (${db.escape(text)})`
        db.query(sql, (err, result) => {
            if (err) throw err;
            sql = `INSERT INTO Belongs(movieId) VALUES (${movieID})`
            db.query(sql, (err, result) => {
                if (err) throw err;
            })
        })
        resolve(true)
    })
}

const removeComment = (movieId, content) => {
    return new Promise((resolve, reject) => {
        sql = `DELETE FROM Comments c, Belongs b WHERE c.content='${content}' AND c.commentId=b.commentId AND b.movieId=''${movieId}'`;
        db.query(sql, (err, result) => {
            if (err) throw err;
        })
        resolve(true)
    })
}

module.exports = {
    makeComment: makeComment,
    removeComment: removeComment
}