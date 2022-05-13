const token = localStorage.getItem('token')
const baseUrl = 'http://localhost:8080/v1'
const boxes = document.querySelector('.boxes')
const h2 = document.querySelector('.boxes h2')
const logOutBtns = document.querySelectorAll('.logOutBtn')
const search = document.getElementById('search')

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

// Get all pets from the database
const getAllPets = async () => {
  try {
    const res = await fetch(`${baseUrl}/pets/`)
    const data = await res.json()

    if (data.length > 0) {
      const notArchivedPets = data.filter(pet => {
        return pet.archived === 0
      })

      if (notArchivedPets.length > 0) {
        displayPets(notArchivedPets)
      } else {
        boxes.innerHTML = `<h2>No pets on the list.</h2>`
      }
    }
  } catch (err) {
    alert(err || 'Failed to fetch.')
  }
}

getAllPets()

// Display pets on the page
const displayPets = data => {
  boxes.innerHTML = ``

  data.forEach(pet => {
    const box = document.createElement('div')
    box.className = 'box'
    box.id = pet.id

    const title = document.createElement('div')
    title.className = 'pet-name'
    title.textContent = pet.name

    const age = document.createElement('div')
    age.className = 'pet-age'
    age.textContent = pet.age

    const owner = document.createElement('div')
    owner.className = 'pet-owner'
    owner.textContent = pet.clientEmail

    const buttons = document.createElement('div')
    buttons.className = 'pet-buttons'

    const logBtn = document.createElement('button')
    logBtn.className = 'btn-primary petLogBtn'
    logBtn.textContent = 'View Log'

    const deleteBtn = document.createElement('button')
    deleteBtn.className = 'btn-secondary deleteBtns'
    deleteBtn.textContent = 'Delete'

    buttons.append(logBtn, deleteBtn)

    box.append(title, age, owner, buttons)

    boxes.append(box)
  })

  // Logs buttons
  const logBtns = document.querySelectorAll('.petLogBtn')

  logBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      const petId = Number(e.target.parentElement.parentElement.id)
      const petName = e.target.parentElement.parentElement.children[0].textContent.trim()
      localStorage.setItem('petName', petName)
      localStorage.setItem('petId', petId)
      location.replace(`logs.html?id=${petId}`)
    })
  })

  // Delete buttons
  const deleteBtns = document.querySelectorAll('.deleteBtns')

  deleteBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      const name = e.target.parentElement.parentElement.children[0].textContent.trim()
      const clientEmail = e.target.parentElement.parentElement.children[2].textContent.trim()
      const id = Number(e.target.parentElement.parentElement.id)

      deletePet({ name, clientEmail, id })
    })
  })
}

// Archive pet in the server
const deletePet = async petDetails => {
  try {
    const res = await fetch(`${baseUrl}/pets/delete_pet`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(petDetails)
    })
    const data = await res.json()

    if (data.msg === 'Successfully deleted a pet.') {
      getAllPets()
    }

    if (data.err) {
      h2.textContent = data.err
    }
  } catch (err) {
    alert(err || 'Failed to fetch.')
  }
}

// Search pets by name input
search.addEventListener('keyup', e => {
  const searchQuery = e.target.value.trim().toLowerCase()

  if (searchQuery.length > 0) {
    searchPetsByName(searchQuery)
  }
  if (searchQuery.length === 0) {
    getAllPets()
  }
})

// Send search query in the database
const searchPetsByName = async searchQuery => {
  try {
    const res = await fetch(`${baseUrl}/pets/search/${searchQuery}`)
    const data = await res.json()

    displayPets(data)
  } catch (err) {
    alert(err || 'Failed to fetch.')
  }
}
