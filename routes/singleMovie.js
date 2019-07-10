const Movies = require("../database/models/Movies");
const Comments = require("../database/models/Comments");

module.exports = async (req, res) => {
  let id = req.params.id;
  console.log(id);
  try {
    const singleMovie = await Movies.findById(id);
    const comments = await Comments.find({movieId: id}).sort([['createdDate', -1]]);
    let n = Movies.find().countDocuments();
    let r = Math.floor(Math.random() * n);
    let randomMovies = await Movies.find()
      .skip(r)
      .limit(6);
    res.render("single", {
      singleMovie: singleMovie,
      randomMovies: randomMovies,
      comments:comments
    });
  } catch (err) {
    console.error(err.message);
  }
};
