require('dotenv').config();
const dns = require('dns');
dns.setServers(['1.1.1.1', '1.0.0.1']);

const express = require('express');

const cors = require('cors');

const swaggerUi = require('swagger-ui-express');

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;

const swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// REGISTRAZIONE
app.post('/user', async (req, res) => {
    // #swagger.description = 'Registrazione di un nuovo utente'
    // #swagger.tags = ['User']

    const cNome = req.body.nome;
    const cCognome = req.body.cognome;
    const cEmail = req.body.email;
    const cPassword = req.body.password;

    if (cNome.length < 2) {
        return res.status(400).json( { message: 'Nome troppo corto' } );
    }
    if (cCognome.length < 2) {
        return res.status(400).json( { message: 'Cognome troppo corto' } );
    }

    const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(cEmail)) {
        return res.status(400).json({ message: 'Email non valida' });
    }

    if (cPassword.length < 8) {
        return res.status(400).json( { message: 'Password troppo corta' } );
    }

    try {
        const client = await MongoClient.connect(process.env.MONGOURL);
        const coll = client.db('pwm').collection('users');

        const user = {
            nome: cNome,
            cognome: cCognome,
            email: cEmail,
            password: cPassword,
        }

        const result = await coll.insertOne(user);
        
        console.log(result);
        
        await client.close();

        res.json(result);
      
    } catch (error) {
        if (error.code == 11000) {
            res.status(409).json({ success: false, message: "Email già in uso" });
        }
        else {
            res.status(500).json({ success: false, message: "Errore non gestito" + error.message });
        }
    }
})
// FINE REGISTRAZIONE

// LOGIN UTENTE
app.post('/user/login', async (req, res) => {
    // #swagger.description = 'Login di un utente'
    // #swagger.tags = ['User']

    const cEmail = req.body.email;
    const cPassword = req.body.password;

    const client = await MongoClient.connect(process.env.MONGOURL);
    const coll = client.db('pwm').collection('users');

    const utente = await coll.findOne( { email: { $eq: cEmail }, password: { $eq: cPassword } } );

    if (utente) {
        res.json(utente);
    } else {
        res.status(401).json( { error: "Credenziali errate!" } );
    }
})
// FINE LOGIN UTENTE

// MODIFICA DATI
app.put('/user/:email', async (req, res) => {
    // #swagger.description = 'Modifica dei dati di un utente'
    // #swagger.tags = ['User']
    // #swagger.parameters['email'] = { description: 'Email utente' }

    const cNome = req.body.nome;
    const cCognome = req.body.cognome;
    const cEmail = req.params.email;
    const cPassword = req.body.password;

    if (cNome.length < 2) {
        return res.status(400).json( { message: 'Nome troppo corto' } );
    }
    if (cCognome.length < 2) {
        return res.status(400).json( { message: 'Cognome troppo corto' } );
    }

    if (cPassword.length < 8) {
        return res.status(400).json( { message: 'Password troppo corta' } );
    }

    try {
        const client = await MongoClient.connect(process.env.MONGOURL);
        const coll = client.db('pwm').collection('users');

        const utente = await coll.findOne( { email:  { $eq: cEmail } } );

        if (!utente) {
            return res.status(404).json( { message: 'Utente non trovato' } );
        }

        const result = await coll.updateOne(
            {
                email: { $eq: cEmail }
            },
            {
                $set: {
                    nome: cNome,
                    cognome: cCognome,
                    password: cPassword
                }
            }
        )
        
        console.log(result);
        
        await client.close();

        res.status(200).json({ message: 'Dati aggiornati con successo' });

    } catch (error) {
        console.error(error);

        res.status(500).json({ message: 'Errore interno del server' });
    }
})
// FINE MODIFICA DATI

// CANCELLAZIONE
app.delete('/user/:email', async (req, res) => {
    // #swagger.description = 'Cancellazione di un utente'
    // #swagger.tags = ['User']
    // #swagger.parameters['email'] = { description: 'Email utente' }

    const cEmail = req.params.email;

    try {
        const client = await MongoClient.connect(process.env.MONGOURL);
        const coll = client.db('pwm').collection('users');

        const utente = await coll.findOne( { email: { $eq: cEmail } } );

        if (!utente) {
            return res.status(404).json({ message: 'Utente non trovato' });
        }

        const { _id } = utente;

        await coll.deleteOne( { _id: { $eq: _id } } );

        await client.close();

        res.status(200).json({ message: 'Utente eliminato con successo' });

    } catch (error) {
        console.error(error);

        res.status(500).json({ message: 'Errore interno del server' });
    }
})
// FINE CANCELLAZIONE

app.get('/user/:id', async (req, res) => {
    // #swagger.description = 'Dati di un utente'
    // #swagger.tags = ['User']
    // #swagger.parameters['id'] = { description: 'ID utente' }

    const id = req.params.id;

    try {
        const client = await MongoClient.connect(process.env.MONGOURL);
        const coll = client.db('pwm').collection('users');

        const result = await coll.findOne( { _id: { $eq: new ObjectID(id) } } );

        if (result) {
            res.json(result);
        }
        else {
            res.status(404).json( { message: 'Utente non trovato' } );
        }

        await client.close();
    } catch (err) {
        console.error(err);
        res.status(500).json( { message: 'Errore interno del server' } );
    }

})

app.listen(port, () => {
    console.log('App listening on port ' + port + '\n');
})