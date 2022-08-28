const baseUrl = 'https://starfish-app-voi2g.ondigitalocean.app/v1'
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

  const form = e.target
  const fd = new FormData(form)

  const url = `${baseUrl}/pets/add_pet`
  const req = new Request(url, {
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
    if (data.err) {
      notification(data.err || 'Failed to fetch.')
    }
  } catch (err) {
    notification(err || 'Failed to fetch.')
  }
}
