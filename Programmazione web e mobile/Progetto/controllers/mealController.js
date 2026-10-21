const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;

// -----------------------------------------------------------------------------------------------
//                                      INFORMAZIONI PIATTI
// -----------------------------------------------------------------------------------------------

async function getMeals(req, res) {
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
}

async function getMealById(req, res) {
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
}

module.exports = {
    getMeals,
    getMealById
};