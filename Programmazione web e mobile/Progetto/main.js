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

// -----------------------------------------------------------------------------------------------
//                                          FUNZIONI
// -----------------------------------------------------------------------------------------------

// FUNZIONE PER IL CONTROLLO VALIDITÀ DEI DATI INSERITI
function convalida_dati(user) {
    if (!user.nome || user.nome.length < 2) {
        return 'Nome troppo corto';
    }
    if (!user.cognome || user.cognome.length < 2) {
        return 'Cognome troppo corto';
    }

    const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/;
    if (!user.email || !emailRegex.test(user.email)) {
        return 'Email non valida';
    }

    if (!user.password || user.password.length < 8) {
        return 'Password troppo corta';
    }

    if (user.tipologia == "cliente") {
        if (!user.pagamento.numerocarta || user.pagamento.numerocarta.length != 16) {
            return 'Numero di carta non valido';
        }

        const scadenzaRegex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
        if (!user.pagamento.scadenza || !scadenzaRegex.test(user.pagamento.scadenza)) {
            return 'Data di scadenza non valida';
        }

        if (!user.pagamento.cvv || user.pagamento.cvv.length != 3) {
            return 'CVV non valido';
        }
    }
    else {
        if (user.tipologia == "ristorante") {
            const nomeristoranteLength = 30;
            const descrizioneristoranteLength = 200;
            const pivaLength = 11;
            const urlLength = 200;
            const telefonoLength = 18;
            const viaLength = 50;
            const civicoLength = 8;
            const cittaLength = 30;
            const latLength = 5;
            const lngLength = 5;


            if (!user.ristorante.nome || user.ristorante.nome.length < 3) {
                return 'Nome del ristorante troppo corto';
            }
            if (user.ristorante.nome.length > nomeristoranteLength) {
                return 'Nome del ristorante troppo lungo';
            }

            if (user.ristorante.descrizione.length > descrizioneristoranteLength) {
                return 'Descrizione del ristorante troppo lunga';
            }

            const pivaRegex = /^\d{11}$/;
            if (!user.ristorante.piva || !pivaRegex.test(user.ristorante.piva)) {
                return 'Formato partita iva non valido';
            }
            if (user.ristorante.piva.length > pivaLength) {
                return 'Partita iva troppo lunga';
            }

            const telefonoRegex = /^\+?\d{8,15}$/;
            if (!user.ristorante.telefono || !telefonoRegex.test(user.ristorante.telefono)) {
                return 'Formato telefono non valido';
            }
            if (user.ristorante.telefono.length > telefonoLength) {
                return 'Numero di telefono troppo lungo';
            }

            const viaRegex = /^[A-Za-zÀ-ÿ0-9\s.,'\-]{1,50}$/;
            if (!user.ristorante.indirizzo.via || !viaRegex.test(user.ristorante.indirizzo.via)) {
                return 'Via non valida';
            }
            if (user.ristorante.indirizzo.via.length > viaLength) {
                return 'Nome via troppo lungo';
            }

            const civicoRegex = /^[0-9A-Za-z\/\s]{1,8}$/;
            if (!user.ristorante.indirizzo.civico || !civicoRegex.test(user.ristorante.indirizzo.civico)) {
                return 'Civico non valida';
            }
            if (user.ristorante.indirizzo.civico.length > civicoLength) {
                return 'Civico troppo lungo';
            }

            const cittaRegex = /^[A-Za-zÀ-ÿ\s']{1,30}$/;
            if (!user.ristorante.indirizzo.citta || !cittaRegex.test(user.ristorante.indirizzo.citta)) {
                return 'Città non valida';
            }
            if (user.ristorante.indirizzo.citta.length > cittaLength) {
                return 'Nome città troppo lungo';
            }

            if (typeof user.ristorante.coordinate.lat !== 'number' || isNaN(user.ristorante.coordinate.lat) || user.ristorante.coordinate.lat < -90 || user.ristorante.coordinate.lat > 90) {
                return "Latitudine non valida";
            }

            if (typeof user.ristorante.coordinate.lng !== 'number' || isNaN(user.ristorante.coordinate.lng) || user.ristorante.coordinate.lng < -180 || user.ristorante.coordinate.lng > 180) {
                return "Longitudine non valida";
            }
        }
    }

    return null;
}

// -----------------------------------------------------------------------------------------------
//                                      GESTIONE UTENTE
// -----------------------------------------------------------------------------------------------

app.post('/user', async (req, res) => {
    // #swagger.description = 'Registra un nuovo utente nel sistema.<br>Il tipo di registrazione varia in base al campo <b>tipologia</b> (cliente e ristorante).<br>I 2 tipi di utenti possiedono dei campi in comune (nome, cognome, email, password), inoltre un <b>cliente</b> deve fornire i dati del metodo di pagamento, mentre un <b>ristorante</b> deve fornire i dati dell\'attività, l\'indirizzo e le coordinate geografiche.'
    // #swagger.tags = ['Utente']
    // #swagger.summary = 'Registrazione'
    /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    oneOf: [
                        {
                            type: "object",
                            title: "Cliente",
                            properties: {
                                nome: { type: "string", example: "Riccardo" },
                                cognome: { type: "string", example: "Vescio" },
                                email: { type: "string", example: "riccardo@gmail.com" },
                                password: { type: "string", example: "riccardo123" },
                                tipologia: { type: "string", example: "cliente" },
                                pagamento: {
                                    type: "object",
                                    properties: {
                                        numerocarta: { type: "string", example: "4321432143214321" },
                                        scadenza: { type: "string", example: "12/26" },
                                        cvv: { type: "string", example: "500" }
                                    }
                                }
                            }
                        },
                        {
                            type: "object",
                            title: "Ristorante",
                            properties: {
                                nome: { type: "string", example: "Riccardo" },
                                cognome: { type: "string", example: "Vescio" },
                                email: { type: "string", example: "ristorante@gmail.com" },
                                password: { type: "string", example: "ristorante123" },
                                tipologia: { type: "string", example: "ristorante" },
                                ristorante: {
                                    type: "object",
                                    properties: {
                                        nome: { type: "string", example: "Locanda dello sbusto" },
                                        descrizione: { type: "string", example: "Una locanda dove potrai trovare piatti disgustosi a prezzi esorbitanti" },
                                        piva: { type: "string", example: "12345678901" },
                                        url_foto: { type: "string", example: "https://esempio.it/foto.jpg" },
                                        telefono: { type: "string", example: "3333333333" },
                                        indirizzo: {
                                            type: "object",
                                            properties: {
                                                via: { type: "string", example: "Via dei Guinceri" },
                                                civico: { type: "string", example: "10" },
                                                citta: { type: "string", example: "Collesalvetti" }
                                            }
                                        },
                                        coordinate: {
                                            type: "object",
                                            properties: {
                                                latitudine: { type: "string", example: "45.464" },
                                                longitudine: { type: "string", example: "9.19" }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        }
    } */
   // #swagger.responses[201] = { description: 'Utente registrato con successo' }
   // #swagger.responses[400] = { description: 'Dati malformati' }
   // #swagger.responses[409] = { description: 'Email già in uso' }
   // #swagger.responses[500] = { description: 'Errore interno del server' }

    const type = req.body.tipologia;

    let user;

    if (type == "cliente") {
        user = {
            nome: req.body.nome.trim(),
            cognome: req.body.cognome.trim(),
            email: req.body.email.trim(),
            password: req.body.password,
            tipologia: req.body.tipologia,
            pagamento: {
                numerocarta: req.body.pagamento.numerocarta.trim(),
                scadenza: req.body.pagamento.scadenza.trim(),
                cvv: req.body.pagamento.cvv.trim()
            }
        };
    }
    else {
        if (type == "ristorante") {
            user = {
                nome: req.body.nome.trim(),
                cognome: req.body.cognome.trim(),
                email: req.body.email.trim(),
                password: req.body.password,
                tipologia: req.body.tipologia,
                ristorante: {
                    nome: req.body.ristorante.nome.trim(),
                    descrizione: req.body.ristorante.descrizione.trim(),
                    piva: req.body.ristorante.piva.trim(),
                    url_foto: req.body.ristorante.url_foto.trim(),
                    telefono: req.body.ristorante.telefono.trim(),
                    indirizzo: {
                        via: req.body.ristorante.indirizzo.via.trim(),
                        civico: req.body.ristorante.indirizzo.civico.trim(),
                        citta: req.body.ristorante.indirizzo.citta.trim()
                    },
                    coordinate: {
                        lat: parseFloat(req.body.ristorante.coordinate.latitudine),
                        lng: parseFloat(req.body.ristorante.coordinate.longitudine)
                    }
                }
            };
        }
    }

    const errore = convalida_dati(user);
    if (errore) {
        return res.status(400).json( { error: errore } );
    }

    let client;

    try {
        client = await MongoClient.connect(process.env.MONGOURL);
        const coll = client.db(process.env.DB_NAME).collection(process.env.COLL_USERS);

        const result = await coll.insertOne(user);

        res.status(201).json(result);
      
    } catch (error) {
        console.error(error);

        if (error.code == 11000) {
            res.status(409).json({ error: "Email già in uso" });
        }
        else {
            res.status(500).json({ error: "Errore non gestito" + error.error });
        }
    } finally {
        if (client) {
            await client.close();
        }
    }

})

app.post('/user/login', async (req, res) => {
    // #swagger.description = 'Autentica un utente tramite email e password.<br>In caso di successo restituisce i dati completi del profilo, altrimenti un errore di credenziali non valide.'
    // #swagger.tags = ['Utente']
    // #swagger.summary = 'Login'
    // #swagger.responses[200] = { description: 'Accesso eseguito correttamente' }
    // #swagger.responses[401] = { description: 'Credenziali errate' }
    // #swagger.responses[500] = { description: 'Errore interno del server' }

    const cEmail = req.body.email;
    const cPassword = req.body.password;

    let client

    try {
        client = await MongoClient.connect(process.env.MONGOURL);
        const coll = client.db(process.env.DB_NAME).collection(process.env.COLL_USERS);

        const utente = await coll.findOne( { email: { $eq: cEmail }, password: { $eq: cPassword } } );

        if (utente) {
            res.status(200).json(utente);
        } else {
            res.status(401).json( { error: "Credenziali errate!" } );
        }
    } catch (error) {
        console.error(error);

        res.status(500).json({ error: 'Errore interno del server' });
    } finally {
        if (client) {
            await client.close();
        }
    }
})

app.put('/user/:id', async (req, res) => {
    // #swagger.description = 'Aggiorna i dati di un utente esistente, identificato tramite ID.<br>Accetta lo stesso formato dati previsto in fase di registrazione, in base alla tipologia dell\'utente (cliente o ristorante).'
    // #swagger.tags = ['Utente']
    // #swagger.summary = 'Modifica'
    
    /* #swagger.parameters['id'] = {
        description: 'ID dell\'utente da modificare',
        required: true,
        type: 'string'
    } */
    
    /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    oneOf: [
                        {
                            type: "object",
                            title: "Cliente",
                            properties: {
                                nome: { type: "string", example: "Riccardo" },
                                cognome: { type: "string", example: "Vescio" },
                                email: { type: "string", example: "riccardo@gmail.com" },
                                password: { type: "string", example: "riccardo123" },
                                tipologia: { type: "string", example: "cliente" },
                                pagamento: {
                                    type: "object",
                                    properties: {
                                        numerocarta: { type: "string", example: "4321432143214321" },
                                        scadenza: { type: "string", example: "12/26" },
                                        cvv: { type: "string", example: "500" }
                                    }
                                }
                            }
                        },
                        {
                            type: "object",
                            title: "Ristorante",
                            properties: {
                                nome: { type: "string", example: "Riccardo" },
                                cognome: { type: "string", example: "Vescio" },
                                email: { type: "string", example: "ristorante@gmail.com" },
                                password: { type: "string", example: "ristorante123" },
                                tipologia: { type: "string", example: "ristorante" },
                                ristorante: {
                                    type: "object",
                                    properties: {
                                        nome: { type: "string", example: "Locanda dello sbusto" },
                                        descrizione: { type: "string", example: "Una locanda dove potrai trovare piatti disgustosi a prezzi esorbitanti" },
                                        piva: { type: "string", example: "12345678901" },
                                        url_foto: { type: "string", example: "https://esempio.it/foto.jpg" },
                                        telefono: { type: "string", example: "3333333333" },
                                        indirizzo: {
                                            type: "object",
                                            properties: {
                                                via: { type: "string", example: "Via dei Guinceri" },
                                                civico: { type: "string", example: "10" },
                                                citta: { type: "string", example: "Collesalvetti" }
                                            }
                                        },
                                        coordinate: {
                                            type: "object",
                                            properties: {
                                                latitudine: { type: "string", example: "45.464" },
                                                longitudine: { type: "string", example: "9.19" }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        }
    } */
    // #swagger.responses[200] = { description: 'Dati dell\'utente aggiornati con successo' }
    // #swagger.responses[400] = { description: 'Dati malformati' }
    // #swagger.responses[404] = { description: 'Utente non trovato' }
    // #swagger.responses[409] = { description: 'Email già in uso' }
    // #swagger.responses[500] = { description: 'Errore interno del server' }

    const id = req.params.id;

    const type = req.body.tipologia;

    let user;

    if (type == "cliente") {
        user = {
            nome: req.body.nome.trim(),
            cognome: req.body.cognome.trim(),
            email: req.body.email.trim(),
            password: req.body.password,
            tipologia: req.body.tipologia,
            pagamento: {
                numerocarta: req.body.pagamento.numerocarta.trim(),
                scadenza: req.body.pagamento.scadenza.trim(),
                cvv: req.body.pagamento.cvv.trim()
            }
        };
    }
    else {
        if (type == "ristorante") {
            user = {
                nome: req.body.nome.trim(),
                cognome: req.body.cognome.trim(),
                email: req.body.email.trim(),
                password: req.body.password,
                tipologia: req.body.tipologia,
                ristorante: {
                    nome: req.body.ristorante.nome.trim(),
                    descrizione: req.body.ristorante.descrizione.trim(),
                    piva: req.body.ristorante.piva.trim(),
                    url_foto: req.body.ristorante.url_foto.trim(),
                    telefono: req.body.ristorante.telefono.trim(),
                    indirizzo: {
                        via: req.body.ristorante.indirizzo.via.trim(),
                        civico: req.body.ristorante.indirizzo.civico.trim(),
                        citta: req.body.ristorante.indirizzo.citta.trim()
                    },
                    coordinate: {
                        lat: parseFloat(req.body.ristorante.coordinate.latitudine),
                        lng: parseFloat(req.body.ristorante.coordinate.longitudine)
                    }
                }
            };
        }
    }

    const errore = convalida_dati(user);
    if (errore) {
        return res.status(400).json( { error: errore } );
    }

    let client;

    try {
        client = await MongoClient.connect(process.env.MONGOURL);
        const coll = client.db(process.env.DB_NAME).collection(process.env.COLL_USERS);

        const result = await coll.updateOne(
            {
                _id: { $eq: new ObjectID(id) }
            },
            {
                $set: user
            }
        )

        if (result.matchedCount == 0) {
            return res.status(404).json({ error: 'Utente non trovato' });
        }

        res.status(200).json({ message: 'Dati aggiornati con successo' });

    } catch (error) {
        console.error(error);

        if (error.code == 11000) {
            res.status(409).json({ error: "Email già in uso" });
        }
        else {
            res.status(500).json({ error: 'Errore interno del server' });
        }
    } finally {
        if (client) {
            await client.close();
        }
    }

})

app.delete('/user/:id', async (req, res) => {
    // #swagger.description = 'Elimina definitivamente un utente dal sistema, identificato tramite ID.'
    // #swagger.tags = ['Utente']
    // #swagger.summary = 'Cancellazione'

    /* #swagger.parameters['id'] = {
        description: 'ID dell\'utente da eliminare',
        required: true,
        type: 'string'
    } */

    // #swagger.responses[200] = { description: 'Dati dell\'utente eliminati con successo' }
    // #swagger.responses[404] = { description: 'Utente non trovato' }
    // #swagger.responses[500] = { description: 'Errore interno del server' }

    const id = req.params.id;

    let client;

    try {
        client = await MongoClient.connect(process.env.MONGOURL);
        const db = client.db(process.env.DB_NAME);

        const coll_user = db.collection(process.env.COLL_USERS);
        const coll_menu = db.collection(process.env.COLL_MENU);

        const utente = await coll_user.findOne({ _id: { $eq: new ObjectID(id) } });
        if (!utente) {
            res.status(404).json({ message: 'Utente non trovato' });
        }
        else {
            if (utente.tipologia == "ristorante") {
                await coll_menu.deleteMany({ ristorante_id: { $eq: new ObjectID(id) } });
            }

            await coll_user.deleteOne( { _id: { $eq: new ObjectID(id) } } );

            res.status(200).json({ message: 'Utente eliminato con successo' });
        }
    } catch (error) {
        console.error(error);

        res.status(500).json({ error: 'Errore interno del server' });
    } finally {
        if (client) {
            await client.close();
        }
    }

})

app.get('/user/:id', async (req, res) => {
    // #swagger.description = 'Restituisce i dati completi di un singolo utente a partire dal suo ID.'
    // #swagger.tags = ['Utente']
    // #swagger.summary = 'Dati utente'

    /* #swagger.parameters['id'] = {
        description: 'ID dell\'utente da recuperare',
        required: true,
        type: 'string'
    } */

    // #swagger.responses[200] = { description: 'Dati del cliente' }
    // #swagger.responses[404] = { description: 'Utente non trovato' }
    // #swagger.responses[500] = { description: 'Errore interno del server' }

    const id = req.params.id;

    let client;

    try {
        client = await MongoClient.connect(process.env.MONGOURL);
        const coll = client.db(process.env.DB_NAME).collection(process.env.COLL_USERS);

        const result = await coll.findOne( { _id: { $eq: new ObjectID(id) } } );

        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(404).json( { error: 'Utente non trovato' } );
        }
    } catch (error) {
        console.error(error);

        res.status(500).json( { error: 'Errore interno del server' } );
    } finally {
        if (client) {
            await client.close();
        }
    }

})

// -----------------------------------------------------------------------------------------------
//                                          LISTA RISTORANTI
// -----------------------------------------------------------------------------------------------

app.get('/restaurant', async (req, res) => {
    // #swagger.description = 'Restituisce l\'elenco di tutti i ristoranti registrati sulla piattaforma, ovvero di tutti gli utenti con il campo tipologia uguale a <b>"ristorante"</b>'
    // #swagger.tags = ['Ristorante - Lista']
    // #swagger.summary = 'Lista dei ristoranti'
    // #swagger.responses[200] = { description: 'Lista dei ristoranti' }
    // #swagger.responses[500] = { description: 'Errore interno del server' }

    let client;

    try {
        client = await MongoClient.connect(process.env.MONGOURL);
        const coll = client.db(process.env.DB_NAME).collection(process.env.COLL_USERS);

        const result = await coll.find({ tipologia: 'ristorante' }).toArray();

        res.status(200).json(result);
    } catch (error) {
        console.error(error);

        res.status(500).json( { error: 'Errore interno del server' } );
    } finally {
        if (client) {
            await client.close();
        }
    }
})

app.get('/restaurant/search', async (req, res) => {
    // #swagger.description = 'Cerca tra i ristoranti registrati filtrando per nome del ristorante o città, tramite corrispondenza parziale e case-insensitive.<br>Se il parametro <b>query</b> non viene fornito, restituisce l\'elenco completo dei ristoranti.'
    // #swagger.tags = ['Ristorante - Lista']
    // #swagger.summary = 'Ricerca ristoranti'

    /* #swagger.parameters['query'] = {
        description: 'Testo da cercare (nome ristorante o città)',
        required: false,
        type: 'string'
    } */

    /* #swagger.responses[200] = { description: 'Lista ristoranti trovati' } */
    /* #swagger.responses[500] = { description: 'Errore interno del server' } */

    const query = req.query.query;

    let client;

    try {
        client = await MongoClient.connect(process.env.MONGOURL);
        const coll = client.db(process.env.DB_NAME).collection(process.env.COLL_USERS);

        const result = await coll.find({
            tipologia: 'ristorante',
            ...(query && {
                $or: [
                    { 'ristorante.nome': { $regex: query, $options: 'i' } },
                    { 'ristorante.indirizzo.citta': { $regex: query, $options: 'i' } }
                ]
            })
        }).toArray();

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        
        res.status(500).json({ error: 'Errore interno del server' });
    } finally {
        if (client) {
            await client.close();
        }
    }
})

// -----------------------------------------------------------------------------------------------
//                              VETRINA RISTORANTE (DETTAGLI + MENU)
// -----------------------------------------------------------------------------------------------

app.get('/restaurant/:id', async (req, res) => {
    // #swagger.description = 'Restituisce i dati completi di un singolo ristorante a partire dal suo ID.'
    // #swagger.tags = ['Ristorante - Vetrina']
    // #swagger.summary = 'Dati ristorante'

    /* #swagger.parameters['id'] = {
        description: 'ID del ristorante da recuperare',
        required: true,
        type: 'string'
    } */

    // #swagger.responses[200] = { description: 'Dati del ristorante' }
    // #swagger.responses[500] = { description: 'Errore interno del server' }

    let client;

    let id = req.params.id;

    try {
        client = await MongoClient.connect(process.env.MONGOURL);
        const coll = client.db(process.env.DB_NAME).collection(process.env.COLL_USERS);

        const result = await coll.findOne({ _id: { $eq: new ObjectID(id) } });

        res.status(200).json(result);
    } catch (error) {
        console.error(error);

        res.status(500).json( { error: 'Errore interno del server' } );
    } finally {
        if (client) {
            await client.close();
        }
    }
})

app.get('/restaurant/:id/menu', async (req, res) => {
    // #swagger.description = 'Restituisce tutti i piatti disponibili del menu del ristorante identificato dall\'ID.<br>Per ogni piatto vengono restituiti il prezzo configurato dal ristoratore e le informazioni del catalogo, come nome, categoria, area, foto, ingredienti, dosi e istruzioni.'
    // #swagger.tags = ['Menu - Vetrina']
    // #swagger.summary = 'Lista piatti disponibili'

    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID del ristorante di cui recuperare il menu',
        required: true,
        type: 'string'
    } */

    // #swagger.responses[200] = { description: 'Lista dei piatti disponibili nel menu del ristorante' }
    // #swagger.responses[500] = { description: 'Errore interno del server' }

    const ristorante_id = req.params.id;

    let client;

    try {
        client = await MongoClient.connect(process.env.MONGOURL);
        const db = client.db(process.env.DB_NAME);

        const result = await db.collection(process.env.COLL_MENU).aggregate([
            {
                $match: {
                    ristorante_id: new ObjectID(ristorante_id), disponibile: true
                }
            },
            {
                $lookup: {
                    from: process.env.COLL_MEALS,
                    localField: 'piatto_id',
                    foreignField: '_id',
                    as: 'piatto'
                }
            },
            { $unwind: '$piatto' },
            {
                $project: {
                    _id: 1,
                    prezzo: 1,
                    disponibile: 1,
                    nome: '$piatto.strMeal',
                    categoria: '$piatto.strCategory',
                    area: '$piatto.strArea',
                    foto: '$piatto.strMealThumb',
                    ingredienti: '$piatto.ingredients',
                    misure: '$piatto.measures',
                    istruzioni: '$piatto.strInstructions',
                    tag: '$piatto.strTags'
                }
            }
        ]).toArray();

        res.status(200).json(result);

    } catch (error) {
        console.error(error);

        res.status(500).json({ error: 'Errore interno del server' });
    } finally {
        if (client) {
            await client.close();
        }
    }
})

app.get('/restaurant/:id/menu/search', async (req, res) => {
    // #swagger.description = 'Cerca tra i piatti disponibili del menu di un ristorante.<br>La ricerca può filtrare per nome del piatto tramite il parametro <b>query</b>, per categoria tramite il parametro <b>categoria</b>, oppure per entrambi i parametri contemporaneamente.'
    // #swagger.tags = ['Menu - Vetrina']
    // #swagger.summary = 'Ricerca piatti nel menu'

    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID del ristorante nel cui menu effettuare la ricerca',
        required: true,
        type: 'string'
    } */

    /* #swagger.parameters['query'] = {
        in: 'query',
        description: 'Testo da cercare nel nome del piatto.',
        required: false,
        type: 'string'
    } */

    /* #swagger.parameters['categoria'] = {
        in: 'query',
        description: 'Categoria del piatto da filtrare.',
        required: false,
        type: 'string'
    } */

    // #swagger.responses[200] = { description: 'Lista dei piatti disponibili che corrispondono ai filtri richiesti' }
    // #swagger.responses[500] = { description: 'Errore interno del server' } */

    const ristorante_id = req.params.id;
    const query = req.query.query;
    const categoria = req.query.categoria;

    let client;

    try {
        client = await MongoClient.connect(process.env.MONGOURL);

        const db = client.db(process.env.DB_NAME);

        const result = await db.collection(process.env.COLL_MENU).aggregate([
            {
                $match: {
                    ristorante_id: new ObjectID(ristorante_id),
                    disponibile: true
                }
            },
            {
                $lookup: {
                    from: process.env.COLL_MEALS,
                    localField: 'piatto_id',
                    foreignField: '_id',
                    as: 'piatto'
                }
            },
            {
                $unwind: '$piatto'
            },
            {
                $match: {
                    ...(query
                    ? {
                        'piatto.strMeal': {
                            $regex: query,
                            $options: 'i'
                        }
                        }
                    : {}),
                    ...(categoria
                    ? {
                        'piatto.strCategory': categoria
                        }
                    : {})
                }
            },
            {
                $project: {
                    id: '$piatto.id',
                    prezzo: 1,
                    disponibile: 1,
                    nome: '$piatto.strMeal',
                    categoria: '$piatto.strCategory',
                    area: '$piatto.strArea',
                    foto: '$piatto.strMealThumb',
                    ingredienti: '$piatto.ingredients',
                    misure: '$piatto.measures',
                    istruzioni: '$piatto.strInstructions',
                    tag: '$piatto.strTags'
                }
            }
        ]).toArray();

        res.status(200).json(result);

    } catch (error) {
        console.error(error);

        res.status(500).json({ error: 'Errore interno del server' });
    } finally {
        if (client) {
            await client.close();
        }
    }
})


// -----------------------------------------------------------------------------------------------
//                                      GESTIONE MENU
// -----------------------------------------------------------------------------------------------

app.get('/restaurant/:id/menu/gestione', async (req, res) => {
    // #swagger.description = 'Restituisce tutti i piatti disponibili nel catalogo comune.<br>Ogni piatto viene arricchito con le informazioni relative al menu del ristorante indicato: <b>inMenu</b> specifica se il piatto è già presente nel menu, <b>prezzo</b> contiene il prezzo definito dal ristoratore e <b>menu_id</b> identifica il documento del piatto nella collezione del menu.<br>Se il piatto non è presente nel menu, i campi <b>prezzo</b> e <b>menu_id</b> sono <b>null</b>.'
    // #swagger.tags = ['Menu - Gestione']
    // #swagger.summary = 'Gestione menu del ristorante'

    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID del ristorante di cui recuperare la configurazione del menu',
        required: true,
        type: 'string'
    } */

    // #swagger.responses[200] = { description: 'Catalogo dei piatti con informazioni sulla presenza nel menu del ristorante' } */
    // #swagger.responses[500] = { description: 'Errore interno del server' }

    const ristorante_id = req.params.id;

    let client;
    try {
        client = await MongoClient.connect(process.env.MONGOURL);
        const db = client.db(process.env.DB_NAME);

        // 1. prendi tutti i piatti dal catalogo
        const piatti = await db.collection(process.env.COLL_MEALS).find().toArray();

        // 2. prendi il menu del ristorante
        const menu = await db.collection(process.env.COLL_MENU).find({
            ristorante_id: new ObjectID(ristorante_id)
        }).toArray();

        // 3. unisci i due array
        const result = piatti.map(piatto => {
            const inMenu = menu.find(m => m.piatto_id.toString() === piatto._id.toString());
            return {
                ...piatto,
                inMenu: !!inMenu,
                prezzo: inMenu ? inMenu.prezzo : null,
                menu_id: inMenu ? inMenu._id : null
            }
        });

        res.status(200).json(result);

    } catch (error) {
        console.error(error);

        res.status(500).json({ error: 'Errore interno del server' });
    } finally {
        if (client) {
            await client.close();
        }
    }
})

app.post('/restaurant/:id/menu/save', async (req, res) => {
    // #swagger.description = 'Salva la configurazione completa del menu di un ristorante.<br>I piatti nuovi senza prezzo valido o con prezzo minore o uguale a zero non vengono inseriti.<br>Per ogni piatto ricevuto gestisce tre casi:<ul><li>Se il piatto è selezionato e non era già nel menu, viene inserito con il prezzo indicato</li><li>Se il piatto è selezionato ed è già nel menu, viene aggiornato il prezzo</li><li>Se il piatto non è selezionato ma è presente nel menu, viene rimosso.</li></ul>'
    // #swagger.tags = ['Menu - Gestione']
    // #swagger.summary = 'Salvataggio menu del ristorante'

    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID del ristorante di cui salvare il menu',
        required: true,
        type: 'string'
    } */

    /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    required: ['menu'],
                    properties: {
                        menu: {
                            type: 'array',
                            description: 'Lista completa dei piatti del catalogo con le modifiche effettuate dal ristoratore',
                            items: {
                                type: 'object',
                                properties: {
                                    piatto_id: {
                                    type: 'string',
                                    example: '66e2e8cb5c34459a0b7a1234'
                                    },
                                    menu_id: {
                                    type: 'string',
                                    nullable: true,
                                    example: null,
                                    description: 'ID del documento nella collezione menu. Vale null se il piatto non era già presente nel menu.'
                                    },
                                    incluso: {
                                    type: 'boolean',
                                    example: true,
                                    description: 'Indica se il piatto deve essere presente nel menu del ristorante'
                                    },
                                    prezzo: {
                                    type: 'number',
                                    nullable: true,
                                    example: 8.5,
                                    description: 'Prezzo definito dal ristoratore'
                                    }
                                }
                            },
                            example: [
                                {
                                    piatto_id: '66e2e8cb5c34459a0b7a1234',
                                    menu_id: null,
                                    incluso: true,
                                    prezzo: 8.5
                                },
                                {
                                    piatto_id: '66e2e8cb5c34459a0b7a5678',
                                    menu_id: '66e2e8cb5c34459a0b7a9876',
                                    incluso: true,
                                    prezzo: 10
                                },
                                {
                                    piatto_id: '66e2e8cb5c34459a0b7a1111',
                                    menu_id: '66e2e8cb5c34459a0b7a2222',
                                    incluso: false,
                                    prezzo: null
                                }
                            ]
                        }
                    }
                }
            }
        }
    } */

    // #swagger.responses[200] = { description: 'Menu salvato con successo' }
    // #swagger.responses[400] = { description: 'Campo menu mancante nel body della richiesta oppure ID ristorante non valido' }
    // #swagger.responses[500] = { description: 'Errore interno del server' }
    
    const ristorante_id = req.params.id;
    const { menu } = req.body;

    if (!ristorante_id || !menu) {
        return res.status(400).json({ error: 'Campi mancanti' });
    }

    let client;
    try {
        client = await MongoClient.connect(process.env.MONGOURL);
        const coll = client.db(process.env.DB_NAME).collection(process.env.COLL_MENU);

        for (let piatto of menu) {

            if (piatto.incluso && !piatto.menu_id) {
                if (piatto.prezzo && piatto.prezzo > 0) {
                    await coll.insertOne({
                        ristorante_id: new ObjectID(ristorante_id),
                        piatto_id: new ObjectID(piatto.piatto_id),
                        prezzo: parseFloat(parseFloat(piatto.prezzo).toFixed(2)),
                        disponibile: true
                    });
                }
            }
            else {
                if (piatto.incluso && piatto.menu_id) {
                    await coll.updateOne(
                        { _id: new ObjectID(piatto.menu_id) },
                        { $set: { prezzo: parseFloat(parseFloat(piatto.prezzo).toFixed(2)) } }
                    );
                }
                else {
                    if (!piatto.incluso && piatto.menu_id) {
                        await coll.deleteOne({ _id: new ObjectID(piatto.menu_id) });
                    }
                }
            }
        }

        res.status(200).json({ message: 'Menu salvato con successo' });

    } catch (error) {
        console.error(error);

        res.status(500).json({ error: 'Errore interno del server' });
    } finally {
        if (client) {
            await client.close();
        }
    }
})

// -----------------------------------------------------------------------------------------------
//                                      ORDINI CLIENTE
// -----------------------------------------------------------------------------------------------

app.post('/order', async (req, res) => {
    // #swagger.description = 'Crea un nuovo ordine per un cliente presso un ristorante.<br>L\'ordine viene creato nello stato iniziale <b>Ordinato</b>.<br>Il backend calcola automaticamente il <b>tempoStimato</b> considerando il numero di ordini dello stesso ristorante ancora negli stati <b>Ordinato</b> e <b>In preparazione</b>.'
    // #swagger.tags = ['Ordine - Cliente']
    // #swagger.summary = 'Creazione ordine'

    /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    required: ['cliente_id', 'ristorante_id', 'piatti', 'totale'],
                    properties: {
                    cliente_id: {
                        type: 'string',
                        example: '66e2e8cb5c34459a0b7a1111',
                        description: 'ID del cliente che effettua l\'ordine'
                    },
                    ristorante_id: {
                        type: 'string',
                        example: '66e2e8cb5c34459a0b7a2222',
                        description: 'ID del ristorante presso cui viene effettuato l\'ordine'
                    },
                    piatti: {
                        type: 'array',
                        minItems: 1,
                        description: 'Piatti presenti nel carrello del cliente',
                        items: {
                        type: 'object',
                        properties: {
                            _id: {
                            type: 'string',
                            example: '66e2e8cb5c34459a0b7a3333',
                            description: 'ID del piatto'
                            },
                            nome: {
                            type: 'string',
                            example: 'Chicken Handi'
                            },
                            prezzo: {
                            type: 'number',
                            example: 8.5
                            },
                            foto: {
                            type: 'string',
                            example: 'https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg'
                            },
                            quantita: {
                            type: 'integer',
                            example: 2,
                            minimum: 1
                            }
                        }
                        },
                        example: [
                        {
                            _id: '66e2e8cb5c34459a0b7a3333',
                            nome: 'Chicken Handi',
                            prezzo: 8.5,
                            foto: 'https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg',
                            quantita: 2
                        },
                        {
                            _id: '66e2e8cb5c34459a0b7a4444',
                            nome: 'Apple Frangipane Tart',
                            prezzo: 4.5,
                            foto: 'https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg',
                            quantita: 1
                        }
                        ]
                    },
                    totale: {
                        type: 'number',
                        example: 21.5,
                        description: 'Totale dell\'ordine calcolato dal frontend'
                    }
                    }
                }
            }
        }
    } */

    // #swagger.responses[201] = { description: 'Ordine creato con successo' }
    // #swagger.responses[400] = { description: 'Campi obbligatori mancanti oppure carrello vuoto' }
    // #swagger.responses[500] = { description: 'Errore interno del server' }

    const { cliente_id, ristorante_id, piatti, totale } = req.body;

    if (!cliente_id || !ristorante_id || !piatti || piatti.length === 0) {
        return res.status(400).json({ error: 'Campi mancanti' });
    }

    let client;
    
    try {
        client = await MongoClient.connect(process.env.MONGOURL);
        const coll = client.db(process.env.DB_NAME).collection(process.env.COLL_ORDERS);

        const numeroOrdiniInCoda = await coll.countDocuments({
            ristorante_id: new ObjectID(ristorante_id),
            stato: {
                $in: ['Ordinato', 'In preparazione']
            }
        });

        const tempoStimato = (numeroOrdiniInCoda + 1) * process.env.TEMPO_PER_ORDINE;

        await coll.insertOne({
            cliente_id: new ObjectID(cliente_id),
            ristorante_id: new ObjectID(ristorante_id),
            piatti: piatti,
            stato: 'Ordinato',
            totale: totale,
            tempoStimato: tempoStimato,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        res.status(201).json({ message: 'Ordine creato con successo' });

    } catch (error) {
        console.error(error);

        res.status(500).json({ error: 'Errore interno del server' });
    } finally {
        if (client) {
            await client.close();
        }
    }
})

app.get('/orders/client/:id', async (req, res) => {
    // #swagger.description = 'Restituisce tutti gli ordini effettuati da un cliente, ordinati dal più recente al più vecchio.<br>Per ogni ordine restituisce anche il nome del ristorante, lo stato di avanzamento, il tempo di attesa stimato e l\'eventuale recensione inserita dal cliente.'
    // #swagger.tags = ['Ordine - Cliente']
    // #swagger.summary = 'Lista ordini del cliente'

    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID del cliente di cui recuperare gli ordini',
        required: true,
        type: 'string'
    } */

    // #swagger.responses[200] = { description: 'Lista degli ordini del cliente' }
    // #swagger.responses[500] = { description: 'Errore interno del server' }

    const cliente_id = req.params.id;

    let client;
    try {
        client = await MongoClient.connect(process.env.MONGOURL);
        const db = client.db(process.env.DB_NAME);

        const result = await db.collection(process.env.COLL_ORDERS).aggregate([
            {
                $match: {
                    cliente_id: new ObjectID(cliente_id) 
                }
            },
            {
                $lookup: {
                    from: process.env.COLL_USERS,
                    localField: 'ristorante_id',
                    foreignField: '_id',
                    as: 'ristorante'
                }
            },
            { $unwind: '$ristorante' },
            {
                $project: {
                    _id: 1,
                    piatti: 1,
                    stato: 1,
                    totale: 1,
                    createdAt: 1,
                    nome_ristorante: '$ristorante.ristorante.nome',
                    recensione: 1,
                    tempoStimato: 1
                }
            },
            { $sort: { createdAt: -1 } }
        ]).toArray();

        res.status(200).json(result);

    } catch (error) {
        console.error(error);

        res.status(500).json({ error: 'Errore interno del server' });
    } finally {
        if (client) {
            await client.close();
        }
    }
})

