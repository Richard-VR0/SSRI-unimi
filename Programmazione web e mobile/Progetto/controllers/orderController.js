const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;

// -----------------------------------------------------------------------------------------------
//                                      ORDINI CLIENTE
// -----------------------------------------------------------------------------------------------

async function createOrder(req, res) {
    // #swagger.description = 'Crea un nuovo ordine per un cliente presso un ristorante.<br>L\'ordine viene creato nello stato iniziale <b>Ordinato</b>.<br>Il backend calcola automaticamente il <b>tempoStimato</b> considerando il numero di ordini dello stesso ristorante ancora negli stati <b>Ordinato</b> e <b>In preparazione</b>.'
    // #swagger.tags = ['Ordini cliente']
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
    // #swagger.responses[400] = { description: 'Campi obbligatori mancanti, non validi oppure carrello vuoto' }
    // #swagger.responses[500] = { description: 'Errore interno del server' }

    const { cliente_id, ristorante_id, piatti } = req.body;

    if (!ObjectID.isValid(cliente_id)) {
        return res.status(400).json({ error: 'ID cliente non valido' });
    }

    if (!ObjectID.isValid(ristorante_id)) {
        return res.status(400).json({ error: 'ID ristorante non valido' });
    }

    if (!Array.isArray(piatti) || piatti.length === 0) {
        return res.status(400).json({ error: 'Il carrello è vuoto' });
    }

    for (const piatto of piatti) {
        if (!ObjectID.isValid(piatto._id)) {
            return res.status(400).json({
                error: 'ID piatto non valido',
                idRicevuto: piatto._id
            });
        }

        if (!Number.isInteger(Number(piatto.quantita)) || Number(piatto.quantita) < 1) {
            return res.status(400).json({ error: 'Quantità piatto non valida' });
        }

        if (typeof piatto.prezzo !== 'number' || !Number.isFinite(piatto.prezzo) || piatto.prezzo < 0) {
            return res.status(400).json({ error: 'Prezzo piatto non valido' });
        }
    }

    let totaleCentesimi = 0;

    for (const piatto of piatti) {
        const prezzoCentesimi = Math.round(piatto.prezzo * 100);

        totaleCentesimi += prezzoCentesimi * Number(piatto.quantita);
    }

    const totale = totaleCentesimi / 100;

    let client;

    try {
        client = await MongoClient.connect(process.env.MONGOURL);

        const db = client.db(process.env.DB_NAME);

        const coll = db.collection(process.env.COLL_ORDERS);

        const numeroOrdiniInCoda = await coll.countDocuments({
            ristorante_id: new ObjectID(ristorante_id),
            stato: {
                $in: [
                    'Ordinato',
                    'In preparazione'
                ]
            }
        });

        const tempoStimato = (numeroOrdiniInCoda + 1) * Number(process.env.TEMPO_PER_ORDINE);

        const ordine = {
            cliente_id: new ObjectID(cliente_id),
            ristorante_id: new ObjectID(ristorante_id),
            piatti: piatti,
            totale: totale,
            stato: 'Ordinato',
            tempoStimato: tempoStimato,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await coll.insertOne(ordine);

        res.status(201).json({
            message: 'Ordine creato con successo',
            id: result.insertedId,
            totale: totale
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({ error: 'Errore interno del server' });
    } finally {
        if (client) {
            await client.close();
        }
    }
}

async function getOrderById(req, res) {
    // #swagger.description = 'Restituisce tutti gli ordini effettuati da un cliente, ordinati dal più recente al più vecchio.<br>Per ogni ordine restituisce anche il nome del ristorante, lo stato di avanzamento, il tempo di attesa stimato e l\'eventuale recensione inserita dal cliente.'
    // #swagger.tags = ['Ordini cliente']
    // #swagger.summary = 'Lista ordini del cliente'

    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID del cliente di cui recuperare gli ordini',
        required: true,
        type: 'string'
    } */

    // #swagger.responses[200] = { description: 'Lista degli ordini del cliente' }
    // #swagger.responses[400] = { description: 'ID cliente non valido' }
    // #swagger.responses[500] = { description: 'Errore interno del server' }

    const cliente_id = req.params.id;

    if (!ObjectID.isValid(cliente_id)) {
        return res.status(400).json({ error: 'ID cliente non valido' });
    }

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
            {
                $unwind: {
                    path: '$ristorante',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    piatti: 1,
                    stato: 1,
                    totale: 1,
                    createdAt: 1,
                    nome_ristorante:
                        '$ristorante.ristorante.nome',
                    recensione: 1,
                    tempoStimato: 1
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
        ])
        .toArray();

        res.status(200).json(result);

    } catch (error) {
        console.error(error);

        res.status(500).json({ error: 'Errore interno del server' });
    } finally {
        if (client) {
            await client.close();
        }
    }
}

async function addReview(req, res) {
    // #swagger.description = 'Salva la recensione numerica di un ordine.<br>La recensione deve essere un numero intero compreso tra <b>1</b> e <b>5</b> e può essere inserita solo quando l\'ordine si trova nello stato <b>Consegnato</b>.'
    // #swagger.tags = ['Ordini cliente']
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

    if (!ObjectID.isValid(ordine_id)) {
        return res.status(400).json({ error: 'ID non valido' });
    }

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
}

// -----------------------------------------------------------------------------------------------
//                                      ORDINI RISTORANTE
// -----------------------------------------------------------------------------------------------

async function getRestaurantOrders(req, res) {
    // #swagger.description = 'Restituisce tutti gli ordini ricevuti dal ristorante indicato, ordinati dal più recente al più vecchio.<br>Per ogni ordine restituisce i piatti ordinati, il totale, lo stato dell\'ordine, la data di creazione e il nome completo del cliente che ha effettuato l\'acquisto.'
    // #swagger.tags = ['Ordini ristorante']
    // #swagger.summary = 'Lista ordini del ristorante'

    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID del ristorante di cui recuperare gli ordini ricevuti',
        required: true,
        type: 'string'
    } */

    // #swagger.responses[200] = { description: 'Lista degli ordini ricevuti dal ristorante' }
    // #swagger.responses[400] = { description: 'ID ristorante non valido' }
    // #swagger.responses[500] = { description: 'Errore interno del server' }

    const ristorante_id = req.params.id;

    if (!ObjectID.isValid(ristorante_id)) {
        return res.status(400).json({ error: 'ID ristorante non valido' });
    }

    let client;

    try {
        client = await MongoClient.connect(process.env.MONGOURL);

        const db = client.db(process.env.DB_NAME);

        const result = await db.collection(process.env.COLL_ORDERS).aggregate([
            {
                $match: {
                    ristorante_id:
                        new ObjectID(ristorante_id)
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
            {
                $unwind: {
                    path: '$cliente',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    piatti: 1,
                    stato: 1,
                    totale: 1,
                    createdAt: 1,
                    nome_cliente: '$cliente.nome',
                    cognome_cliente: '$cliente.cognome',
                    tempoStimato: '$tempoStimato'
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
        ])
        .toArray();

        res.status(200).json(result);

    } catch (error) {
        console.error(error);

        res.status(500).json({ error: 'Errore interno del server' });
    } finally {
        if (client) {
            await client.close();
        }
    }
}

async function updateOrderStatus(req, res) {
    // #swagger.description = 'Aggiorna lo stato di un ordine esistente.<br>Ad ogni aggiornamento viene modificato automaticamente anche il campo <b>updatedAt</b>.<br>Gli stati ammessi sono: <ul><li>Ordinato</li> <li>In preparazione</li> <li>In consegna</li> <li>Consegnato</li></ul>'
    // #swagger.tags = ['Ordini ristorante']
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

    if (!ObjectID.isValid(ordine_id)) {
        return res.status(400).json({ error: 'ID non valido' });
    }

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
}

async function getRestaurantReview(req, res) {
    // #swagger.description = 'Calcola la media delle recensioni ricevute dagli ordini di un ristorante.<br>Vengono considerati soltanto gli ordini che possiedono il campo <b>recensione</b>.<br>Se il ristorante non ha ancora ricevuto recensioni, restituisce <b>media: null</b> e <b>numeroRecensioni: 0</b>.'
    // #swagger.tags = ['Ordini ristorante']
    // #swagger.summary = 'Media recensioni del ristorante'

    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID del ristorante di cui calcolare la media delle recensioni',
        required: true,
        type: 'string'
    } */

    // #swagger.responses[200] = { description: 'Media delle recensioni e numero totale di recensioni del ristorante' }
    // #swagger.responses[400] = { description: 'ID ristorante non valido' }
    // #swagger.responses[500] = { description: 'Errore interno del server' }

    const ristorante_id = req.params.id;

    if (!ObjectID.isValid(ristorante_id)) {
        return res.status(400).json({ error: 'ID ristorante non valido' });
    }

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
}

module.exports = {
    createOrder,
    getOrderById,
    addReview,
    getRestaurantOrders,
    updateOrderStatus,
    getRestaurantReview
};