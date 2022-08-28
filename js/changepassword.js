const baseUrl = 'https://orca-app-ubakj.ondigitalocean.app/v1'
const form = document.forms.changePassword
const token = localStorage.getItem('token')
const p = document.querySelector('form[name="changePassword"] p')
const logOutBtns = document.querySelectorAll('.logOutBtn')

logOutBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    localStorage.removeItem('token')
    localStorage.removeItem('accountEmail')
    localStorage.removeItem('accountName')
    location.replace('../index.html')
  })
})

if (!token) {
  location.replace('../index.html')
}

// Change password form
form.addEventListener('submit', e => {
  e.preventDefault()

  const email = e.target.elements.email.value.trim()
  const oldpass = e.target.elements.oldpass.value.trim()
  const newpass = e.target.elements.newpass.value.trim()

  changePass({ email, oldpass, newpass })
})

// Request password change in the database
const changePass = async userData => {
  try {
    const res = await fetch(`${baseUrl}/users/changepass`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    const data = await res.json()

    if (data.msg === 'Successfully changed password.') {
      p.innerHTML = `<p style="color:green";>Successfully changed password.</p>`
    }

    if (data.err) {
      notification(data.err)
    }

    // console.log(data)
  } catch (err) {
    notification(err || 'Server problem')
  }
}
