const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')
const Identities = require('orbit-db-identity-provider')
const express = require('express')
const app = express()
const port = 8080

app.use(express.json())


// optional settings for the ipfs instance
const ipfsOptions = {
    EXPERIMENTAL: {
      pubsub: true
    },
  }

//identity for OrbitDB instance
const options = { id: 'GTW_Feed' }



async function main() {
    const ipfs = await IPFS.create(ipfsOptions)
    const identity = await Identities.createIdentity(options)
    const orbitdb = await OrbitDB.createInstance(ipfs, { identity: identity})
    const db = await orbitdb.feed('GTWFeed.posts')

    const address = db.address.toString()

    app.get('/list', (req, res) => {
        var results = {}
        var key = 'Hash List'
        results[key] = []

        const posts = db.iterator({ limit: -1}).collect()
        posts.forEach((post) => {
            let data = post.payload.value
            console.log(data)
            results[key].push(data)
        })
        res.send(results)
    })

    app.get('/latest', (req,res) => {
        var results = {}
        var key = 'Hash List'
        results[key] = []

        const latestpost = db.iterator({ reverse: 'True'}).collect()
        latestpost.forEach((post) => {
            let data = post.payload.value
            console.log(data)
            results[key].push(data)
        })

        res.send(results)

    })

    app.post('/add', (req,res) => {
        console.log(req.body)
        console.log(req.body["hash"])
        db.add({ title: req.body["filename"], content: req.body["hash"]})
            .then(() => {
                const posts = db.iterator({ limit: -1}).collect()
                posts.forEach((post) => {
                    let data = post.payload.value
                    console.log(data.title + '\n', data.content)
                })
        })
        res.send('Post successful')
    })

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })

}

main()
