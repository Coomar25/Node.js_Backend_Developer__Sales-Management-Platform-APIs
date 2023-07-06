import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import RoutingUsers from './routes/users.js';
import { home } from './controller/user.js'

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();
const swaggerDocument = YAML.load('./api.yaml');
const port = 9000;
app.use(bodyParser.json());
app.use(cors());
app.use('/', RoutingUsers);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', home);
app.get('*', (req, res) => res.send('Seems like the given url does not exist'));
app.listen(port, () => {
    console.log(`Currently running server on given port: http://localhost:${port}`);

    console.log('Swagger UI is running on: http://localhost:9000/api-docs');
})