app.patch('/order/:id/review', async (req, res) => {
    // #swagger.description = 'Salva la recensione numerica di un ordine.<br>La recensione deve essere un numero intero compreso tra <b>1</b> e <b>5</b> e può essere inserita solo quando l\'ordine si trova nello stato <b>Consegnato</b>.'
    // #swagger.tags = ['Ordine - Cliente']
    // #swagger.summary = 'Inserimento recensione'

    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID dell\'ordine da recensire',
        required: true,
        type: 'string'
    } */

    /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    required: ['recensione'],
                    properties: {
                        recensione: {
                            type: 'integer',
                            minimum: 1,
                            maximum: 5,
                            example: 5,
                            description: 'Valutazione intera assegnata dal cliente all\'ordine'
                        }
                    }
                }
            }
        }
    } */

    // #swagger.responses[200] = { description: 'Recensione salvata con successo' }
    // #swagger.responses[400] = { description: 'Recensione non valida' }
    // #swagger.responses[404] = { description: 'Ordine non trovato oppure ordine non ancora consegnato' }
    // #swagger.responses[500] = { description: 'Errore interno del server' }

    const ordine_id = req.params.id;
    const recensione = Number(req.body.recensione);

    if (!Number.isInteger(recensione) || recensione < 1 || recensione > 5) {
        return res.status(400).json({ error: 'La recensione deve essere un numero da 1 a 5' });
    }

    let client;

    try {
        client = await MongoClient.connect(process.env.MONGOURL);

        const coll = client.db(process.env.DB_NAME).collection(process.env.COLL_ORDERS);

        const result = await coll.updateOne(
        {
            _id: new ObjectID(ordine_id),
            stato: 'Consegnato'
        },
        {
            $set: {
            recensione: recensione
            }
        }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Ordine non trovato oppure non ancora consegnato' });
        }

        res.status(200).json({ message: 'Recensione salvata', recensione: recensione });

    } catch (error) {
        console.error(error);

        res.status(500).json({ error: 'Errore interno del server' });
    } finally {
        if (client) {
            await client.close();
        }
    }
})

