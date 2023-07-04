import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import RoutingUsers from './routes/users.js';

const app = express();
const port = 9000;
app.use(bodyParser.json());
app.use(cors());
app.use('/', RoutingUsers);

app.get('/', (req, res) => res.send("Hello World"));
app.get('*', (req, res) => res.send('Seems like the given url does'));
app.listen(port, () => {
    console.log(`Currently running server on given port: http://localhost:${port}`);
})