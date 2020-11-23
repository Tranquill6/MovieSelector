const express = require('express')
const path = require('path');
const mysql = require('mysql');
const app = express()
const port = process.env.PORT || 3000;

function mySQLConnection() {
    return mysql.createConnection({
      host: 'washington.uww.edu',
      user: 'redfernm09',
      password: 'rr9004',
      database: 'c366-2207_redfernrm09'
    });
}

app.set("view engine", "pug")
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index.pug')
})

app.get('/Search', (req, res) => {
    res.render('search.pug')
})

app.get('/Results', (req, res) => {
    searchParam = req.query.param
    searchType = req.query.type
    //call database
    //database results => array or json object named results
    results = [searchParam, searchType]
    res.render('results.pug', results)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//(style="background-color:#abc4c4")