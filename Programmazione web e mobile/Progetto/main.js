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
//                                          UTENTI
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
        if (error.code == 11000) {
            res.status(409).json({ error: "Email già in uso" });
        }
        else {
            res.status(500).json({ error: "Errore non gestito" + error.error });
        }
    } finally {
        await client.close();
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
        res.status(500).json({ error: 'Errore interno del server' });
    } finally {
        await client.close();
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
        if (error.code == 11000) {
            res.status(409).json({ error: "Email già in uso" });
        }
        else {
            res.status(500).json({ error: 'Errore interno del server' });
        }
    } finally {
        await client.close();
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
    // #swagger.responses[500] = { description: 'Errore interno del server' }

    const id = req.params.id;

    let client;

    try {
        client = await MongoClient.connect(process.env.MONGOURL);
        const coll = client.db(process.env.DB_NAME).collection(process.env.COLL_USERS);

        await coll.deleteOne( { _id: { $eq: new ObjectID(id) } } );

        res.status(200).json({ message: 'Utente eliminato con successo' });

    } catch (error) {
        console.error(error);

        res.status(500).json({ error: 'Errore interno del server' });
    } finally {
        await client.close();
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
        await client.close();
    }

})

// -----------------------------------------------------------------------------------------------
//                                          RISTORANTI
// -----------------------------------------------------------------------------------------------

app.get('/restaurant', async (req, res) => {
    // #swagger.description = 'Restituisce l\'elenco di tutti i ristoranti registrati sulla piattaforma, ovvero di tutti gli utenti con il campo tipologia uguale a <b>"ristorante"</b>'
    // #swagger.tags = ['Ristorante']
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
        res.status(500).json( { error: 'Errore interno del server' } );
    } finally {
        await client.close();
    }
})

app.get('/restaurant/search', async (req, res) => {
    // #swagger.description = 'Cerca tra i ristoranti registrati filtrando per nome del ristorante o città, tramite corrispondenza parziale e case-insensitive.<br>Se il parametro <b>query</b> non viene fornito, restituisce l\'elenco completo dei ristoranti.'
    // #swagger.tags = ['Ristorante']
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
        await client.close();
    }
})

app.get('/restaurant/:id', async (req, res) => {
    // #swagger.description = 'Restituisce i dati completi di un singolo ristorante a partire dal suo ID.'
    // #swagger.tags = ['Ristorante']
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
        res.status(500).json( { error: 'Errore interno del server' } );
    } finally {
        await client.close();
    }
})

// -----------------------------------------------------------------------------------------------
//                                          MENU
// -----------------------------------------------------------------------------------------------

app.get('/restaurant/menu/:id', async (req, res) => {
    // #swagger.description = 'Restituisce la lista completa dei piatti del catalogo arricchita con le informazioni del menu del ristorante specificato.<br>Per ogni piatto viene indicato se è presente nel menu (inMenu), il prezzo impostato dal ristoratore (prezzo) e il riferimento al documento nella collezione menu (menu_id).<br>Se il piatto non è nel menu, prezzo e menu_id sono null.'
    // #swagger.tags = ['Menu']
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID del ristorante di cui si vuole ottenere il menu',
        required: true,
        type: 'string'
    }*/
    /* #swagger.responses[200] = { description: 'Lista di tutti i piatti del catalogo con i campi aggiuntivi inMenu, prezzo e menu_id' } */
    /* #swagger.responses[500] = { description: 'Errore interno del server' } */

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
        if (client) await client.close();
    }
})

app.post('/restaurant/menu/save', async (req, res) => {
    // #swagger.description = 'Salva il menu completo del ristorante.<br>Per ogni piatto ricevuto gestisce tre casi: se il piatto è selezionato e non era nel menu lo inserisce con il prezzo indicato; se il piatto è selezionato ed era già nel menu aggiorna il prezzo; se il piatto non è selezionato ma era nel menu lo rimuove.<br>I piatti selezionati senza prezzo o con prezzo non valido vengono ignorati.'
    // #swagger.tags = ['Menu']
    /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            ristorante_id: 'string',
            menu: [{
                piatto_id: 'string',
                menu_id: 'string|null',
                incluso: 'boolean',
                prezzo: 'number|null'
            }]
        }
    } */
    /* #swagger.responses[200] = { description: 'Menu salvato con successo' } */
    /* #swagger.responses[400] = { description: 'Campi mancanti nel body della richiesta' } */
    /* #swagger.responses[500] = { description: 'Errore interno del server' } */

    const { ristorante_id, menu } = req.body;

    if (!ristorante_id || !menu) {
        return res.status(400).json({ error: 'Campi mancanti' });
    }

    let client;
    try {
        client = await MongoClient.connect(process.env.MONGOURL);
        const coll = client.db(process.env.DB_NAME).collection(process.env.COLL_MENU);

        for (let piatto of menu) {

            if (piatto.incluso && !piatto.menu_id) {
                // checkbox spuntata e non era nel menu → INSERISCI
                if (!piatto.prezzo || piatto.prezzo <= 0) continue;
                await coll.insertOne({
                    ristorante_id: new ObjectID(ristorante_id),
                    piatto_id: new ObjectID(piatto.piatto_id),
                    prezzo: parseFloat(piatto.prezzo),
                    disponibile: true
                });

            } else if (piatto.incluso && piatto.menu_id) {
                // checkbox spuntata e era già nel menu → AGGIORNA PREZZO
                await coll.updateOne(
                    { _id: new ObjectID(piatto.menu_id) },
                    { $set: { prezzo: parseFloat(piatto.prezzo) } }
                );

            } else if (!piatto.incluso && piatto.menu_id) {
                // checkbox non spuntata e era nel menu → RIMUOVI
                await coll.deleteOne({ _id: new ObjectID(piatto.menu_id) });
            }
        }

        res.status(200).json({ message: 'Menu salvato con successo' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Errore interno del server' });
    } finally {
        if (client) await client.close();
    }
})

app.get('/meals', async (req, res) => {
    let client;

    try {
        client = await MongoClient.connect(process.env.MONGOURL);
        const coll = client.db(process.env.DB_NAME).collection(process.env.COLL_MEALS);

        const result = await coll.find().toArray();

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json( { error: 'Errore interno del server' } );
    } finally {
        await client.close();
    }
})

app.get('/meals/:id', async (req, res) => {
    // #swagger.description = 'Dati di un piatto'
    // #swagger.tags = ['Meals']
    // #swagger.parameters['id'] = { description: 'ID piatto' }

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
        await client.close();
    }

})

// -----------------------------------------------------------------------------------------------
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