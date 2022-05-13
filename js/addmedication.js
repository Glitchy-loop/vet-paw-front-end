const token = localStorage.getItem('token')
const baseUrl = 'http://localhost:8080/v1'
const p = document.querySelector('.container p')
const logOutBtns = document.querySelectorAll('.logOutBtn')
const form = document.forms.addMedication

logOutBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    console.log('click')
    localStorage.removeItem('token')
    localStorage.removeItem('accountEmail')
    localStorage.removeItem('accountName')
    location.replace('index.html')
  })
})

if (!token) {
  location.replace('index.html')
}

// Add medication form
form.addEventListener('submit', e => {
  e.preventDefault()

  const title = e.target.elements.title.value.trim()
  const description = e.target.elements.description.value.trim()
  const price = Number(e.target.elements.price.value.trim())
  const details = { title, description, price }
  addMedication(details)
})

// Post medication
const addMedication = async medDetails => {
  try {
    const res = await fetch(`${baseUrl}/medications/add_medication`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(medDetails)
    })
    const data = await res.json()

    if (data.data.id > -1) {
      location.replace('medications.html')
    } else {
      p.textContent = 'Something went wrong. Try again later.'
    }
  } catch (err) {
    alert(err || 'Failed to fetch.')
  }
}
