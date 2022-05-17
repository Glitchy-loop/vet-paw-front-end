const baseUrl = 'http://localhost:8080/v1'
const medUrl = 'http://164.90.201.39:1337/api'
const token = localStorage.getItem('token')
const h1 = document.querySelector('.container h1')
const h2 = document.querySelector('.container h2')
const p = document.querySelector('.container p')
const boxes = document.querySelector('.boxes')
const logOutBtns = document.querySelectorAll('.logOutBtn')
const filterLogs = document.getElementById('filterLogs')
const filterPrescriptions = document.getElementById('filterPrescriptions')

h2.innerHTML = `<span>${localStorage.getItem(
  'petName'
)}</span>: health records.`

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

// Get all logs associated with this pet by ID
const getLog = async () => {
  try {
    const res = await fetch(
      `${baseUrl}/logs/log/${Number(location.search.replace('?id=', ''))}`,
      {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
    )
    const data = await res.json()

    if (data.length > 0) {
      return displayLogs(data)
    }
  } catch (err) {
    console.log(err)
  }
}
window.onload = getLog()

// Display logs
const displayLogs = data => {
  boxes.innerHTML = ``
  p.textContent = 'Logs:'

  data.forEach(log => {
    const box = document.createElement('div')
    box.className = 'box'

    const name = document.createElement('div')
    name.className = 'pet-name'
    name.textContent = log.name

    const age = document.createElement('div')
    age.className = 'pet-age'
    age.textContent = log.age

    const owner = document.createElement('div')
    owner.className = 'pet-owner'
    owner.textContent = log.clientEmail

    const description = document.createElement('div')
    description.className = 'injure-description'
    description.textContent = log.description

    const status = document.createElement('div')
    status.className = 'status'
    status.textContent = log.status

    box.append(name, age, owner, description, status)

    boxes.append(box)
  })
}

// Get all medications from the database
const getMeds = async () => {
  try {
    const res = await fetch(`${medUrl}/medications/`)
    const data = await res.json()

    if (data.data.length > 0) {
      data.data.forEach(med => {
        meds.push(med)
      })
    }
  } catch (err) {
    console.log(err)
  }
}
getMeds()

let meds = []

// Display prescription
const displayPrescriptions = data => {
  boxes.innerHTML = ``
  p.textContent = 'Prescriptions:'

  data.forEach(prescription => {
    let med_id = meds.filter(med => {
      return med.id === prescription.medication_id
    })

    const box = document.createElement('div')
    box.className = 'box prescription'

    const name = document.createElement('div')
    name.className = 'pet-name'
    name.textContent = prescription.name

    const age = document.createElement('div')
    age.className = 'pet-age'
    age.textContent = prescription.age

    const owner = document.createElement('div')
    owner.className = 'pet-owner'
    owner.textContent = prescription.clientEmail

    const comment = document.createElement('div')
    comment.className = 'comment'
    comment.textContent = prescription.comment

    const medication = document.createElement('div')
    medication.className = 'medication'
    medication.textContent = med_id[0].attributes.title

    const date = document.createElement('div')
    date.className = 'date'
    date.textContent = prescription.timestamp

    box.append(name, age, owner, comment, medication, date)

    boxes.append(box)
  })
}

// Get all prescriptions associated with this pet by ID
const getPrescriptions = async () => {
  try {
    const res = await fetch(
      `${baseUrl}/prescriptions/prescription/${Number(
        location.search.replace('?id=', '')
      )}`,
      {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
    )
    const data = await res.json()

    if (data.length > 0) {
      displayPrescriptions(data)
    }
  } catch (err) {
    console.log(err)
  }
}

// Filter buttons
filterLogs.addEventListener('click', () => {
  getLog()
})

filterPrescriptions.addEventListener('click', () => {
  getPrescriptions()
})
