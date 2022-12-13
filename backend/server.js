const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())

app.get("/beers", (req, res) => {
    res.sendFile(path.join(`${__dirname}/beers.json`))
})

app.listen(9000, () => console.log("http://127.0.0.1:9000"))