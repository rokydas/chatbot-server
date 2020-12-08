const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const user = process.env.USER;
const password = process.env.PASSWORD;
const dbName = process.env.DB;

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${user}:${password}@cluster0.muwip.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const qaCollection = client.db("chatbot").collection("qa");

    app.get('/', (req, res) => {
        res.send('Hello I am your new node js project');
    })

    app.get('/qa', (req, res) => {
        qaCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    app.post('/insert', (req, res) => {
        const question = req.body.question;
        const answer = req.body.answer;
        const email = req.body.email;

        if (question && answer && email) {
            qaCollection.insertOne({ question, answer, email })
                .then(result => {
                    res.send(result.insertedCount > 0)
                })
        }



    })

    app.post('/delete', (req, res) => {
        qaCollection.deleteOne({"_id": ObjectId(req.body.id)})
            .then(result => {
                res.send(result.deletedCount > 0);
            })
    });

});

app.listen(5000); 