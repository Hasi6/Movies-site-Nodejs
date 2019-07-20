const Movies = require('../database/models/Movies');

const liveSearch = async(req, res, next)=>{
    var q = req.query.q;
    try{
    const result = await Movies.find({
        name: {
          $regex: new RegExp(q, "i")
        }}).limit(10);
        res.send(result);
      }catch(err){
        console.error(err.message);
      }
}

module.exports = liveSearch;