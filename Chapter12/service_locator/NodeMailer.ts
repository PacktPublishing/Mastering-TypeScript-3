import * as nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport(`smtp://localhost:1025`);

let mailOptions: nodemailer.SendMailOptions = {
    from: `from_test@gmail.com`,
    to: `to_test@gmail.com`,
    subject: `Hello Mail`,
    text: `Hello from Node`
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(`sendMail error : ${error}`);
    }
    console.log(`Message sent ${info.response}`);
});




