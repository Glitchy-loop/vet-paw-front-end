const baseUrl = 'http://localhost:8080/v1'
const form = document.forms.addPetForm

const token = localStorage.getItem('token')
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

// Add pet form handler
const handleForm = e => {
  e.preventDefault()

  let form = e.target
  fd = new FormData(form)

  let url = `${baseUrl}/pets/add_pet`
  let req = new Request(url, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}` },
    body: fd
  })

  addPet(req)
}

// Add pet form
form.addEventListener('submit', handleForm)

// Add pet in the database
const addPet = async req => {
  try {
    const res = await fetch(req)
    const data = await res.json()

    if (data.msg === 'Successfully added a pet.') {
      location.replace('home.html')
    }
  } catch (err) {
    alert(err || 'Failed to fetch.')
  }
}
