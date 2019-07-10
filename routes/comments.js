const Comments = require('../database/models/Comments');

module.exports = async (req, res)=>{

    const movieId = req.params.id;
    const { name, email, message } = req.body;

    let comment = new Comments({
        movieId,
        name,
        email,
        message
    });

    try{
        const success = await comment.save();
        if(success){
            return res.redirect('/single/'+movieId);
        }
        return res.send('Server Error Please Try Again Later');
    }catch(err){
        console.error(err.message);
    }
}