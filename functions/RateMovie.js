/*
communicate with rating db
add rating
? calculate new rating
*/
const mysql = require('mysql');
const database = require('./connect.js')
const db = database.db

const addRating = (id, userRating) => {
    return new Promise((resolve,reject) => {
        sql = `SELECT rtAllCriticsRating, rtAllCriticsNumReviews FROM Movies WHERE movieId='${db.escape(id)}'`
        db.query(sql, (err, result) => {
            if (err) throw err
            rating = result.rtAllCriticsRating
            numOfReviews = result.rtAllCriticsNumReviews

            newRating = (rating*numOfReviews+userRating)/(numOfReviews+1)
            finalRating = newRating.toFixed(1)

            sql = `UPDATE Movies SET rtAllCriticsRating='${db.escape(finalRating)}', rtAllCriticsNumReviews='${db.escape(numOfReviews+1)}' WHERE movieId='${db.escape(id)}'`
            db.query(sql, (err, result) => {
                if (err) throw err
                console.log(result)
            })
        })
    })
}