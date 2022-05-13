const baseUrl = 'http://localhost:8080/v1'
const form = document.forms.addlog
const p = document.querySelector('.container p')

const token = localStorage.getItem('token')
const logOutBtns = document.querySelectorAll('.logOutBtn')

logOutBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    localStorage.removeItem('token')
    localStorage.removeItem('accountEmail')
    localStorage.removeItem('accountName')
    location.replace('index.html')
  })
})

if (!token) {
  location.replace('index.html')
}

// Add log form
form.addEventListener('submit', e => {
  e.preventDefault()
  const description = e.target.elements.description.value.trim()
  const status = e.target.elements.status.value.trim()
  const pet_id = Number(localStorage.getItem('petId'))
  const details = { pet_id, description, status }

  addLog(details)
})

// Add log in the database
const addLog = async petDetails => {
  try {
    const res = await fetch(`${baseUrl}/logs/add_log`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(petDetails)
    })
    const data = await res.json()

    if (data.msg === 'Successfully added a log.') {
      location.replace(`logs.html?id=${localStorage.getItem('petId')}`)
    } else {
      p.innerHTML = err || 'Something went wrong. Try again later'
    }
  } catch (err) {
    alert(err || 'Failed to fetch.')
  }
}
