import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text) => {



  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6066d5d2ab0eec",
      pass: "02862f6d9e35a8"
    }
  });


  await transport.sendMail({
    to,
    subject,
    text,

  })
}