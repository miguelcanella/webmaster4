var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var nosotrosRouter = require("./routes/nosotros");
var contactoRouter = require("./routes/contacto");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use("/nosotros",nosotrosRouter);
app.use("/contacto",contactoRouter);

app.get("/nosotros" , function(reg, res){
  res.send("Hola soy una página de nosotros")
})
app.get("/servicios" , function(reg, res){
  res.send("Hola soy una página de servicios")
})
app.get("/galeria" , function(reg, res){
  res.send("Hola soy una página de galeria")
})
app.get("/contacto" , function(reg, res){
  res.send("Hola soy una página de contacto")
})


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

module.exports = app;
