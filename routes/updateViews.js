const Movies = require('../database/models/Movies');

module.exports = (async(req,res)=>{
    try{
    let movieId = req.params.id;
      const view = await Movies.findById(movieId);
      const movieViews = view.views;
  
      const update = await Movies.findByIdAndUpdate(movieId, {views: movieViews + 1});
  
      res.redirect('/single/'+movieId);
  
    }catch(err){
      console.error(err.message);
    }
  });