const express = require('express')
const path = require('path');
const app = express()
const port = process.env.PORT || 3000;

app.set("view engine", "pug")
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'files')));

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//(style="background-color:#abc4c4")