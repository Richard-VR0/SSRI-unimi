const dns = require('dns');
dns.setServers(['1.1.1.1', '1.0.0.1']);

const express = require('express');

const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const mongoURL = '';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/movies', async (req, res) => {
    var from = req.query.from;
    var to = req.query.to;

    const runtime = req.query.runtime;

    var filter = {};

    if (from === undefined && to === undefined) {
        from = 1900;
        to = 2030;
    }
    else {
        if (to === undefined) {
            to = from;
        }

        if (from === undefined) {
            from = to;
        }

        if (from > to) {
            let aux = from;
            from = to;
            to = aux;
        }
    }

    filter.year = { "$gte": parseInt(from), "$lte": parseInt(to) };

    if (runtime !== undefined) {
        filter.runtime = { "$gte": parseInt(runtime) };
    }

    console.log("\n- ↓ Request ↓ -\nFrom: " + from + " To: " + to + "\nRuntime: " + runtime);

    const client = await MongoClient.connect(mongoURL);
    const coll = client.db('sample_mflix').collection('movies');
    const cursor = coll.find(filter);
    const result = await cursor.toArray();

    await client.close();

    res.json(result);
})

app.get('/moviesor', async (req, res) => {
    const from = req.query.from;
    const to = req.query.to;

    const runtime = req.query.runtime;

    var filter = {};

    if (from !== undefined && to !== undefined) {
        filter = { "$or": [ { "year": { "$lte": parseInt(from) } } , { "year": { "$gte": parseInt(to) } } ] };
    }

    if (runtime !== undefined) {
        filter.runtime = { "$gte": parseInt(runtime) };
    }

    const client = await MongoClient.connect(mongoURL);
    const coll = client.db('sample_mflix').collection('movies');
    const cursor = coll.find(filter);
    const result = await cursor.toArray();

    await client.close();

    res.json(result);
})

app.get('/', (req, res) => {
    res.send('Benvenuto!');
})

app.listen(port, () => {
    console.log('App listening on port ' + port + "\n");
})