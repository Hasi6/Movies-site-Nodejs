const Movies = require("../database/models/Movies");

module.exports = (req, res) => {
  Movies.create(req.body, (err, post) => {
    res.redirect("/");
  });
};
