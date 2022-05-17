const crypto = require('crypto')
const { v4: uuidv4 } = require('uuid')
const validator = require('email-validator')
const bcrypt = require('bcrypt')
const salt = 10

const authModel = require('../models/auth.model')
const userModel = require('../models/users.model')
const activateAccount = require('../helpers/email/activateAccountEmail')
const resetPassword = require('../helpers/email/resetPassword')
const sendEmail = require('../helpers/email/sendEmail')
const { success, failed, successWithtoken } = require('../helpers/response')
const jwtToken = require('../helpers/generateJwtToken')
const { APP_NAME, EMAIL_FROM, API_URL, CLIENT_URL } = require('../helpers/env')

module.exports = {
  login: async (req, res) => {
    try {
      const setData = {
        email: req.body.email,
        password: req.body.password
      }

      const isEmail = validator.validate(setData.email)
      if (!isEmail) {
        failed(res, Error, 'failed', 'wrong email forma!')
        return
      }

      authModel
        .loginUser(setData)
        .then((result) => {
          // rowCount is number of data
          if (result.rowCount > 0) {
            // Check isActive user
            if (result.rows[0].is_active > 0) {
              // Compare password from body
              bcrypt.compare(setData.password, result.rows[0].password)
                .then(async (match) => {
                  if (match) {
                  // Token
                    const token = await jwtToken(result.rows[0])
                    successWithtoken(res, {
                      token,
                      id: result.rows[0].id
                    }, 200, 'succsess', 'Login succsess!')
                  } else {
                  // When password is wrong
                    failed(res, null, 'failed', 'Email or password is wrong!')
                  }
                })
            } else {
              failed(res, Error, 'failed', 'the user is being blocked, please contact the admin!')
            }
          } else {
            // When username is wrong
            failed(res, null, 'failed', 'Email or password is wrong!')
          }
        }).catch((err) => {
          failed(res, err, 'Failed', 'Failed login')
        })
    } catch (err) {
      failed(res, err, 'Failed', 'Internal server Error')
    }
  },
  activation: async (req, res) => {
    try {
      const { token } = req.params
      const user = await authModel.checkEmailToken(token)

      if (!user.rowCount) {
        res.send(`
          <div>
            <h1>Activation Failed!</h1>
            <h3>Token invalid!</h3>
          </div>`
        )
      }

      await authModel.activation(user.rows[0].id)
      await authModel.updateToken(user.rows[0].id, '')

      res.send(`
        <div>
          <h1>Activation success!</h1>
          <h3>You can login now!</h3>
      </div>
      `)
    } catch (error) {
      res.send(`
        <div>
          <h1>Internal server Error!</h1>
          <h3>${error.message}</h3>
        </div>
      `)
    }
  },
  register: async (req, res) => {
    try {
      // Validation
      if (!req.body.email || !req.body.name || !req.body.password) {
        throw Error('all important data must be filled!')
      }

      const user = await userModel.getUserByEmail(req.body.email)
      if (user.rowCount) {
        failed(res, null, 'failed', 'Email already exist')
        return
      }

      const id = uuidv4()
      const token = crypto.randomBytes(30).toString('hex')
      const setData = {
        id,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: bcrypt.hashSync(req.body.password, salt),
        image: req.file.filename,
        level: req.body.level ? 0 : 1,
        isActive: 1
      }
      await authModel.register(setData)

      await authModel.updateToken(setData.id, token)

      // send email
      const templateEmail = {
        from: `${APP_NAME} <${EMAIL_FROM}>`,
        to: req.body.email.toLowerCase(),
        subject: 'Activate Your Account!',
        html: activateAccount(`${API_URL}/activation/${token}`)
      }

      sendEmail(templateEmail)
      success(res, null, 'sucsess', 'Register succsess!')
    } catch (err) {
      failed(res, err, 'Failed', 'Failed crete user')
    }
  },
  forgot: async (req, res) => {
    try {
      const user = await userModel.getUserByEmail(req.body.email)
      if (user.rowCount) {
        const token = crypto.randomBytes(30).toString('hex')

        // update email token
        await authModel.updateToken(user.rows[0].id, token)

        // send email
        const templateEmail = {
          from: `${APP_NAME} <${EMAIL_FROM}>`,
          to: req.body.email.toLowerCase(),
          subject: 'Reset Your Password!',
          html: resetPassword(`${CLIENT_URL}/reset/${token}`)
        }
        sendEmail(templateEmail)
      }

      success(res, null, 'sucess', 'success forgot password!')
    } catch (error) {
      failed(res, error.message, 'failed', 'internal server error!')
    }
  },
  reset: async (req, res) => {
    try {
      const { token } = req.params
      const user = await authModel.checkEmailToken(token)

      if (!user.rowCount) {
        failed(res, null, 'failed', 'reset password failed!')
      }

      const password = await bcrypt.hash(req.body.password, salt)
      await authModel.resetPassword(user.rows[0].id, password)
      await authModel.updateToken(user.rows[0].id, '')

      success(res, null, 'success', 'sucess create new password!')
    } catch (error) {
      failed(res, error.message, 'failed', 'internal server error!')
    }
  }
}
