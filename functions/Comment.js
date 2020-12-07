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
        sql = `INSERT INTO Comments('MovieId', 'content') VALUES (*${db.escape(movieID)}*,*${db.escape(text)}*)`;
        db.query(sql, (error, result) => {
            if (err) throw err;
            console.log(result);
        })
    })
}

const removeComment = (id) => {
    return new Promise((resolve, reject) => {
        sql = `DELETE FROM Comments WHERE commentId *${db.escape(id)}*`;
        db.query(sql, (error, result) => {
            if (err) throw err;
            console.log(result);
        })
    })
}
// Removing this feature

const editComment = (id, text) => {
    return new Promise((resolve, reject) => {
        sql = `UPDATE Comments SET content *${db.escape(text)}* WHERE commentId *${db.escape(id)}*`;
        db.query(sql, (error, result) => {
            if (err) throw err;
            console.log(result);
        })
    })
}

module.exports = {
    makeComment: makeComment,
    removeComment: removeComment,
    editComment: editComment
}