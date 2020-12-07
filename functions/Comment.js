/*
communicate with comment db
add comment
remove comment
edit comment
*/
const mysql = require('mysql');
const database = require('./connect.js')
const db = database.db

const makeComment = (text, movieID) => {
    return new Promise((resolve, reject) => {
        sql = `INSERT INTO Comments(movieId, content) VALUES (${movieID},${db.escape(text)})`;
        db.query(sql, (err, result) => {
            if (err) throw err;
        })
        resolve(true)
    })
}

const removeComment = (movieId, content) => {
    return new Promise((resolve, reject) => {
        sql = `DELETE FROM Comments WHERE content='${content}' AND movieId='${movieId}'`;
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