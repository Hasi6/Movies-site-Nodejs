const User = require('../database/models/User');

module.exports = async (req, res) => {
    const userId = req.params.id;
    const { token } = req.body;
    console.log(token);
    try{
    const user = await User.findById(userId);

    if(user.userToken == token){
        const update = await User.findByIdAndUpdate(userId, {confirmed: true});
        return res.redirect('/');
    }
    res.send('Token is Invalid');
}catch(err){
    console.error(err.message);
}
};
