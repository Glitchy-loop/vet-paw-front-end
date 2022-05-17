const baseUrl = 'http://localhost:8080/v1'
const medUrl = 'http://164.90.201.39:1337/api'
const form = document.forms.addprescription
const p = document.querySelector('.container p')
const token = localStorage.getItem('token')
const logOutBtns = document.querySelectorAll('.logOutBtn')
const select = document.getElementById('select')
const dogName = document.getElementById('dogName')

dogName.textContent = localStorage.getItem('petName')

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

// Get all medications from the database
const getMeds = async () => {
  try {
    const res = await fetch(`${medUrl}/medications/`)
    const data = await res.json()

    if (data.data.length > 0) {
      displayMeds(data.data)
    } else {
      h2.innerHTML = 'No medications found.'
    }
  } catch (err) {
    alert(err || 'Failed to fetch.')
  }
}

getMeds()

// Display meds in the form dropdown
const displayMeds = data => {
  data.forEach(med => {
    const option = document.createElement('option')
    option.textContent = med.attributes.title
    option.value = med.attributes.title
    option.id = med.id
    select.append(option)
  })
}

// Add prescription form
form.addEventListener('submit', e => {
  e.preventDefault()
  const comment = e.target.elements.comment.value.trim()
  const medication_id = Number(e.target.select[select.selectedIndex].id)
  const pet_id = Number(localStorage.getItem('petId'))

  addPrescription({ comment, medication_id, pet_id })
})

const addPrescription = async prescriptionDetails => {
  try {
    const res = await fetch(`${baseUrl}/prescriptions/add_prescription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(prescriptionDetails)
    })
    const data = await res.json()

    if (data.msg === 'Successfully added a prescription.') {
      location.replace(`logs.html?id=${localStorage.getItem('petId')}`)
    } else {
      p.textContent = 'Failed to add prescription to the database. Try again.'
    }
    if (data.err) {
      p.textContent =
        data.err || 'Failed to add prescription to the database. Try again.'
    }
  } catch (err) {
    alert(err || 'Failed to fetch.')
  }
}
