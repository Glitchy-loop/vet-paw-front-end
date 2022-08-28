const baseUrl = 'https://orca-app-ubakj.ondigitalocean.app'
const form = document.forms.resetpassword

// Reset password form
form.addEventListener('submit', async e => {
  e.preventDefault()

  const email = e.target.elements.email.value.trim()
  await changePass({ email })
})

// Request password reset in the database
const changePass = async email => {
  try {
    const res = await fetch(`${baseUrl}/v1/users/resetpass`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(email)
    })
    const data = await res.json()

    console.log(data)

    if (data.err) {
      notification(data.err)
    }
  } catch (err) {
    notification(err || 'Server problem')
  }
}
