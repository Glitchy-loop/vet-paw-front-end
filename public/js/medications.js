const token = localStorage.getItem('token')
const medUrl = 'http://165.227.142.184:1337/api'
const boxes = document.querySelector('.boxes')
const h2 = document.querySelector('.container h2')
const logOutBtns = document.querySelectorAll('.logOutBtn')
const search = document.getElementById('search')

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

// Get all medications from the database
const getMeds = async () => {
  try {
    const res = await fetch(`${medUrl}/medications/`, {
      referrerPolicy: 'unsafe_url'
    })
    const data = await res.json()

    if (data.data.length > 0) {
      displayAllMeds(data.data)
    } else {
      h2.innerHTML = 'No medications found.'
    }

    if (data.err) {
      notification(data.err || 'Failed to fetch.')
    }
  } catch (err) {
    notification(err || 'Failed to fetch.')
  }
}

getMeds()

// Display all meds on page
const displayAllMeds = async data => {
  boxes.innerHTML = ``
  data.forEach(med => {
    const box = document.createElement('div')
    box.className = 'box'

    const title = document.createElement('div')
    title.className = 'med-title'
    title.textContent = med.attributes.title

    const description = document.createElement('div')
    description.className = 'med-description'
    description.textContent = med.attributes.description

    const price = document.createElement('div')
    price.className = 'med-price'
    price.textContent = med.attributes.price

    box.append(title, description, price)

    boxes.append(box)
  })
}
