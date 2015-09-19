var http = require('http')

var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require("./db")
var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
app.use(app.router);


app.get('/getproject/:id', index.getProject);
app.get('/getprojects', index.getProjects);
app.get('/getuserprojects/:id', index.getUserProjects);
app.get('/getuser/:id', index.getUser);
app.get('/getusers', index.getUsers);
app.post('/postuser', index.postUser);
app.post('/postproject', index.postProject);
app.set('/updateuser', index.updateUser);
app.set('/updateproject', index.updateProject);
app.delete('/dropproject/:id', index.dropProject);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
    //if (req.is('text/*')) {
    //    req.text = '';
    //    req.setEncoding('utf8');
    //    req.on('data', function (chunk) { req.text += chunk });
    //    req.on('end', next);
    //} else {
    //    next();
    //}
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

http.createServer(app).listen(3000, function () {
    console.log("Server running at port 3000");
});

module.exports = app;