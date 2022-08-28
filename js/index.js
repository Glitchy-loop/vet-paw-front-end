const baseUrl = 'https://orca-app-ubakj.ondigitalocean.app/v1'
const form = document.forms.loginForm

// Login form
form.addEventListener('submit', e => {
  e.preventDefault()

  const email = e.target.elements.email.value.trim()
  const password = e.target.elements.password.value.trim()

  loginUser({ email, password })
})

// Confirm user in the database and store data in the local storage
const loginUser = async userData => {
  try {
    const res = await fetch(`${baseUrl}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    const data = await res.json()

    if (data.err) {
      notification(data.err)
    }
    if (data.msg === 'Incorrect password.') {
      notification('Incorrect password. Try again')
    }
    if (data.msg === 'User not found.') {
      notification('User not found.')
    }

    if (data.msg === 'User successfully logged in') {
      localStorage.setItem('token', data.token)
      localStorage.setItem('accountName', data.data[0].name)
      location.replace('../views/home.html')
    }
  } catch (err) {
    notification(err || 'Server problem')
  }
}