// -----------------------------------------------------------------------------------------------
//                                      ORDINI RISTORANTE
// -----------------------------------------------------------------------------------------------

app.get('/orders/restaurant/:id', async (req, res) => {
    // #swagger.description = 'Restituisce tutti gli ordini ricevuti dal ristorante indicato, ordinati dal più recente al più vecchio.<br>Per ogni ordine restituisce i piatti ordinati, il totale, lo stato dell\'ordine, la data di creazione e il nome completo del cliente che ha effettuato l\'acquisto.'
    // #swagger.tags = ['Ordine - Ristorante']
    // #swagger.summary = 'Lista ordini del ristorante'

    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID del ristorante di cui recuperare gli ordini ricevuti',
        required: true,
        type: 'string'
    } */

    // #swagger.responses[200] = { description: 'Lista degli ordini ricevuti dal ristorante' }
    // #swagger.responses[500] = { description: 'Errore interno del server' }

    const ristorante_id = req.params.id;

    let client;

    try {
        client = await MongoClient.connect(process.env.MONGOURL);
        const db = client.db(process.env.DB_NAME);

        const result = await db.collection(process.env.COLL_ORDERS).aggregate([
            {
                $match: {
                    ristorante_id: new ObjectID(ristorante_id)
                }
            },
            {
                $lookup: {
                    from: process.env.COLL_USERS,
                    localField: 'cliente_id',
                    foreignField: '_id',
                    as: 'cliente'
                }
            },
            { $unwind: '$cliente' },
            {
                $project: {
                    _id: 1,
                    piatti: 1,
                    stato: 1,
                    totale: 1,
                    createdAt: 1,
                    nome_cliente: '$cliente.nome',
                    cognome_cliente: '$cliente.cognome'
                }
            },
            { $sort: { createdAt: -1 } }
        ]).toArray();

        res.status(200).json(result);

    } catch (error) {
        console.error(error);

        res.status(500).json({ error: 'Errore interno del server' });
    } finally {
        if (client) {
            await client.close();
        }
    }
})

