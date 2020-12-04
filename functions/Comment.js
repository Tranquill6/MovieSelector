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
    sql = `INSERT INTO Comments('MovieId', 'content') VALUES (*${db.escape(movieID)}*,*${db.escape(text)}*)`;
    db.query(sql, (error, result) => {
        if (err) throw err;
        console.log(result);

    })
}

const removeComment = (id) => {
    sql = `DELETE FROM Comments WHERE commentId *${db.escape(id)}*`;
    db.query(sql, (error, result) => {
        if (err) throw err;
        console.log(result);
    })
}

const editComment = (id, text) => {
    sql = `UPDATE Comments SET content *${db.escape(text)}* WHERE commentId *${db.escape(id)}*`;
    db.query(sql, (error, result) => {
        if (err) throw err;
        console.log(result);
    })
}