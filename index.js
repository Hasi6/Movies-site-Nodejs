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


const Movies = require("./database/models/Movies");
const Category = require("./database/models/Category");
const Country = require("./database/models/Country");
const User = require("./database/models/User");

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

// connet with database
const connectDb = require("./config/db");
connectDb();

const app = new express();
const mongoStore = connectMongo(expressSession);

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
})

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


app.get("/verify/:userid", verifyEmail);

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
// send Email
app.post("/send", sendEmail);
app.post("/:id/edit/movies", editMovieDetails);
// app.post('/confirmation', confirmationPost);
// app.post('/resend', resendTokenPost);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App Started at port ${port}`);
});




// app.post("/addCategory/store", (req, res) => {
//   Category.create(req.body, (err, post) => {
//     res.redirect("/");
//   });
// });



// app.post("/addCountry/store", (req, res) => {
//   Country.create(req.body, (err, post) => {
//     res.redirect("/");
//   });
// });




// app.get("/horror", (req, res) => {
//   res.render("horror");
// });

// app.get("/addCategory", (req, res) => {
//   res.render("addCategory");
// });
// app.get("/addCountry", (req, res) => {
//   res.render("addCountry");
// });


// app.get("/searchResults/:keyWord/:page", async (req, res) => {
//   try {
//     const searchkey = await req.params.keyWord;
//     const page = await req.params.page;
//     console.log(searchkey);
//     console.log(page);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// app.get("/", async (req, res) => {

//   const movies = await Movies.find().limit(12).sort({year: -1});
// res.render("index", {
//   movies: movies
// });
// });



// get All movies

// get movies sort by name
// app.get("/list/:letter/:page", async (req, res) => {
//   try {
//     let perPage = 3;
//     let page = req.params.page || 1;
//     let letter = req.params.letter;

//     let allMoviesStartedWithLetter = await Movies.find({
//       name: { $regex: new RegExp(`^${letter}`, "i") }
//     }).countDocuments();
//     console.log(allMoviesStartedWithLetter);

//     let lastPage = allMoviesStartedWithLetter / perPage;

//     if (page < 0 || page > lastPage + 1) {
//       res.send("Sorry This page is not available");
//     }

//     let allMovies = await Movies.find({
//       name: { $regex: new RegExp(letter) }
//     })
//       .skip(perPage * page - perPage)
//       .limit(perPage)
//       .sort({ createDate: 1 });
//     res.render("listByName", {
//       allMovies: allMovies,
//       page: page,
//       pages: Math.ceil(lastPage),
//       perPage: perPage,
//       letter: letter
//     });
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// app.get("/search", async (req, res) => {
//   let q = req.query.q;

//   let searchMovies = await Movies.find({
//     name: {
//       $regex: new RegExp(q)
//     }
//   },
//   {
//     _id:0,
//     _v:0
//   }, (err,data)=>{
//     res.json(data)
//   }
//   ).limit(10);
// });

// app.get("searchProcess/:page", async (req, res) => {
//   try {
//     const countMoviesSearch = await Movies.find({
//       description: { $regex: new RegExp(keyWord, "i") }
//     }).countDocuments();

//     let perPage = 1;
//     let page = req.params.page;

//     const searchMovies = await Movies.find({
//       description: { $regex: new RegExp(keyWord, "i") }
//     })
//       .skip(perPage * page - perPage)
//       .limit(perPage)
//       .sort({ createDate: 1 });

//     let lastPage = countMoviesSearch / perPage;

//     console.log(countMoviesSearch);

//     // console.log(keyWord);
//     res.render("searchResults", {
//       searchMovies: searchMovies,
//       countMoviesSearch: countMoviesSearch,
//       page: page,
//       pages: Math.ceil(lastPage),
//       prePage: perPage
//     });
//   } catch (err) {
//     console.error(err.message);
//   }
// });
