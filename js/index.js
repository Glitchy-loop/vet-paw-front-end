const baseUrl = 'http://localhost:8080/v1'
const form = document.forms.loginForm

// Login form

form.addEventListener('submit', e => {
  e.preventDefault()

  const email = e.target.elements.email.value.trim()
  const password = e.target.elements.password.value.trim()

  loginUser({ email, password })
})

// Login user

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
      alert(data.err)
    }

    if (data.msg === 'User successfully logged in') {
      localStorage.setItem('token', data.token)
      localStorage.setItem('accountName', data.data[0].name)
      location.replace('/home.html')
    }
    if (data.msg === 'Incorrect password.') {
      alert('Incorrect password. Try again')
    }
    if (data.msg === 'User not found.') {
      alert('User not found.')
    }
  } catch (err) {
    alert(err || 'Server problem')
  }
}
