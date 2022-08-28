// Hamburger
const hamburgerBtn = document.getElementById('hamburger')
const nav = document.querySelector('.mobile-nav')

hamburgerBtn.addEventListener('click', e => {
  nav.classList.toggle('visible')

  if (e.target.classList.contains('fa-bars')) {
    e.target.classList.remove('fa-bars')
    e.target.classList.add('fa-x')
  } else {
    e.target.classList.remove('fa-x')
    e.target.classList.add('fa-bars')
  }
})
