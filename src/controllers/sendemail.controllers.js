
const nodemailer = require("nodemailer");

const config = {
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "madhumathi.labglo@gmail.com",
    pass: "hziogjslfngvgphm",
  },
};

function send_email(data) {
  const transporter = nodemailer.createTransport(config);
  return new Promise((resolve, reject) => {
    transporter.sendMail(data, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info.response);
      }
    });
  });
}

async function EmailSender(req, res) {
  const { from, to, subject, text } = req.body;
  const data = { from, to, subject, text };
  try {
    const email_data = await send_email(data);
    // res.send(email_data);
    res.status(200).json({message:"Email send Successfully"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  EmailSender
};

