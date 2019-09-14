const handleSendDemo = (req, res, nodemailer) => {
	const output = `
    <p>You have a new demo request</p>
    <h3>Request Details
    <ul>
      <li>Name: ${req.body.fname} ${req.body.lname}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
      <li>Program: ${req.body.program}</li>
      <li>Location: ${req.body.location}</li>
    </ul>
  `;

// async..await is not allowed in global scope, must use a wrapper

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail.com",
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'dtrumble12@gmail.com', // generated ethereal user
      pass: 'seww tjsz olvq gmfm' // generated ethereal password
    }
  });
  // send mail with defined transport object
  let mailOptions = {
    from: req.body.email, // sender address
    to: "dtrumble12@gmail.com", // list of receivers
    subject: "New JSleeve Demo Request", // Subject line
    text: "Hello world?", // plain text body
    html: output // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.message);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.json();
  });
}

module.exports = {
	handleSendDemo: handleSendDemo
}