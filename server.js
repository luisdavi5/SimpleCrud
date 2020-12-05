const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const crypt = require('cryptr')
const Cryptr = new crypt('minhasenha')

const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://LuisDavi:jaclecle12@cluster0.sn7jc.mongodb.net/Crud-Api?retryWrites=true&w=majority';

app.use(bodyParser.urlencoded({extended: true}));


const client = new MongoClient (uri, {useNewUrlParser: true, useUnifiedTopology: true });

client.connect (err => {
    if (err) return console.log(err);

    db = client.db('Crud-Api');
    app.listen(9032, () => console.log("Server running on port 9032"));
});

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/show', (req, res) => {
    //criptografa o req.body
    const dateCrypt = Cryptr.encrypt(req.body.name);
    //req.body.name = ao .name criptografado
    req.body.name = dateCrypt;

    //Salva no banco de dados
    db.collection('data').save(req.body, (err, result)=>{
       if(err) return console.log(err);
        //avisa que salvou no banco de dados
        console.log('Saved in data base');
        res.redirect('/');
   });
});
