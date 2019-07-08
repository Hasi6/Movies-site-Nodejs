module.exports = (req, res) => {
    const userId = req.params.id
  res.render("verify",{
      userId:userId
  });
};
