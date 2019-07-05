const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const expressEdge = require("express-edge");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const nodemailer = require("nodemailer");

const Movies = require("./database/models/Movies");
const Category = require("./database/models/Category");
const Country = require("./database/models/Country");
const User = require("./database/models/User");

const app = new express();

app.use(express.static("public"));

// connet with database
const connectDb = require("./config/db");

connectDb();

app.use(fileUpload());

app.use(expressEdge);

app.set("views", `${__dirname}/views`);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// Get requests

app.get("/", async (req, res) => {
  const MoviesSlide = await Movies.find()
    .limit(12)
    .sort({ createDate: -1 });
  const movies = await Movies.find()
    .limit(12)
    .sort({ createDate: -1 });
  const MoviesHeaders = await Movies.find()
    .limit(12)
    .sort({ createDate: -1 });
  const RatingMovies = await Movies.find()
    .limit(12)
    .sort({ idbmRating: -1 });
  const popularMovies = await Movies.find().limit(3);
  const popularActionMovies = await Movies.find({
    category: { $regex: new RegExp("action", "i") }
  }).limit(4);
  const popularComedyMovies = await Movies.find({
    category: { $regex: new RegExp("comedy", "i") }
  }).limit(4);

  res.render("index", {
    movies: movies,
    MoviesSlide: MoviesSlide,
    MoviesHeaders: MoviesHeaders,
    RatingMovies: RatingMovies,
    popularMovies: popularMovies,
    popularActionMovies: popularActionMovies,
    popularComedyMovies: popularComedyMovies
  });
});

// app.get("/", async (req, res) => {

//   const movies = await Movies.find().limit(12).sort({year: -1});
// res.render("index", {
//   movies: movies
// });
// });

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
  try {
    const countries = await Country.find().sort({ createDate: -1 });
    const categories = await Category.find().sort({ createDate: -1 });
    res.render("addMovies", {
      countries: countries,
      categories: categories
    });
  } catch (err) {
    console.error(err.message);
  }
});
app.get("/addCategory", (req, res) => {
  res.render("addCategory");
});
app.get("/addCountry", (req, res) => {
  res.render("addCountry");
});

// get All movies

app.get("/list/:page", async (req, res) => {
  try {
    let perPage = 1;
    let page = req.params.page || 1;

    let allMoviesCount = await Movies.countDocuments();
    let lastPage = allMoviesCount / perPage;

    if (page < 0 || page > lastPage + 1) {
      res.send("Sorry This page is not available");
    }

    let allMovies = await Movies.find()
      .skip(perPage * page - perPage)
      .limit(perPage)
      .sort({ createDate: 1 });
    res.render("list", {
      allMovies: allMovies,
      page: page,
      pages: Math.ceil(lastPage),
      perPage: perPage
    });
  } catch (err) {
    console.error(err.message);
  }
});

// get movies sort by name
app.get("/list/:letter/:page", async (req, res) => {
  try {
    let perPage = 3;
    let page = req.params.page || 1;
    let letter = req.params.letter;

    let allMoviesStartedWithLetter = await Movies.find({
      name: { $regex: new RegExp(`^${letter}`, "i") }
    }).countDocuments();
    console.log(allMoviesStartedWithLetter);

    let lastPage = allMoviesStartedWithLetter / perPage;

    if (page < 0 || page > lastPage + 1) {
      res.send("Sorry This page is not available");
    }

    let allMovies = await Movies.find({
      name: { $regex: new RegExp(letter) }
    })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .sort({ createDate: 1 });
    res.render("listByName", {
      allMovies: allMovies,
      page: page,
      pages: Math.ceil(lastPage),
      perPage: perPage,
      letter: letter
    });
  } catch (err) {
    console.error(err.message);
  }
});

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

app.get("/news", (req, res) => {
  res.render("news");
});
app.get("/admin", (req, res) => {
  res.render("adminarea");
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
  let id = req.params.id;
  console.log(id);
  try {
    const singleMovie = await Movies.findById(id);
    res.render("single", {
      singleMovie: singleMovie
    });
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/single", async (req, res) => {
  try {
    res.render("single");
  } catch (err) {
    console.error(err.message);
  }
});

app.get("*", (req, res) => {
  res.send("Sorry No Pages Found");
});

// Post requests
app.post("/addMovies/store", (req, res) => {
  Movies.create(req.body, (err, post) => {
    res.redirect("/");
  });
});

app.post("/addCategory/store", (req, res) => {
  Category.create(req.body, (err, post) => {
    res.redirect("/");
  });
});

app.post("/searchProcess/:page", async (req, res) => {
  try {
    const keyWord = req.body.search;

    let perPage = 1;
    let page = req.params.page || 1;

    console.log(keyWord);

    const searchMovies = await Movies.find({
      description: { $regex: new RegExp(keyWord, "i") }
    })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .sort({ createDate: 1 });

    const countMoviesSearch = await Movies.find({
      description: { $regex: new RegExp(keyWord, "i") }
    }).countDocuments();

    let lastPage = countMoviesSearch / perPage;

    console.log(countMoviesSearch);

    // console.log(keyWord);
    res.render("searchResults", {
      searchMovies: searchMovies,
      countMoviesSearch: countMoviesSearch,
      page: page,
      pages: Math.ceil(lastPage),
      prePage: perPage
    });
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/users/register", async (req, res) => {
  try {
    User.create(req.body, (err, user) => {
      res.redirect("/");
    });
  } catch (err) {
    console.error(err.message);
  }
});

// send Email
app.post("/send", async (req, res) => {
  try {
    console.log(req.body);
    const output = `
    <p>You Have a new Contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>First Name : ${req.body.firstname}</li>
      <li>Last Name : ${req.body.lastname}</li>
      <li>Email : ${req.body.email}</li>
      <li>Subject : ${req.body.subject}</li>
      <li>Message : ${req.body.message}</li>
    </ul>

    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'hasitha.chandula96@gmail.com', // generated ethereal user
        pass: 'Freedom6@' // generated ethereal password
      }
    });

    // send mail with defined transport object
    const mailOptions = {
      from: 'hasitha.chandula96@gmail.com', // sender address
      to: 'hasitha.chandula@gmail.com', // list of receivers
      subject: 'Subject of your email', // Subject line
      html: output// plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info);
   });

    res.render("contact", {msg: 'Email Has Been Sent'});
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/searchResults/:keyWord/:page", async (req, res) => {
  try {
    const searchkey = await req.params.keyWord;
    const page = await req.params.page;
    console.log(searchkey);
    console.log(page);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/search", (req, res) => {
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
