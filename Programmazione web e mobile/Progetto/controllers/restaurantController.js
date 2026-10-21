const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;

// -----------------------------------------------------------------------------------------------
//                                          LISTA RISTORANTI
// -----------------------------------------------------------------------------------------------

async function getRestaurants(req, res) {
    // #swagger.description = 'Restituisce l\'elenco di tutti i ristoranti registrati sulla piattaforma, ovvero di tutti gli utenti con il campo tipologia uguale a <b>"ristorante"</b>'
    // #swagger.tags = ['Lista ristoranti']
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
}

async function searchRestaurants(req, res) {
    // #swagger.description = 'Cerca tra i ristoranti registrati filtrando per nome del ristorante o città, tramite corrispondenza parziale e case-insensitive.<br>Se il parametro <b>query</b> non viene fornito, restituisce l\'elenco completo dei ristoranti.'
    // #swagger.tags = ['Lista ristoranti']
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
}

// -----------------------------------------------------------------------------------------------
//                              VETRINA RISTORANTE (DETTAGLI + MENU)
// -----------------------------------------------------------------------------------------------

async function getRestaurantById(req, res) {
    // #swagger.description = 'Restituisce i dati completi di un singolo ristorante a partire dal suo ID.'
    // #swagger.tags = ['Vetrina ristorante']
    // #swagger.summary = 'Dati ristorante'

    /* #swagger.parameters['id'] = {
        description: 'ID del ristorante da recuperare',
        required: true,
        type: 'string'
    } */

    // #swagger.responses[200] = { description: 'Dati del ristorante' }
    // #swagger.responses[400] = { description: 'ID ristorante non valido' }
    // #swagger.responses[500] = { description: 'Errore interno del server' }

    let client;

    const id = req.params.id;
    
    if (!ObjectID.isValid(id)) {
        return res.status(400).json({ error: 'ID ristorante non valido' });
    }

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
}

async function getRestaurantMenu(req, res) {
    // #swagger.description = 'Restituisce tutti i piatti disponibili del menu del ristorante identificato dall\'ID.<br>Per ogni piatto vengono restituiti il prezzo configurato dal ristoratore e le informazioni del catalogo, come nome, categoria, area, foto, ingredienti, dosi e istruzioni.'
    // #swagger.tags = ['Vetrina ristorante']
    // #swagger.summary = 'Lista piatti disponibili'

    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID del ristorante di cui recuperare il menu',
        required: true,
        type: 'string'
    } */

    // #swagger.responses[200] = { description: 'Lista dei piatti disponibili nel menu del ristorante' }
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
}

async function searchRestaurantMenu(req, res) {
    // #swagger.description = 'Cerca tra i piatti disponibili del menu di un ristorante.<br>La ricerca può filtrare per nome del piatto tramite il parametro <b>query</b>, per categoria tramite il parametro <b>categoria</b>, oppure per entrambi i parametri contemporaneamente.'
    // #swagger.tags = ['Vetrina ristorante']
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
    // #swagger.responses[400] = { description: 'ID ristorante non valido' }
    // #swagger.responses[500] = { description: 'Errore interno del server' } */

    const ristorante_id = req.params.id;

    if (!ObjectID.isValid(ristorante_id)) {
        return res.status(400).json({ error: 'ID ristorante non valido' });
    }

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
}

// -----------------------------------------------------------------------------------------------
//                                      GESTIONE MENU
// -----------------------------------------------------------------------------------------------

async function manageRestaurantMenu(req, res) {
    // #swagger.description = 'Restituisce tutti i piatti disponibili nel catalogo comune.<br>Ogni piatto viene arricchito con le informazioni relative al menu del ristorante indicato: <b>inMenu</b> specifica se il piatto è già presente nel menu, <b>prezzo</b> contiene il prezzo definito dal ristoratore e <b>menu_id</b> identifica il documento del piatto nella collezione del menu.<br>Se il piatto non è presente nel menu, i campi <b>prezzo</b> e <b>menu_id</b> sono <b>null</b>.'
    // #swagger.tags = ['Gestione menu']
    // #swagger.summary = 'Gestione menu del ristorante'

    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID del ristorante di cui recuperare la configurazione del menu',
        required: true,
        type: 'string'
    } */

    // #swagger.responses[200] = { description: 'Catalogo dei piatti con informazioni sulla presenza nel menu del ristorante' } */
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
}

async function saveRestaurantMenu(req, res) {
    // #swagger.description = 'Salva la configurazione completa del menu di un ristorante.<br>I piatti nuovi senza prezzo valido o con prezzo minore o uguale a zero non vengono inseriti.<br>Per ogni piatto ricevuto gestisce tre casi:<ul><li>Se il piatto è selezionato e non era già nel menu, viene inserito con il prezzo indicato</li><li>Se il piatto è selezionato ed è già nel menu, viene aggiornato il prezzo</li><li>Se il piatto non è selezionato ma è presente nel menu, viene rimosso.</li></ul>'
    // #swagger.tags = ['Gestione menu']
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

    if (!ObjectID.isValid(ristorante_id)) {
        return res.status(400).json({ error: 'ID non valido' });
    }

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
}

module.exports = {
    getRestaurants,
    searchRestaurants,
    getRestaurantById,
    getRestaurantMenu,
    searchRestaurantMenu,
    manageRestaurantMenu,
    saveRestaurantMenu
};