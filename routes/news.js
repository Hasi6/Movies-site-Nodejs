const News = require('../database/models/Upnext');

module.exports = async (req, res)=>{
    const { movieName, image, idbmRating } = req.body;

    const news = new News({
        movieName,
        image,
        idbmRating
    });

    try{
    const success = await news.save();

    if(success){
        return res.redirect('/');
    }
    return res.send('Error Please try Again later');
}catch(err){
    console.error(err.message);
}
}