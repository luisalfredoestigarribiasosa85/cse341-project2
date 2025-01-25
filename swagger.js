const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Students API',
        description: 'A student API service with CRUD operations'
    },
    host: 'localhost:3000',
    schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const routes = ['./routes/students.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);