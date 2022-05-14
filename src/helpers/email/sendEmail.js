require('dotenv').config()
const { google } = require('googleapis')
const nodemailer = require('nodemailer')
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GMAIL_REFRESH_TOKEN, EMAIL_USER } = require('../env')

const oAuth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GMAIL_REFRESH_TOKEN
)

oAuth2Client.setCredentials({ refresh_token: GMAIL_REFRESH_TOKEN })

const sendEmail = async (dataEmail) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken()
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: EMAIL_USER,
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: GMAIL_REFRESH_TOKEN,
        accessToken
      }
    })

    transporter.sendMail(dataEmail).then((info) => {
      console.log('Email sended successfully!')
      console.log(info)
    }).catch((error) => {
      console.log(error)
      process.exit(1)
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = sendEmail
