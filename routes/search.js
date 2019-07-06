const Movies = require("../database/models/Movies");

module.exports = (async (req, res) => {
  try {
    const keyWord = await req.body.search;
    res.redirect("searchResults/"+keyWord+"/1");
  }catch(err) {
    console.error(err.message);
  }
});
//  {
//   searchMovies: searchMovies,
//   countMoviesSearch: countMoviesSearch,
//   page: page,
//   pages: Math.ceil(lastPage),
//   prePage: perPage
// });
// } catch (err) {
// console.error(err.message);
// }
// }