const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendActivationMail = async (to, link) => {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: 'Активация аккаунта в Book Store',
    text: '',
    html:
        `
            <div>
                <h1>Для активации аккаунта перейдите по ссылке</h1>
                <a href="${link}">${link}</a>
       </div>
        `,
  });
};
module.exports = {
  sendActivationMail,
};
