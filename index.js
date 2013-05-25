//USE HTTPS 
var fs = require('fs');
var privateKey = fs.readFileSync('privatekey.pem').toString();
var certificate = fs.readFileSync('certificate.pem').toString();

var restify = require('restify'),
    postdata = require('postdata');

//My modules
var userModule = require('./userModule'),
    fileModule = require('./fileModule');

var server = restify.createServer({
  certificate: certificate,
  key: privateKey,
  name: 'MyApp'
});

server.get('/', function(req, res) {
  res.end('Please see the API docs.');
});

//User
server.get('/user/:id', function(req, res) { 
  userModule.getUser(req.params.id, function(err, item) {
    if (err) {
      res.writeHead(404);
      res.end();
    } else {
      res.writeHead(200);
      res.write(item.toString());
      res.end();
    }
  }); 
});

server.post('/user', function(req, res) {
  postdata(req, res, function(err, data) {
    var name = data.name;
    userModule.createUser(name, function(err, item) {
      if (err) {
        res.writeHead(404);
        res.end();
      } else {
        res.writeHead(201);
        res.write(item.toString());
        res.end();
      }
    });
  });
});
server.listen(3000, function() {
  console.log('Server listening on port 3000');
});
