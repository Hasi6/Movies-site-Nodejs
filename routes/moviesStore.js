const Movies = require("../database/models/Movies");
const Subs = require("../database/models/Subscribers");

module.exports = async (req, res) => {
  try {
    const {
      name,
      description,
      year,
      trailerLink,
      downloadLink,
      idbmRating,
      country,
      category,
      smallimage,
      largeimage
    } = req.body;

    const subsCount = await Subs.find().countDocuments();
    const results = await Subs.find();

    // add data toa an Object
    const movieObject = {};

    movieObject.name = name;
    movieObject.description = description;
    movieObject.year = year;
    movieObject.trailerLink = trailerLink;
    movieObject.downloadLink = downloadLink;
    movieObject.idbmRating = idbmRating;
    movieObject.country = country.split(",").map(skill => skill.trim());
    movieObject.category = category.split(",").map(skill => skill.trim());
    movieObject.smallimage = smallimage;
    movieObject.largeimage = largeimage;

    console.log(movieObject.country);
    console.log(movieObject.category);

    let allEmails = [];

    for (let i = 0; i < subsCount; i++) {
      allEmails.push(results[i].email);
    }

    console.log(results.email);

    let movie = new Movies(movieObject);

    await movie.save();

    const output = `
      <ul>
        <li>${name}</li>
        <li>${description}</li>
        <li>${smallimage}</li>
      </ul>
    `;
    // let testAccount = await nodemailer.createTestAccount();
    setTimeout(async () => {
      var nodeoutlook = await require("nodejs-nodemailer-outlook");
      await nodeoutlook.sendEmail({
        auth: {
          user: "udhmovies@outlook.com",
          pass: "moviesUdh"
        },
        from: "udhmovies@outlook.com",
        to: allEmails,
        subject: "Successfully Subscribe to udhmovies.com",
        html: output,

        onError: e => console.log(e),
        onSuccess: i => console.log(i)
      });
    }, 200);

    return res.render("list", {
      msg:
        "Thank You for Subscribe to our website.. Now When we upload a movies you will get a email to entered Email"
    });
  } catch (err) {
    console.error(err.message);
  }
};
