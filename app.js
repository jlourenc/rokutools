var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHandlebars = require('express-handlebars');

var app = express();
var handlebars = expressHandlebars.create({
    defaultLayout: 'default',
    extname      : '.html',
    partialsDir: [
      'views/partials/',
      'views/modules/'
    ]
});

// view engine setup
app.engine('html', handlebars.engine);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));



var index = require('./routes/index');
var modules = require('./routes/modules');
var api = require('./routes/api')

app.use('/api', api);

app.use('/dashboard', modules);
app.use('/memory-analyser', modules);
app.use('/remote', modules);
app.use('/secret-screens', modules);

if (app.get('env') === 'development') {
    app.use('/', index);

    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            status: err.status,
            message: err.message,
            error: err
        });
    });
} else {
    app.use('/*', index);
}

module.exports = app;
