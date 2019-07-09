const Movies = require('../database/models/Movies');

module.exports = (async (req, res)=>{
    const id = req.params.id;

    const { name, description, year, trailerLink, downloadLink, idbmRating, category, smallimage, largeimage } = req.body;

    try{

    const updateMovie = await Movies.findOneAndUpdate({_id: id}, { "$set": {"name": name, "description": description, 
    "year": year, "trailerLink": trailerLink, "downloadLink": downloadLink, "idbmRating": idbmRating, "category": category, 
    "smallimage": smallimage, "largeimage": largeimage}});

    if(!updateMovie){
        return res.send('Something went Wrong Movie details cannot update now');
    }
    return res.redirect('/single/'+id);

    }catch(err){
        console.error(err.message);
    }
})