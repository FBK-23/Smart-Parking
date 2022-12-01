var createError = require('http-errors');
var express = require('express');
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
var db = require('./models/db')
var userController = require('./Controller/UserController');
var adminController = require('./Controller/AdminController');
var path = require("path");
const userDir= "./utils/back-config"
let environment = require(userDir)


var session = require('express-session');
//CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
  res.header('Access-Control-Allow-Credentials',true);
  next();
}
app.use(allowCrossDomain);
app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/user', userController);
app.use('/api/admin', adminController);
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


var server = app.listen(`${environment.SERVER_PORT}`, function() {
  console.log('Ready on port %d', `${environment.SERVER_PORT}`);
});




module.exports = app;