app.patch('/order/:id/status', async (req, res) => {
    // #swagger.description = 'Aggiorna lo stato di un ordine esistente.<br>Ad ogni aggiornamento viene modificato automaticamente anche il campo <b>updatedAt</b>.<br>Gli stati ammessi sono: <ul><li>Ordinato</li> <li>In preparazione</li> <li>In consegna</li> <li>Consegnato</li></ul>'
    // #swagger.tags = ['Ordine - Ristorante']
    // #swagger.summary = 'Aggiornamento stato ordine'

    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID dell\'ordine di cui aggiornare lo stato',
        required: true,
        type: 'string'
    } */

    /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    required: ['stato'],
                    properties: {
                        stato: {
                            type: 'string',
                            enum: [
                            'Ordinato',
                            'In preparazione',
                            'In consegna',
                            'Consegnato'
                            ],
                            example: 'In preparazione',
                            description: 'Nuovo stato da assegnare all\'ordine'
                        }
                    }
                }
            }
        }
    } */

    // #swagger.responses[200] = { description: 'Stato dell\'ordine aggiornato con successo' }
    // #swagger.responses[400] = { description: 'Stato non valido' }
    // #swagger.responses[404] = { description: 'Ordine non trovato' }
    // #swagger.responses[500] = { description: 'Errore interno del server' }

    const ordine_id = req.params.id;
    const nuovo_stato = req.body.stato;

    const statiValidi = [
        'Ordinato',
        'In preparazione',
        'In consegna',
        'Consegnato'
    ];

    if (!statiValidi.includes(nuovo_stato)) {
        return res.status(400).json({
        error: 'Stato non valido'
        });
    }

    let client;

    try {
        client = await MongoClient.connect(process.env.MONGOURL);

        const coll = client
        .db(process.env.DB_NAME)
        .collection(process.env.COLL_ORDERS);

        const result = await coll.updateOne(
            {
                _id: new ObjectID(ordine_id)
            },
            {
                $set: {
                stato: nuovo_stato,
                updatedAt: new Date()
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Ordine non trovato' });
        }

        res.status(200).json({ message: 'Stato aggiornato con successo', stato: nuovo_stato });

    } catch (error) {
        console.error(error);

        res.status(500).json({ error: 'Errore interno del server' });
    } finally {
        if (client) {
            await client.close();
        }
    }
})

