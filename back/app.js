const express      = require('express');
const app          = express();
const path         = require('path');
const router       = express.Router();
const favicon      = require('serve-favicon');
//const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const cors         = require('cors');

const index = require('./routes/index');
const users = require('./routes/users');
//const profile = require('./routes/users/:id');
//const feed = require('./routes/feed');


//Database connection
const mongoose = require("mongoose");
//mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/meanApplication")
 .then(console.log("Connected to DB!!"));
//mongoose.connect('mongodb://deb:212436@ds215019.mlab.com:15019/irongram') sandbox


// Middleware
app.use(cors()); // after go to production you can delete this
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(cookieParser());

// view engine setup, connect server with Angular
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/front/dist/index.html'));
// });


app.use('/', index);
app.use('/users', users);
//app.use('/users/:id', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

// Start Server: Listen on port 3000
app.listen(3000, () => {
  console.log('Listening on port 3000');
});

module.exports = app;
