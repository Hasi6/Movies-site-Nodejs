const nodemailer = require("nodemailer");
const Subs = require("../database/models/Subscribers");

module.exports = async (req, res) => {
  try {
    const email = req.body.email;

    let Sub = await Subs.findOne({ email: email });

    if (!Sub) {
      return res.render("list", { msg: "You are Not Subscribe to our site" });
    }

    const unSubs = await Subs.findOneAndRemove({ email: email });

    if(!unSubs){
          return res.render("list", { msg: "Something Went wrong please try again later" });
    }
    console.log(req.body);
    const output = `
      <ul>
        <li>Now you are successfully unsubscribe From udhmovies</li>
      </ul>
    `;
    // let testAccount = await nodemailer.createTestAccount();

    var nodeoutlook = require("nodejs-nodemailer-outlook");
    nodeoutlook.sendEmail({
      auth: {
        user: "udhmovies@outlook.com",
        pass: "moviesUdh"
      },
      from: "udhmovies@outlook.com",
      to: req.body.email,
      subject: "Successfully Unubscribe From udhmovies.com",
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

    return res.render("list", {
      msg:
        "Now you are successfully unsubscribe From udhmovies"
    });
  } catch (err) {
    console.error(err.message);
  }
};