app.get('/restaurant/:id/reviews', async (req, res) => {
    // #swagger.description = 'Calcola la media delle recensioni ricevute dagli ordini di un ristorante.<br>Vengono considerati soltanto gli ordini che possiedono il campo <b>recensione</b>.<br>Se il ristorante non ha ancora ricevuto recensioni, restituisce <b>media: null</b> e <b>numeroRecensioni: 0</b>.'
    // #swagger.tags = ['Ristorante - Vetrina']
    // #swagger.summary = 'Media recensioni del ristorante'

    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID del ristorante di cui calcolare la media delle recensioni',
        required: true,
        type: 'string'
    } */

    // #swagger.responses[200] = { description: 'Media delle recensioni e numero totale di recensioni del ristorante' }
    // #swagger.responses[500] = { description: 'Errore interno del server' }

    const ristorante_id = req.params.id;

    let client;

    try {
        client = await MongoClient.connect(process.env.MONGOURL);

        const coll = client.db(process.env.DB_NAME).collection(process.env.COLL_ORDERS);

        const risultato = await coll.aggregate([
            {
                $match: {
                    ristorante_id: new ObjectID(ristorante_id),
                    recensione: {
                        $exists: true
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    media: {
                        $avg: '$recensione'
                    },
                    numeroRecensioni: {
                        $sum: 1
                    }
                }
            }
        ]).toArray();

        if (risultato.length === 0) {
            return res.status(200).json({ media: null, numeroRecensioni: 0 });
        }

        res.status(200).json({ media: risultato[0].media, numeroRecensioni: risultato[0].numeroRecensioni });

    } catch (error) {
        console.error(error);

        res.status(500).json({ error: 'Errore interno del server' });
    } finally {
        if (client) {
            await client.close();
        }
    }
})

