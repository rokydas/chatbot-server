const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const user = process.env.USER;
const password = process.env.PASSWORD;
const dbName = process.env.DB;

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${user}:${password}@cluster0.vetwi.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("Tasks").collection("todos");
    // console.log('database connected');
    // client.close();
});


app.get('/', (req, res) => {
    res.send('Hello I am your new node js project');
})

app.listen(5000); 