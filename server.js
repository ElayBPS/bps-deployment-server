const express = require('express')

const bodyParser = require('body-parser')

const fs = require('fs')

const exec = require('child-process-promise').exec

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

server.post("/deploy", async (req,res) => {
    const secret = req.query.secret
    if (secret === "y2ocKkWgUM3pbisHLtbbwnDCoZddtT5D" && req.body.ref === 'refs/heads/master') {
        console.log(req.body)
        fs.writeFileSync(__dirname+'/gitupdate-'+Date.now()+'.json', JSON.stringify(req.body, null, '\t'))
        await exec('git clone '+ req.body.repository.clone_url)
        await exec('gcloud builds submit --tag gcr.io/bps-test-ay/'+req.body.repository.name, {cwd:__dirname+'/'+req.body.repository.name})
        await exec('gcloud beta run deploy --image gcr.io/bps-test-ay/'+req.body.repository.name, {cwd:__dirname+'/'+req.body.repository.name})
        fs.rmdirSync(__dirname+'/'+req.body.repository.name)
        res.sendStatus(200)
    }
    else {
        res.sendStatus(403)
    }
})

server.listen(PORT, () => {
    console.log('Server listening on port ' + PORT)
})