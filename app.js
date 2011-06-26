
/**
 * Module dependencies.
 */

var express = require('express');
var fs = require('fs');
var http = require('http');
var url = require('url');
var querystring = require('querystring');

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
    title: 'MobSign Amazon Server'
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
var SITE = "amazon.com";
app.post('/login', function(req, res){
    var sessionId = req.body.sessionId;
    var uid = req.body.uid;
    var callback = CALL_BACK_URL;


    requests[uid] = "continue";


    var siteUrl = url.parse(MOB_SIGN_URL);
    console.log("url = " + JSON.stringify(siteUrl));

    var qs = querystring.stringify({
        "uid": uid,
        "callback": callback,
        "site": SITE,
        "sessionId": "12345" // random for now
    });

    console.log("query string = " + qs);

    var options = {
        host: siteUrl.host,
        port: siteUrl.port || 80,
        path: '/auth?'+qs
    };

    console.log("http options = " + JSON.stringify(options));
    http.get(options, function(response) {
          response.on('data', function(d) {
          });
    }).on('error', function(e) {
          console.log("Got error: " + e.message);
    });

    res.writeHead(302, {
        'Location': 'login'
    });
    res.end();
});

app.get('/callback', function(req, res){
    console.log("all requests: " + JSON.stringify(requests));
    console.log(requests);
    var uid = req.query.uid;
    var authed = req.query.authed;
    console.log("authed = " + authed);
    if (authed == "true") {
        console.log("setting requests." + uid + " to accepted");
        requests[uid] = "accepted";
    } else {
        console.log("setting requests." + uid + " to denied");
        requests[uid] = "denied";
    }
    res.send("success");
});

var requests = {};
app.get('/pull', function(req, res){
    var uid = req.query.uid;
    console.log("pull request uid = " + uid);
    var ret = requests[uid];
    if (ret === undefined) {
        ret = "continue";
    }
    console.log("pull result = " + ret);
    requests[uid] = "continue";
    res.send({"result":ret});    
});

app.listen(80);
console.log("Express server listening on port %d", app.address().port);
