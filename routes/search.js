const Movies = require("../database/models/Movies");

module.exports = (async (req, res) => {
  try {
    const keyWord = await req.body.search;

    console.log(keyWord);

    const countMoviesSearch = await Movies.find({
      description: { $regex: new RegExp(keyWord, "i") }
    }).countDocuments();

    let perPage = 100;
    let page = countMoviesSearch / perPage;

    const searchMovies = await Movies.find({
      description: { $regex: new RegExp(keyWord, "i") }
    })
      .limit(perPage)
      .sort({ createDate: 1 });

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
