
/**
 * Module dependencies.
 */

var express = require('express');
var fs = require('fs');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
//  app.register('.htm', require('jade'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});

app.get('/login', function(req, res){
    fs.readFile(__dirname + '/public/SignIn.htm', 'utf8', function(err, text){
        res.send(text);
    });
});

// hardcoded url, what crap, find out public ip, how? if we know this is ec2, we could make a call to metadata service to find out
var CALL_BACK_URL = "http://184.72.101.89/callback";
var MOB_SIGN_URL = "http://184.72.102.84/auth";
app.post('/login', function(req, res){
    var sessionId = req.body.sessionId;
    var uid = req.body.uid;
    var callback = CALL_BACK_URL;

    var siteUrl = url.parse(MOB_SIGN_URL);
    var site = http.createClient(siteUrl.port || 80, siteUrl.host);
    console.log("url = " + JSON.stringify(siteUrl));

    var request = site.request("GET", siteUrl.pathname, {'host' : siteUrl.host});
    request.end();

    request.on('response', function(response) {
        response.setEncoding('utf8');
        console.log('STATUS: ' + response.statusCode);
        response.on('data', function(chunk) {
            console.log("DATA: " + chunk);
        });
    });



});

app.get('/callback', function(req, res){
    var uid = req.query.uid;
    var authed = req.query.authed;

});

var requests = [];
app.get('/pull', function(req, res){
    var uid = req.query.uid;
    
});

app.listen(80);
console.log("Express server listening on port %d", app.address().port);
