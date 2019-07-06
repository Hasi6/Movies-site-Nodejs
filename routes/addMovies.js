const Country = require('../database/models/Country');
const Category = require('../database/models/Category');

module.exports = (async (req, res) => {
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