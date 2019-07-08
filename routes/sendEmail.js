const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  try {
    console.log(req.body);
    const output = `
      <p>You Have a new Contact request</p>
      <h3>Contact Details</h3>
      <ul>
        <li>First Name : ${req.body.firstname}</li>
        <li>Last Name : ${req.body.lastname}</li>
        <li>Email : ${req.body.email}</li>
        <li>Subject : ${req.body.subject}</li>
        <li>Message : ${req.body.message}</li>
      </ul>
  
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `;
    // let testAccount = await nodemailer.createTestAccount();

    var nodeoutlook = require("nodejs-nodemailer-outlook");
    nodeoutlook.sendEmail({
      auth: {
        user: "udhmovies@outlook.com",
        pass: "moviesUdh"
      },
      from: "udhmovies@outlook.com",
      to: "hasitha.chandula@gmail.com",
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

    res.render("contact", { msg: "Email Has Been Sent" });
  } catch (err) {
    console.error(err.message);
  }
};
