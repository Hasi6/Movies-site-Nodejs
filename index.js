const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const expressEdge = require("express-edge");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const config = require("config");
const randomString = require('randomstring');

const Movies = require("./database/models/Movies");
const Category = require("./database/models/Category");
const Country = require("./database/models/Country");
const User = require("./database/models/User");

// define routes
const home = require('./routes/home');
const contact = require('./routes/contact');
const faq = require('./routes/faq');
const genres = require('./routes/genres');
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
app.get("/", home);
app.get("/contact", contact);
app.get("/faq", faq);
app.get("/genres", genres);
app.get("/addMovies", addMovies);
// update Views
app.get("/update/:id", updateViews);
app.get("/list/:page", allMoviesSort);
app.get("/admin", adminArea);
app.get("/single/:id", singleMovie);
app.get("/searchResults/:searchKey/:page", searchMovie);
app.get("/verifies/:id", verify);
app.post("/verifies/:id/token", getToken);

app.get("/verify/:userid",async (req, res) => {
  try {
    let user = await User.findById(req.params.userid);
    if(!user){
      return res.json("Not Found");
    }
    if(user.confirmed){
      return res.redirect('/');
    }
    const token = randomString.generate();
    await User.findByIdAndUpdate(user, {userToken: token});

    user = await User.findById(req.params.userid);

    // oYZNs0pnmrauyd4m3Fqasapd6cLWzNeO
    const output = `
      <p>You Have a new Contact request</p>
      <h3>Contact Details</h3>
      <ul>
        <li>Token : ${user.userToken}</li>
      </ul>
      <h3>Message</h3>
    `;
    // let testAccount = await nodemailer.createTestAccount();

    var nodeoutlook = require("nodejs-nodemailer-outlook");
    nodeoutlook.sendEmail({
      auth: {
        user: "coweb191p-014@student.nibm.lk",
        pass: "MSIGL638rc"
      },
      from: "coweb191p-014@student.nibm.lk",
      to: user.email,
      subject: "Movies Message",
      html: output,

      onError: e => console.log(e),
      onSuccess: i => console.log(i)
    });
    

    // create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: "hasitha.chandula96@gmail.com", // generated ethereal user
    //     pass: "Freedom6@" // generated ethereal password
    //   }
    // });

    // // send mail with defined transport object
    // const mailOptions = {
    //   from: "hasitha.chandula96@gmail.com", // sender address
    //   to: "hasitha.chandula@gmail.com", // list of receivers
    //   subject: "Subject of your email", // Subject line
    //   html: output // plain text body
    // };

    // transporter.sendMail(mailOptions, function(err, info) {
    //   if (err) console.log(err);
    //   else console.log(info);
    // });

    res.redirect("/verifies/"+user.id);
  } catch (err) {
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
app.post("/searchProcess", search);
app.post("/users/register", userRegister);
app.post("/users/login", userLogin);
// send Email
app.post("/send", sendEmail);
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
