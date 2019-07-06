const Movies = require('../database/models/Movies');


module.exports = (async (req, res)=>{
    try{

    const keyWord = req.params.searchKey;
    const pageNum = req.params.page;
    console.log(keyWord);

    
      
    const countMoviesSearch = await Movies.find({
      description: { $regex: new RegExp(keyWord, "i") }
    }).countDocuments();

    let perPage = 1;
    let lastPages = countMoviesSearch / perPage;

    if (pageNum < 0 || pageNum > lastPages + 1) {
        return res.send("Sorry This page is not available");
    }

    const searchMovies = await Movies.find({
      description: { $regex: new RegExp(keyWord, "i") }
    }).skip(Math.abs(perPage * pageNum - perPage))
      .limit(perPage)
      .sort({ createDate: 1 });


    console.log(countMoviesSearch);
    res.render("searchResults", {
        searchMovies: searchMovies,
        countMoviesSearch: countMoviesSearch,
        pageNum: pageNum,
        pages: Math.ceil(lastPages),
        perPage: perPage,
        keyWord:keyWord
      });
    }
    catch(err){
        console.error(err.message);
    }
});