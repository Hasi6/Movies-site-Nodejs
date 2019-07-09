const Movies = require('../database/models/Movies');

module.exports = (async (req, res)=>{
    const movieId = req.params.id;
    
    const deleted = await Movies.findByIdAndDelete(movieId);

    if(deleted){
        return res.redirect('/list/1');
    }else{
        return res.send('Something went wrong movie not deleted');
    }

});