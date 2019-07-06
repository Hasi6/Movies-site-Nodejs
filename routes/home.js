const Movies = require('../database/models/Movies');

module.exports = (async (req, res) => {
    const MoviesSlide = await Movies.find()
      .limit(12)
      .sort({ createDate: -1 });
    const movies = await Movies.find()
      .limit(12)
      .sort({ createDate: -1 });
    const MoviesHeaders = await Movies.find()
      .limit(6)
      .sort({ createDate: 1 });
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
  
    const topViewedMovies = await Movies.find().sort({views: -1}).limit(12);
    
  
    res.render("index", {
      movies: movies,
      MoviesSlide: MoviesSlide,
      MoviesHeaders: MoviesHeaders,
      RatingMovies: RatingMovies,
      popularMovies: popularMovies,
      popularActionMovies: popularActionMovies,
      popularComedyMovies: popularComedyMovies,
      topViewedMovies:topViewedMovies
    });
  });