// -----------------------------------------------------------------------------------------------
//                                      INFORMAZIONI PIATTI
// -----------------------------------------------------------------------------------------------

app.get('/meals', async (req, res) => {
    // #swagger.description = 'Restituisce tutti i piatti presenti nel catalogo comune dell\'applicazione.<br>I piatti del catalogo possono essere selezionati dai ristoratori per creare o aggiornare il proprio menu.'
    // #swagger.tags = ['Piatti (extra)']
    // #swagger.summary = 'Lista completa dei piatti'

    // #swagger.responses[200] = { description: 'Lista completa dei piatti del catalogo' }
    // #swagger.responses[500] = { description: 'Errore interno del server' }
    
    let client;

    try {
        client = await MongoClient.connect(process.env.MONGOURL);
        const coll = client.db(process.env.DB_NAME).collection(process.env.COLL_MEALS);

        const result = await coll.find().toArray();

        res.status(200).json(result);
    } catch (error) {
        console.error(error);

        res.status(500).json( { error: 'Errore interno del server' } );
    } finally {
        await client.close();
    }
})

app.get('/meals/:id', async (req, res) => {
    // #swagger.description = 'Restituisce tutte le informazioni di un singolo piatto del catalogo comune, identificato dal relativo ID.<br>La risposta include nome, categoria, area geografica, foto, ingredienti, dosi, tag e istruzioni di preparazione.'
    // #swagger.tags = ['Piatti (extra)']
    // #swagger.summary = 'Dettaglio di un piatto'

    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID del piatto da recuperare',
        required: true,
        type: 'string'
    } */

    // #swagger.responses[200] = { description: 'Informazioni complete del piatto' }
    // #swagger.responses[404] = { description: 'Piatto non trovato' }
    // #swagger.responses[500] = { description: 'Errore interno del server' }

    const id = req.params.id;

    let client;

    try {
        client = await MongoClient.connect(process.env.MONGOURL);
        const coll = client.db(process.env.DB_NAME).collection(process.env.COLL_MEALS);

        const result = await coll.findOne( { _id: { $eq: new ObjectID(id) } } );

        if (result) {
            res.json(result);
        }
        else {
            res.status(404).json( { error: 'Piatto non trovato' } );
        }
    } catch (error) {
        console.error(error);

        res.status(500).json( { error: 'Errore interno del server' } );
    } finally {
        if (client) {
            await client.close();
        }
    }

})

// -----------------------------------------------------------------------------------------------
//                              CARICAMENTO PIATTI NEL DB DAL JSON
// -----------------------------------------------------------------------------------------------

async function setup() {
    const client = await MongoClient.connect(process.env.MONGOURL);
    const coll = client.db(process.env.DB_NAME).collection(process.env.COLL_MEALS);

    const count = await coll.countDocuments();

    if (count === 0) {
        const meals = require(process.env.MEALSPATH);

        const mealsConverted = meals.map(meal => ({
            ...meal,
            _id: new ObjectID(meal._id.$oid)
        }));

        await coll.insertMany(mealsConverted);
        
        console.log('Piatti caricati dal meal.json');
    } else {
        console.log('Piatti già presenti nel database');
    }

    await client.close();
}

app.listen(port, async () => {
    await setup();

    console.log('App listening on port ' + port + '\n');
})