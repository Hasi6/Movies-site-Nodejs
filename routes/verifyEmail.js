const User = require('../database/models/User');
const randomString = require('randomstring');

module.exports = async (req, res) => {
    try {
      let user = await User.findById(req.params.userid);
      if(!user){
        return res.json("Not Found");
      }
      
      const token = randomString.generate();
      await User.findByIdAndUpdate(user, {userToken: token});
  
      user = await User.findById(req.params.userid);
  
      const output = `
        <p>You Have a new Contact request</p>
        <h3>Contact Details</h3>
        <ul>
          <li>Token : ${user.userToken}</li>
        </ul>
        <h3>Message</h3>
      `;
      // let testAccount = await nodemailer.createTestAccount();
  
      var nodeoutlook = require("nodejs-nodemailer-outlook");
      nodeoutlook.sendEmail({
        auth: {
          user: "udhmovies@outlook.com",
          pass: "moviesUdh"
        },
        from: "udhmovies@outlook.com",
        to: user.email,
        subject: "Movies Message",
        html: output,
  
        onError: e => console.log(e),
        onSuccess: i => console.log(i)
      });
      
  
      // create reusable transporter object using the default SMTP transport
      // let transporter = nodemailer.createTransport({
      //   service: "gmail",
      //   auth: {
      //     user: "hasitha.chandula96@gmail.com", // generated ethereal user
      //     pass: "Freedom6@" // generated ethereal password
      //   }
      // });
  
      // // send mail with defined transport object
      // const mailOptions = {
      //   from: "hasitha.chandula96@gmail.com", // sender address
      //   to: "hasitha.chandula@gmail.com", // list of receivers
      //   subject: "Subject of your email", // Subject line
      //   html: output // plain text body
      // };
  
      // transporter.sendMail(mailOptions, function(err, info) {
      //   if (err) console.log(err);
      //   else console.log(info);
      // });
  
      res.redirect("/verifies/"+user.id);
    } catch (err) {
      console.error(err.message);
    }
  }