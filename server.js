const express = require('express')

const bodyParser = require('body-parser')

const server = express()

const PORT = process.env.PORT || 80

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    res.header("Access-Control-Expose-Headers", "Content-Type, Content-Length")
    res.header("Access-Control-Allow-Credentials", true)
    next()
})

server.use(bodyParser.urlencoded({
    extended: true,
}))

server.use(bodyParser.json())

server.post("/deploy", (req,res) => {
    const secret = req.query.secret
    if (secret === "y2ocKkWgUM3pbisHLtbbwnDCoZddtT5D") {
        console.log(req.body)
        res.sendStatus(200)
    }
    else {
        res.sendStatus(403)
    }
})

server.listen(PORT, () => {
    console.log('Server listening on port ' + PORT)
})