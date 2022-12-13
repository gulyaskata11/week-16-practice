const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()

app.use(express.json())

app.get("/beers", (req, res) => {
    res.sendFile(path.join(`${__dirname}/beers.json`))
})

app.post("/beers/add", (req, res) => {
    console.log(req.body)
    fs.readFile(`${__dirname}/beers.json`, (err, data) => {
        if(err) {
            console.log(err)
            return res.status(500).send(err)
        } else {
            let beersData = JSON.parse(data)

            let newBeer = {
                "name": req.body.name,
                "tagline": req.body.tagline,
                "abv": Number(req.body.abv)
            }
            beersData.push(newBeer)

            fs.writeFile(`${__dirname}/beers.json`, JSON.stringify(beersData, null, 4), (error) => {
                if(error) {
                    console.log(error)
                } else {
                    return res.status(200).json(newBeer)
                }
            })
        }
    })
})

app.delete("/beers/del/:name", (req, res) => {
    console.log(req.params.name)
    fs.readFile(`${__dirname}/beers.json`, (err, data) => {
        if(err) {
            console.log(err)
            return res.status(500).send(err)
        } else {
            let beersData = JSON.parse(data)

            let index = beersData.findIndex(beer => beer.name === req.params.name)
            beersData.splice(index, 1)

            fs.writeFile(`${__dirname}/beers.json`, JSON.stringify(beersData, null, 4), (error) => {
                if(error) {
                    console.log(error)
                } else {
                    return res.status(200).json({res:"ok"})
                }
            })
        }
    })
})

app.delete("/beers/del/abv/:abv", (req, res) => {
    console.log(Number(req.params.abv))

    fs.readFile(`${__dirname}/beers.json`, (err, data) => {
        if(err) {
            console.log(err)
            return res.status(500).send(err)
        } else {
            let beersData = JSON.parse(data)
            
            beersData.filter(beer => beer.abv === Number(req.params.abv)).forEach(beer => beersData.splice(beersData.indexOf(beer), 1));

            console.log(beersData)

            fs.writeFile(`${__dirname}/beers.json`, JSON.stringify(beersData, null, 4), (error) => {
                if(error) {
                    console.log(error)
                } else {
                    return res.status(200).json({res:"ok"})
                }
            })
        }
    })
})

app.listen(9000, () => console.log("http://127.0.0.1:9000"))