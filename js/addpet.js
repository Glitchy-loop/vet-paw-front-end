const baseUrl = 'http://localhost:8080/v1'
const form = document.forms.addPetForm

const token = localStorage.getItem('token')
const logOutBtns = document.querySelectorAll('.logOutBtn')

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

form.addEventListener('submit', e => {
  e.preventDefault()
  const name = e.target.elements.name.value.trim()
  const clientEmail = e.target.elements.clientEmail.value.trim()
  const age = e.target.elements.age.value.trim()

  const details = { name, age, clientEmail }

  addPet(details)
})

const addPet = async petDetails => {
  try {
    const res = await fetch(`${baseUrl}/pets/add_pet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(petDetails)
    })
    const data = await res.json()
    console.log(data)

    if (data.msg === 'Successfully added a pet.') {
      location.replace('home.html')
    }
  } catch (err) {
    alert(err || 'Failed to fetch.')
  }
}
