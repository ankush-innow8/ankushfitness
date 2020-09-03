const nodemailer  = require('nodemailer')
const mailGun = require('nodemailer-mailgun-transport')

const auth = {
    auth: {
        api_key: 'a304f5054d4c5904da69164c3906c6f3-7cd1ac2b-1e5180cb',
        domain: 'sandbox61414c23375042a68c113fc992edc8e1.mailgun.org'
    }
}

const transporter = nodemailer.createTransport(mailGun(auth))

const sendMail = (email, subject, text, cb) => {
    const mailOptions = {
        from: email,
        to: 'ankush0899@gmail.com',
        subject,
        text
    }
    
    transporter.sendMail(mailOptions, function(err, data){
        if (err){
            cb(err, null)
        } else {
            cb(null, data)
        }
    })
}
module.exports = sendMail;

