const Movies = require("../database/models/Movies");

module.exports = async (req, res) => {
  try {
    const country = req.params.country;
    const pageNum = req.params.page
    console.log(country);

    const moviesCount = await Movies.find({
      country: { $regex: new RegExp(country, "i") }
    }).countDocuments();

    let perPage = 1;
    let lastPages = moviesCount / perPage;

    if (pageNum < 0 || pageNum > lastPages + 1) {
      return res.send("Sorry This page is not available");
    }

    const searchMovies = await Movies.find({
      country: { $regex: new RegExp(country, "i") }
    })
      .skip(Math.abs(perPage * pageNum - perPage))
      .limit(perPage)
      .sort({ createDate: 1 });

    console.log(moviesCount);
    res.render("moviesCountry", {
      searchMovies: searchMovies,
      moviesCount: moviesCount,
      pageNum: pageNum,
      pages: Math.ceil(lastPages),
      perPage: perPage,
      country: country
    });
  } catch (err) {
    console.error(err.message);
  }
};
