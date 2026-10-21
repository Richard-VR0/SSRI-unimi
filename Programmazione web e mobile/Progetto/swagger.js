const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0', autoBody: false});

const doc = {
    info: {
        title: 'PWM - DomiCibo API',
        description: 'Swagger di DomiCibo'
    },
    host: 'localhost:3000'
};

const outputFile = './swagger.json';
const inputFiles = [
    './routes/userRoutes.js',
    './routes/restaurantRoutes.js',
    './routes/orderRoutes.js',
    './routes/mealRoutes.js'
];

swaggerAutogen(outputFile,inputFiles, doc);