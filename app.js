var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// admin party mode
/*
const nano = require('nano')('http://localhost:5984');
nano.db.create('grow');
const grow= nano.use('grow');
grow.insert({ happy: true}, 'rabbit').then((body) => {
  // do something
});
*/



// no admin party mode
//const nano = require('nano')('http://admin:admin@localhost:5984');

// cookie authentication
/*
function successCallback(result) {
  console.log("successCallback: " + result);
}

function failureCallback(error) {
  console.log("failureCallback: " + error);
}

const nano = require('nano')({url: 'http://localhost:5984', requestDefaults: {jar:true}}),
  username = 'admin',
  userpass = 'admin',
 // db = nano.db.use('mydb');
 db = nano.db.use('alice');

nano.auth(username, userpass).then(successCallback, failureCallback);

nano.session().then((doc) => {
  console.log(doc)
  // { userCtx: { roles: [ '_admin', '_reader', '_writer' ], name: 'rita' },  ok: true }
})
*/
module.exports = app;
