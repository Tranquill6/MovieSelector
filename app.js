const express = require('express')
const path = require('path');
const mysql = require('mysql');
const { query } = require('express');
const app = express()
const port = process.env.PORT || 3000;
const { check, validationResult } = require('express-validator');

function mySQLConnection() {
    return mysql.createConnection({
      host: '',
      user: '',
      password: '',
      database: ''
    });
}

db = mySQLConnection()
db.connect()

app.set("view engine", "pug")
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index.pug')
})

app.get('/Search', (req, res) => {
    res.render('search.pug')
})

app.get('/Results', async (req, res) => {
    searchParam = req.query.param
    searchType = req.query.type

    //
    // Add Switch case and search bar value validation in the future
    //

    sql = 'SELECT * FROM Movies Where title = ' + db.escape(searchParam);
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        pass = new Array()
        result.forEach(element => {
            pass[pass.length] = element.Title;
        });
        res.render('results', pass)
    });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//(style="background-color:#abc4c4")