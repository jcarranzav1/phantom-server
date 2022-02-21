const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid');
const config = require('../../config');
const { getHTML, replaceDoubleBraces } = require('./configFile');

const { mail } = config;

// eslint-disable-next-line object-curly-newline
exports.mail = async ({ email, subject, template, data }) => {
  const options = {
    apiKey: mail.apiKey,
  };

  let htmlText = await getHTML(template);
  htmlText = replaceDoubleBraces(htmlText, data);

  const transporter = nodemailer.createTransport(sgTransport(options));

  await transporter
    .sendMail({
      from: '"Phantom Store" <phantom.pc.store@gmail.com>', // sender address
      to: email,
      subject,
      text: htmlText,
      html: htmlText,
    })
    .then(() => console.log('Correo enviado'))
    .catch((e) => console.log(e));
};
