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
  let abilityArray = req.body.ability;
  if (typeof(abilityArray) == 'string') {
    abilityArray = [];
    abilityArray.push(req.body.ability);
  }
  db.collection('teamcolor').find().toArray(function(err, result) {
    let resultArray = [];
    let total = 0;
    for (i=0;i<result.length;i++) {
      let cnt = 0;
      let teamAbility = [result[i].item1, result[i].item2, result[i].item3];
      for (stat of abilityArray) {
        let regex = new RegExp('\^'+ stat + ' +');
        for (item of teamAbility) {
          if (regex.test(item)) {
            cnt ++;
          }
        }
      }
      if (abilityArray.length == cnt) {
        resultArray.push(result[i]);
        total ++;
      }
      cnt = 0;
    }
    if (!total) {
      res.sendFile(__dirname + '/views/error.html');
    } else {
      res.render('list.ejs', { posts : resultArray });
    }
  });
}); 



