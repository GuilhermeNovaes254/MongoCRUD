const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended:true}))
app.set('view engine', 'ejs');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://crud-node:<password>@cluster0.kxcxw.mongodb.net/<namedb>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


client.connect(err => {
    if(err) return console.log(err)
    db = client.db('names')
    console.log("Criando conexão")
    app.listen(3000, function () {
        console.log("server running on port 3000");
    })
});



app.get('/', function (req, res) {
    res.render('index.ejs');
})

app.post('/show', function (req, res) {
    db.collection('data').save(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log('salvo no banco de dados')
        res.redirect('/show')
        db.collection('data').find().toArray((err, results)=>{
            console.log(results);
        })
    })

})

app.get('/show', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', { data: results })

    })
})

