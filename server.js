const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
app.use(express.urlencoded({extended : true}));
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));


let db;

MongoClient.connect('mongodb+srv://pmc0814:ajaxno9park@teamcolors.cngie.mongodb.net/teamcolors?retryWrites=true&w=majority',{ useUnifiedTopology: true }, function(err, client) {
    if (err) {return console.log(err)};

    db = client.db("fo4teamcolors");

    app.listen(3000, function() {
        console.log("listening on 3000");
    });
});


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.post('/result', function(req, res) {
  res.sendFile(__dirname + '/views/result.html');
  db.collection('teamcolor').find().toArray(function(err, result) {
    for (i=0;i<result.length;i++) {

    }
  });
}); 
