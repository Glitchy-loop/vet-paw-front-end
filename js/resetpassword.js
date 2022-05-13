const baseUrl = 'http://localhost:8080/v1'
const form = document.forms.resetpassword

form.addEventListener('submit', async e => {
  e.preventDefault()

  const email = e.target.elements.email.value.trim()
  await changePass({ email })
})

const changePass = async email => {
  try {
    const res = await fetch(`${baseUrl}/users/resetpass`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(email)
    })
    const data = await res.json()
    console.log(data)
  } catch (err) {
    alert(err || 'Server problem')
  }
}
