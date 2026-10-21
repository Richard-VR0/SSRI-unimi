const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;

async function setup() {
    let client;

    try {
        client = await MongoClient.connect(process.env.MONGOURL);
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
    } catch (error) {
        console.error("Errore durante il setup del database:", error);
    } finally {
        if (client) {
            await client.close();
        }
    }
}

module.exports = { setup };