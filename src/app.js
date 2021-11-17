const express = require('express');
const app = express();
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const createError = require('http-errors'); // mostrar los errores en la pagina renderizada
const session = require('express-session');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3030;



// se definen las middleware
const softAuthMiddleware = require("./middlewares/softAuthMiddleware");
const recordingMiddleware = require("./middlewares/recordingMiddleware")
const adminMiddleware = require("./middlewares/adminMiddleware");



// se expresa los middlewares a usar
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: "shh",
  resave: false,
  saveUninitialized: false
}))
app.use(recordingMiddleware)
app.use(softAuthMiddleware);

app.set("view engine", "ejs");
app.set("views", ["./src/views", "./src/views/products", "./src/views/users", "./src/views/admin", "./src/views/info"]); 
// cuentan como vistas todas esos directorios, en todos esos lugares hay archivos ejs


// se definen las routes
const rutaMain = require("./routes/main");
const rutaProducts = require("./routes/products");
const rutaUsers = require("./routes/users");
const rutaAdmin = require("./routes/admin");


// se usan las rutas
app.use(rutaMain);
app.use(rutaProducts);
app.use(rutaUsers);
app.use("/administrator", adminMiddleware, rutaAdmin);




// para manejar el error
app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (res.locals.usuario && res.locals.usuario.rol == 1) {
    res.render('error');
  } else {
    url = req.originalUrl
    res.render('error404', {
      url: url
    });
  }

});


// arranca el servidor
app.listen(PORT, () => {
    console.log(`funca bien pa, ${PORT} server personal`);
})






