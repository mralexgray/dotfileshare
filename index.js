var restify = require('restify'),
    postdata = require('postdata');

//My modules
var userModule = require('./userModule'),
    fileModule = require('./fileModule');

var server = restify.createServer();

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

server.put('/user/:id', function(req, res) {
  postdata(req, res, function(err, data) {
    console.log(req);
    var toAppend = data.appendFile;
    userModule.updateUser(req.params.id, toAppend, function(err, item) {
      if (err) {
        res.writeHead(404);
        res.end();
      } else {
        res.writeHead(202);
        res.write(item.toString());
        res.end();
      }
    });
   });
});

//Files
server.get('/file/:id', function(req, res) { 
  fileModule.getFile(req.params.id, function(err, item) {
    if (err) {
      res.writeHead(404);
      res.end();
    } else {
      res.writeHead(200);
      res.write(item.toString());
      res.write(item[0].contents.toString());
      res.end();
    }
  }); 
});

server.post('/file', function(req, res) {
  postdata(req, res, function(err, data) {
    var file = data.file;
    fileModule.createFile(file, function(err, item) {
      if (err) {
        res.writeHead(404);
        res.end();
      } else {
        res.writeHead(201);
        res.write(item.toString());
        res.write(item.contents.toString());
        res.end();
      }
    });
  });
});

server.put('/file/:id', function(req, res) {
  postdata(req, res, function(err, data) {
    //console.log(req);
    var toAppend = data.file;
    console.log('to append is', data.file);
    fileModule.updateFile(req.params.id, new Buffer(toAppend),
      function(err, item) {
      if (err) {
        res.writeHead(404);
        res.end();
      } else {
        res.writeHead(202);
        res.write(item.toString());
        res.write(item.contents.toString());
        res.end();
      }
    });
   });
});

server.put('/file/:id/star', function(req, res) {
  fileModule.starFile(req.params.id, function(err, item) {
    if (err) {
      console.log(err);
      res.writeHead(404);
      res.end();
    } else {
      res.writeHead(200);
      res.write(item.toString());
      res.end();
    }
  });
});


//Undocumented & Untested
server.get('/files/popular', function(req, res) {
  fileModule.mostPopular(function(err, item) {
    res.writeHead(200);
    res.write(item.toString());
    res.end();
  });
});

server.listen(process.env.PORT || 5000, function() {
  console.log('Server listening on port 5000');
});
