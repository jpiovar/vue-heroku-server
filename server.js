var express = require('express');
// const http = require('http');
var bodyParser = require('body-parser');
var path = require('path');

const mockCredentials = require('./mockData/allowedCredentials.json');
const mockInitialData = require('./mockData/initialData.json');


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
// app.use(bodyParser());

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// app.use((req, res, next) => {
//     const error = new Error("Not found");
//     error.status = 404;
//     next(error);
// });

// app.use((error, req, res, next) => {
//     res.status(error.status || 500 );
//     res.json({
//         error: {
//             message: error.message
//         }
//     })
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());





// app.get('*',function(req, res){
//     console.log(req);
//      console.log('* get called');
//      res.sendFile( __dirname + '/public/index.html' );
// });


app.get('/city',function(req, res){
     console.log('city');
     res.status(200).sendFile( __dirname + '/public/index.html' );
});



app.get('/api/orders', (req, res, next) => {
    console.log('orders');
    res.status(200).json('orders ok');
});

app.get('/api/users', (req, res, next) => {
  console.log('users', mockCredentials);
  let users = mockCredentials;
  res.status(200).json(users);
});

app.get('/api/authenticate', (req, res, next) => {
  const params = JSON.parse(req.query.params);
  console.log('authenticate', params);
  const { name, password } = params;
  console.log(name, ' ', password);
  let users = mockCredentials;
  const up = users.filter(item => item.name === name && item.password === password);
  console.log('users ', users);
  console.log('mockInitialData', mockInitialData);
  console.log('up ', up);
  if (up && up.length > 0) {
    res.status(202).json({
      statusCase: 'ok',
      msg:'authentication done',
      id: up[0].id,
      name: up[0].name,
      email: up[0].email
    });
  } else if (up && up.length === 0) {
    res.status(202).json({
      statusCase: 'failed',
      msg: 'authentication failed, wrong credentials' });
  }
});

app.get('/api/initialData', (req, res, next) => {
  res.status(202).json(mockInitialData);
});

app.post('/api/authenticate',function(req, res){
  const credentials = req.body.credentials;
  console.log('credentials ', credentials);
  // const params = JSON.parse(credentials);
  // console.log('authenticate', params);
  const { name, password } = credentials;
  console.log(name, ' ', password);
  let users = mockCredentials;
  const up = users.filter(item => item.name === name && item.password === password);
  console.log('users ', users);
  console.log('mockInitialData', mockInitialData);
  console.log('up ', up);
  if (up && up.length > 0) {
    res.status(202).json({
      statusCase: 'ok',
      msg:'authentication done',
      id: up[0].id,
      name: up[0].name,
      email: up[0].email
    });
  } else if (up && up.length === 0) {
    res.status(202).json({
      statusCase: 'failed',
      msg: 'authentication failed, wrong credentials' });
  }
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
