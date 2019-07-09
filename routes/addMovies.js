const Country = require('../database/models/Country');
const Category = require('../database/models/Category');

module.exports = (async (req, res) => {
    try {
      if(req.session.userId){
      const countries = await Country.find().sort({ createDate: -1 });
      const categories = await Category.find().sort({ createDate: -1 });
      res.render("addMovies", {
        countries: countries,
        categories: categories
      });
    }else{
      return res.send('To add Movies First You need to logged in');
    }
    } catch (err) {
      console.error(err.message);
    }
  });