const baseUrl = 'http://localhost:8080/v1'
const token = localStorage.getItem('token')
const h1 = document.querySelector('.container h1')
const h2 = document.querySelector('.container h2')
const boxes = document.querySelector('.boxes')
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

    if (data.err) {
      return (h2.textContent =
        data.err || 'There was a a problem with a server.')
    }
  } catch (err) {
    h2.textContent = err || 'Failed to fetch.'
  }
}

getLog()

// Display logs
const displayLogs = data => {
  boxes.innerHTML = ``

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

    h2.innerHTML = `<span>${log.name}</span>: health records.`

    boxes.append(box)
  })
}

// Get all prescriptions associated with this pet by ID
// const getPrescriptions = async () => {
//   try {
//     const res = await fetch(
//       `${baseUrl}/prescriptions/prescription/${Number(
//         location.search.replace('?id=', '')
//       )}`,
//       {
//         headers: {
//           authorization: `Bearer ${token}`
//         }
//       }
//     )
//     const data = await res.json()
//     console.log(data)

//     if (data.length > 0) {
//       displayLogs(data)
//     }

//     if (data.err) {
//       return (h2.textContent = data.err)
//     }
//   } catch (err) {
//     alert(err || 'Failed to fetch.')
//   }
// }
// getPrescriptions()
