import nodemailer from "nodemailer";

const testAccount = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: testAccount.user,
    pass: testAccount.pass,
  },
});

async function sendMailFromSMTPServer(
  recipients,
  subject,
  message,
  messageAsHtml
) {
  const info = await transporter.sendMail({
    from: '"SMTPServerName" <SMTPServer.email@example.com>',
    to: recipients,
    subject: subject,
    text: message,
    html: messageAsHtml,
  });

  console.log("Message id: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

sendMailFromSMTPServer(
  ["recipient@example.com"],
  "Hello ✔",
  "Hello world",
  "<b>Hello world?</b>"
);


async function userSendMail(name, email, subject, message) {

  const info = await transporter.sendMail({
    from: name + " " + email,
    to: "SMTPServer.email@example.com",
    subject: subject,
    text: message
  })

  console.log("Message id: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));  
}

userSendMail("Bob", "bob@mail.com", "bob like mail", "hi myname is bob");
