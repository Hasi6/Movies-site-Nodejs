const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const expressEdge = require("express-edge");
const edge = require('edge.js');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const config = require("config");
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');

const Movies = require('./database/models/Movies');

// define routes
const home = require('./routes/home');
const contact = require('./routes/contact');
const faq = require('./routes/faq');
const genresCategory = require('./routes/genresCategory');
const genresCountry = require('./routes/genresCountry');
const addMovies = require('./routes/addMovies');
const updateViews = require('./routes/updateViews');
const allMoviesSort = require('./routes/allMoviesSort');
const adminArea = require('./routes/adminArea');
const singleMovie = require('./routes/singleMovie');
const notFound = require('./routes/notFound');
const moviesStore = require('./routes/moviesStore');
const search = require('./routes/search');
const userRegister = require('./routes/userRegister');
const userLogin = require('./routes/userLogin');
const sendEmail = require('./routes/sendEmail');
const searchMovie = require('./routes/searchMovie');
const verify = require('./routes/verify');
const getToken = require('./routes/getToken');
const verifyEmail = require('./routes/verifyEmail');
const logout = require('./routes/logout');
const deleteMovie = require('./routes/delete');
const editMovie = require('./routes/edit');
const editMovieDetails = require('./routes/editMovieDetails');
const subscribe = require('./routes/subscribe');
const unsubscribe = require('./routes/unsubscribe');
const comments = require('./routes/comments');
const news = require('./routes/news');
const addNews = require('./routes/addNews');

// connet with database
const connectDb = require("./config/db");
connectDb();

const app = new express();
const mongoStore = connectMongo(expressSession);

// set sessions globaly
app.use(expressSession({
  secret: 'secret',
  store: new mongoStore({
    mongooseConnection: mongoose.connection
  })
}))

app.use(express.static("public"));



app.use(fileUpload());
app.use(expressEdge);
app.set("views", `${__dirname}/views`);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// all requsets this middleware will execute
// share session globally then we can display login log out like that conditionally
app.use('*', async (req,res,next)=>{
  edge.global('auth', req.session.userId);
  next();
});

// Get requests
app.get("/", home);
app.get("/contact", contact);
app.get("/faq", faq);
app.get("/addMovies", addMovies);
// update Views
app.get("/update/:id", updateViews);
app.get("/list/:page", allMoviesSort);
app.get("/admin", adminArea);
app.get("/single/:id", singleMovie);
app.get("/searchResults/:searchKey/:page", searchMovie);
app.get("/verifies/:id", verify);
app.get("/logout", logout);
app.get("/delete/:id", deleteMovie);
app.get("/edit/:id", editMovie);
app.get("/genres/category/:category/:page", genresCategory);
app.get("/genres/country/:country/:page", genresCountry);
app.get("/addNews", addNews);


app.get("/verify/:userid", verifyEmail);

app.get('/search', async(req, res, next)=>{
    var q = req.query.q;
    try{
    const result = await Movies.find({
        name: {
          $regex: new RegExp(q, "i")
        }}).limit(10);
        res.send(result);
      }catch(err){
        console.error(err.message);
      }
});

app.get("*", notFound);

app.get("/news", (req, res) => {
  res.render("news");
});
app.get("/news-single", (req, res) => {
  res.render("news-single");
});
app.get("/series", (req, res) => {
  res.render("series");
});
app.get("/short-codes", (req, res) => {
  res.render("short-codes");
});


// Post requests
app.post("/addMovies/store", moviesStore);
app.post("/verifies/:id/token", getToken);
app.post("/searchProcess", search);
app.post("/users/register", userRegister);
app.post("/users/login", userLogin);
app.post("/subscribe", subscribe);
app.post("/unsubscribe", unsubscribe);
app.post("/comments/:id", comments);
app.post("/news", news);
// send Email
app.post("/send", sendEmail);
app.post("/:id/edit/movies", editMovieDetails);
// app.post('/confirmation', confirmationPost);
// app.post('/resend', resendTokenPost);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App Started at port ${port}`);
});

