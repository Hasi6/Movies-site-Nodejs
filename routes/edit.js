const Movies = require('../database/models/Movies');

module.exports = (async (req, res)=>{
    const movieId = req.params.id;
    
    const movie = await Movies.findById(movieId);

    res.render('edit', {
        movie: movie
    });

});