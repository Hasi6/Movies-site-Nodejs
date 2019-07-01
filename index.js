const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const expressEdge = require("express-edge");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const Movies = require("./database/models/Movies");
const MoviesSlides = require("./database/models/MoviesSlide");


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

const MoviesSlide = await MoviesSlides.find().limit(12).sort({year: -1});
const movies = await Movies.find().limit(12).sort({year: -1});
res.render("index", {
  movies: movies,
  MoviesSlide: MoviesSlide
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
app.get("/addMovies", (req, res) => {
  res.render("addMovies");
});
app.get("/addMoviesSlide", (req, res) => {
  res.render("addMoviesSlide");
});
app.get("/list", (req, res) => {
  res.render("list");
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
  const singleMovie = await MoviesSlides.findById(req.params.id);
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

app.post("/addMoviesSlide/store", (req, res) => {
  const { image } = req.files

  image.mv(path.resolve(__dirname, 'public/movieSlideImages', image.name), (err)=>{
    MoviesSlides.create({
      ...req.body,
      image: `/movieSlideImages/${image.name}`
    }, (err, post) => {
      res.redirect("/");
    });
  });
});

const port = 5000;

app.listen(port, () => {
  console.log(`App Started at port ${port}`);
});
