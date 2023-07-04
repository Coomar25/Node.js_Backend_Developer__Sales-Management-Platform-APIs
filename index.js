import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 5000;
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send("Hello World"));
app.listen(port, () => {
    console.log(`Currently running server on given port: http://localhost:${port}`);
})