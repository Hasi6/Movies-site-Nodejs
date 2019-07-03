const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const expressEdge = require("express-edge");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const Movies = require("./database/models/Movies");
const Category = require("./database/models/Category");
const Country = require("./database/models/Country");


const app = new express();

app.use(express.static("public"));

// connet with database
mongoose.connect(
  "mongodb://localhost/movies-test",
  { useNewUrlParser: true },
  () => {
    console.log("Connected to the database");
  }
);

app.use(fileUpload());

app.use(expressEdge);

app.set("views", `${__dirname}/views`);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


// Get requests

app.get("/", async (req, res) => {

const MoviesSlide = await Movies.find().limit(12).sort({createDate: -1});
const movies = await Movies.find().limit(12).sort({createDate: -1});
const MoviesHeaders = await Movies.find().limit(12).sort({createDate: -1});
const RatingMovies = await Movies.find().limit(12).sort({idbmRating: -1});
const popularMovies = await Movies.find().limit(3);
const popularActionMovies = await Movies.find({category: 'Action'}).limit(6);
res.render("index", {
  movies: movies,
  MoviesSlide: MoviesSlide,
  MoviesHeaders: MoviesHeaders,
  RatingMovies: RatingMovies,
  popularMovies: popularMovies,
  popularActionMovies: popularActionMovies
});
});

// app.get("/", async (req, res) => {

//   const movies = await Movies.find().limit(12).sort({year: -1});
// res.render("index", {
//   movies: movies
// });
// });

app.get("/comedy", (req, res) => {
  res.render("comedy");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/faq", (req, res) => {
  res.render("faq");
});
app.get("/genres", (req, res) => {
  res.render("generes");
});
app.get("/horror", (req, res) => {
  res.render("horror");
});
app.get("/addMovies", async (req, res) => {
  const countries = await Country.find().sort({createDate: -1});
  const categories = await Category.find().sort({createDate: -1})
  res.render("addMovies",{
    countries: countries,
    categories: categories,
  });
});
app.get("/addCategory", (req, res) => {
  res.render("addCategory");
});
app.get("/addCountry", (req, res) => {
  res.render("addCountry");
});

// get All movies
app.get("/list/:page", async (req, res) => {
  let perPage = 1;
  let page = req.params.page || 1;

  let allMoviesCount = await Movies.count();
  let lastPage = allMoviesCount / perPage;

  if(page < 0 || page > lastPage + 1){
    res.send("Sorry This page is not available");
  }

  let allMovies = await Movies.find().skip((perPage * page) - perPage)
  .limit(perPage).sort({createDate: 1});
  res.render("list",{
    allMovies: allMovies,
    page: page,
    pages: Math.ceil(lastPage),
    perPage:perPage
  });
});

// get movies sort by name
app.get("/list/:letter/:page", async (req, res) => {
  let perPage = 1;
  let page = req.params.page || 1;
  let letter = req.params.letter || 'a';


  let allMoviesStartedWithLetter = await Movies.find({name : {$regex : '^{letter}', $options: 'i'}}).count();

  let lastPage = allMoviesStartedWithLetter / perPage;

  if(page < 0 || page > lastPage + 1){
    res.send("Sorry This page is not available");
  }

  let allMovies = await Movies.find({name : {$regex : '^a', $options: 'i'}}).skip((perPage * page) - perPage)
  .limit(perPage).sort({createDate: 1});
  res.render("listByName",{
    allMovies: allMovies,
    page: page,
    pages: Math.ceil(lastPage),
    perPage:perPage
  });
});




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

app.get("/single/:id", async (req, res) => {
  const singleMovie = await Movies.findById(req.params.id);
  res.render("single",{
    singleMovie: singleMovie
});
});

app.get("/single", async (req, res) => {
  res.render("single");
});

app.get("*", (req, res) => {
  res.send("Sorry No Pages Found");
});

// Post requests
app.post("/addMovies/store", (req, res) => {
  const { image } = req.files

  image.mv(path.resolve(__dirname, 'public/movieImages', image.name), (err)=>{
    Movies.create({
      ...req.body,
      image: `/movieImages/${image.name}`
    }, (err, post) => {
      res.redirect("/");
    });
  });
});

app.post("/addCategory/store", (req, res) => {
  Category.create(req.body, (err, post) => {
    res.redirect("/");
  });
});

app.post("/addCountry/store", (req, res) => {
    Country.create(req.body, (err, post) => {
      res.redirect("/");
    });
  });

const port = 5000;

app.listen(port, () => {
  console.log(`App Started at port ${port}`);
});
