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
        sql = `SELECT rtAllCriticsRating, rtAllCriticsNumReviews FROM Movies WHERE movieId=${db.escape(id)}`
        console.log(sql)
        db.query(sql, (err, result) => {
            if (err) throw err
            rating = parseFloat(result[0].rtAllCriticsRating)
            numOfReviews = parseInt(result[0].rtAllCriticsNumReviews)
            console.log(rating)
            console.log(numOfReviews)
            newRating = (rating*numOfReviews+parseFloat(userRating))/(numOfReviews+1)
            finalRating = newRating.toFixed(1)
            numOfReviews += 1
            console.log(finalRating)
            console.log(numOfReviews)

            sql = `UPDATE Movies SET rtAllCriticsRating='${finalRating}', rtAllCriticsNumReviews='${numOfReviews}' WHERE movieId='${id}'`
            db.query(sql, (err, result) => {
                if (err) throw err
                console.log(result)
            }) 
        })
        resolve("true")
    })
}

module.exports = {
    addRating: addRating
}