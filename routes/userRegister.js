const User = require("../database/models/User");

module.exports = (async (req, res) => {
  try {
    User.create(req.body, (err, user) => {
      res.redirect("/");
    });
  } catch (err) {
    console.error(err.message);
  }
});