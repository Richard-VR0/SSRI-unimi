require('dotenv').config();

const dns = require('dns');
dns.setServers(['1.1.1.1', '1.0.0.1']);

const express = require('express');

const cors = require('cors');

const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');

const {
    setup
} = require('./config/dbSetup');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use(express.static('.'));

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', require('./routes/userRoutes'));
app.use('/', require('./routes/restaurantRoutes'));
app.use('/', require('./routes/orderRoutes'));
app.use('/', require('./routes/mealRoutes'));

app.listen(port, async () => {
    await setup();

    console.log('App listening on port ' + port + '\n');
})