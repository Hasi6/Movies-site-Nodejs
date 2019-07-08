const User = require("../database/models/User");
const bcrypt = require("bcryptjs");


module.exports = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).send("This Email is Already Taken");
    }

    user = new User({
      username,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.redirect('/');

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
