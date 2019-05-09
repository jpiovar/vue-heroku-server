var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var cors = require('cors');

var Promise = require("native-promise-only");

var p = new Promise(function(resolve,reject){
    var a = "aaaaaaaaaaaaaaa11111";
    //setTimeout(function(){
        resolve(a);
    //},5000);
});

var p1 = new Promise(function(resolve,reject){
    var a = "oooookkkkk";
    setTimeout(function(){
        resolve(a);
    },5000);
});

var p3 = function(){
   return 'bbb';
}

p.then(function(msg){
    console.log(msg); // Yay!
}).then(function(){
    console.log('aaaaa222222'); // Yay!
}).then(function(){
    console.log(p3());
});

p1.then(function(jj){console.log(jj);});





var app = express();

app.use(cors());
//app.use(bodyParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());





app.get('*',function(req, res){

     //res.sendFile( __dirname + "/" + "index.html" );
     res.sendFile( __dirname + '/public/index.html' );
});


app.get('/city',function(req, res){
     //res.sendFile( __dirname + "/" + "index.html" );
     console.log('city');
     res.sendFile( __dirname + '/public/index.html' );
});






app.post('/add',function(req, res){
  var thing = req.body.thingInput;
  //var thingDoc = new thingModel({thing: thing});
  console.log(thing);

  //res.setHeader('content-type', 'application/json');
  //res.json({ a: 1 });
  //res.send(thing);
  /*thing.Doc.save(function(){
    res.send();
  });*/
});


app.post('/townAdd',function(req, res){
  var tic = req.body.townItemClient;

  console.log(tic);

  res.setHeader('content-type', 'application/json');
  res.json({ townA: 'server town response' });

});












app.post('/getRecord',function(req, res){
  var actionClient = req.body.action;
  console.log(actionClient);

  getRecord().then(function(items){
    res.setHeader('content-type', 'application/json');
    res.json({ 'responseAction': items });
    res.end();
  });

});










const port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port' + port + '...' + __dirname );
