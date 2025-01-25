const express = require('express');
const app = express();
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());
app.use('/', require('./routes/students'));

mongodb.initDb((err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Connected to MongoDB');
    }
    try {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (err) {
        console.error(err);
    }
});