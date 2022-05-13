const baseUrl = 'http://localhost:8080/v1'
const form = document.forms.registerForm

form.addEventListener('submit', e => {
  e.preventDefault()

  const name = e.target.elements.name.value.trim()
  const email = e.target.elements.email.value.trim()
  const password = e.target.elements.password.value.trim()
  const confirmPassword = e.target.elements.confirmPassword.value.trim()

  if (password !== confirmPassword) {
    alert(`Password doesn't match.`)
  }
  if (password === confirmPassword) {
    registerUser({ name, email, password })
  }
})

const registerUser = async userData => {
  try {
    const res = await fetch(`${baseUrl}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    const data = await res.json()

    console.log(data, data.msg)

    if (data.msg === 'Successfully created account') {
      location.replace('/index.html')
    }
  } catch (err) {
    alert(err || 'Server error')
  }
}
