const User = require("../database/models/User");
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(!user){
        return res.send('No Users Found');
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if(!checkPassword){
      return res.send('Password is Invalid');
    }

    req.session.userId = user._id;

    res.redirect('/verify/'+user.id);

  } catch (err) {
    console.error(err.message);
  }
};
