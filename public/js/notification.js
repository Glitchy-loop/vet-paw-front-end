// Notification
const notification = message => {
  const notification = document.createElement('div')

  notification.className = 'notification'

  const p = document.createElement('p')
  p.textContent = message

  const xBtn = document.createElement('button')
  xBtn.textContent = 'X'
  xBtn.className = 'btn-secondary'

  notification.append(xBtn, p)

  document.body.append(notification)

  xBtn.addEventListener('click', e => {
    e.target.parentElement.remove()
  })
}
