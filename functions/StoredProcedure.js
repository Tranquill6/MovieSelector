const database = require('./connect.js')
const db = database.db

const getMovieCount = () => {
    return new Promise((resolve, reject) => {
        sql = `
        drop procedure if exists getMovieCount;

        DELIMITER //

        CREATE PROCEDURE getMovieCount()
        BEGIN
            SELECT COUNT(distinct(Title))
            FROM Movies;
        END //

        DELIMITER ;
        `
        db.query(sql, (err, result) => {
            if (err) throw err;
            sql = 'CALL getMovieCount;'
            db.query(sql, (err, result) => {
                if (err) throw err;
            })
        })
        resolve(true)
    })
}

const getActorCount = () => {
    return new Promise((resolve, reject) => {
        sql = `
        DROP PROCEDURE IF EXISTS getActorCount;

        DELIMITER //

        CREATE PROCEDURE getActorCount()
        BEGIN
            SELECT COUNT(DISTINCT(actorName))
            FROM Actors;
        END //

        DELIMITER ;
        `
        db.query(sql, (err, result) => {
            if (err) throw err;
            sql = 'CALL getActorCount;'
            db.query(sql, (err, result) => {
                if (err) throw err;
            })
        })
        resolve(true)
    })
}

const getGenre = () => {
    return new Promise((resolve, reject) => {
        sql = `
        DROP PROCEDURE IF EXISTS getGenres;

        DELIMITER // 

        CREATE PROCEDURE getGenres()
        BEGIN
            SELECT Genre
            FROM Categorizes;
        END //

        DELIMITER ;
        `
        db.query(sql, (err, result) => {
            if (err) throw err;
            sql = 'CALL getGenre;'
            db.query(sql, (err, result) => {
                if (err) throw err;
            })
        })
        resolve(true)
    })
}

module.exports = {
    getMovieCount: getMovieCount,
    getActorCount: getActorCount,
    getGenre: getGenre
}