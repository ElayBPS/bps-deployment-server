const express = require('express')

const server = express()

const PORT = process.env.PORT || 80

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