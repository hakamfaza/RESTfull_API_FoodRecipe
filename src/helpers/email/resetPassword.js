const { htmlTemplateTop, htmlTemplateBottom } = require('./template')

const activateAccount = (link) => {
  const htmlContent = `
  <p>
  Anda menerima email ini karena Anda telah melakukan permintaan Reset Password di Recipe Food.
  <br>
  Segera ubah sandi Anda dengan click tombol di bawah ini.
</p>

<a href="${link}" style="color: white;" class="auth-button">Reset Password</a>

<p>
  Jika Anda tidak merasa melakukan permintaan Reset Password di Recipe Food, abaikan email ini.
  <br>
  Link alternatif: <a href="${link}">${link}</a>
</p>


<hr>

<p>Copyright &copy; ${new Date().getFullYear()} Mama Recipe
  `
  return htmlTemplateTop + htmlContent + htmlTemplateBottom
}

module.exports = activateAccount
