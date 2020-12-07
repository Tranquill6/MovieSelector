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
            console.log(result);
        })
        resolve(true)
    })
}

const removeComment = (id) => {
    return new Promise((resolve, reject) => {
        sql = `DELETE FROM Comments WHERE commentId='${id}'`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
        })
        resolve(true)
    })
}

module.exports = {
    makeComment: makeComment,
    removeComment: removeComment
}