const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;

const bcrypt = require('bcrypt');
const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS);

const convalida_dati = require('../utils/validator');

// -----------------------------------------------------------------------------------------------
//                                      GESTIONE UTENTE
// -----------------------------------------------------------------------------------------------

async function createUser(req, res) {
// #swagger.description = 'Registra un nuovo utente nel sistema.<br>Il tipo di registrazione varia in base al campo <b>tipologia</b> (cliente e ristorante).<br>I 2 tipi di utenti possiedono dei campi in comune (nome, cognome, email, password), inoltre un <b>cliente</b> deve fornire i dati del metodo di pagamento, mentre un <b>ristorante</b> deve fornire i dati dell\'attività, l\'indirizzo e le coordinate geografiche.'
    // #swagger.tags = ['Gestione utente']
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
                    url_foto: req.body.ristorante.url_foto?.trim() || "",
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

    const errore = convalida_dati(user, true);
    if (errore) {
        return res.status(400).json( { error: errore } );
    }

    user.password = await bcrypt.hash(user.password, BCRYPT_ROUNDS);

    let client;

    try {
        client = await MongoClient.connect(process.env.MONGOURL);
        const coll = client.db(process.env.DB_NAME).collection(process.env.COLL_USERS);

        const result = await coll.insertOne(user);
        
        res.status(201).json({ message: 'Utente registrato con successo', id: result.insertedId });
      
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
}

async function loginUser(req, res) {
    // #swagger.description = 'Autentica un utente tramite email e password.<br>In caso di successo restituisce i dati completi del profilo, altrimenti un errore di credenziali non valide.'
    // #swagger.tags = ['Gestione utente']
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

        const utente = await coll.findOne( { email: cEmail } );

        if (!utente) {
            return res.status(401).json({ error: 'Credenziali errate!' });
        }

        const passwordCorretta = await bcrypt.compare(cPassword, utente.password);

        if (!passwordCorretta) {
            return res.status(401).json({ error: 'Credenziali errate!' });
        }

        const { password, ...utenteSenzaPassword } = utente;

        res.status(200).json(utenteSenzaPassword);

    } catch (error) {
        console.error(error);

        res.status(500).json({ error: 'Errore interno del server' });
    } finally {
        if (client) {
            await client.close();
        }
    }
}

async function updateUser(req, res) {
    // #swagger.description = 'Aggiorna i dati di un utente esistente, identificato tramite ID.<br>Accetta lo stesso formato dati previsto in fase di registrazione, in base alla tipologia dell\'utente (cliente o ristorante).'
    // #swagger.tags = ['Gestione utente']
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

    if (!ObjectID.isValid(id)) {
        return res.status(400).json({ error: 'ID non valido' });
    }

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
                    url_foto: req.body.ristorante.url_foto?.trim() || "",
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

    const errore = convalida_dati(user, false);
    if (errore) {
        return res.status(400).json( { error: errore } );
    }

    if (typeof user.password === "string" && user.password.length > 0) {
        user.password = await bcrypt.hash(user.password, BCRYPT_ROUNDS);
    }
    else {
        delete user.password;
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
}

async function deleteUser(req, res) {
    // #swagger.description = 'Elimina definitivamente un utente dal sistema, identificato tramite ID.'
    // #swagger.tags = ['Gestione utente']
    // #swagger.summary = 'Cancellazione'

    /* #swagger.parameters['id'] = {
        description: 'ID dell\'utente da eliminare',
        required: true,
        type: 'string'
    } */

    // #swagger.responses[200] = { description: 'Dati dell\'utente eliminati con successo' }
    // #swagger.responses[400] = { description: 'ID utente non valido' }
    // #swagger.responses[404] = { description: 'Utente non trovato' }
    // #swagger.responses[500] = { description: 'Errore interno del server' }

    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(400).json({ error: 'ID non valido' });
    }

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
}

async function getUser(req, res) {
    // #swagger.description = 'Restituisce i dati completi di un singolo utente a partire dal suo ID.'
    // #swagger.tags = ['Gestione utente']
    // #swagger.summary = 'Dati utente'

    /* #swagger.parameters['id'] = {
        description: 'ID dell\'utente da recuperare',
        required: true,
        type: 'string'
    } */

    // #swagger.responses[200] = { description: 'Dati del cliente' }
    // #swagger.responses[400] = { description: 'ID utente non valido' }
    // #swagger.responses[404] = { description: 'Utente non trovato' }
    // #swagger.responses[500] = { description: 'Errore interno del server' }

    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(400).json({ error: 'ID non valido' });
    }

    let client;

    try {
        client = await MongoClient.connect(process.env.MONGOURL);
        const coll = client.db(process.env.DB_NAME).collection(process.env.COLL_USERS);

        const result = await coll.findOne(
            {
                _id: { $eq: new ObjectID(id) }
            },
            {
                projection: {
                    password: 0
                }
            }
        );

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
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getUser
};