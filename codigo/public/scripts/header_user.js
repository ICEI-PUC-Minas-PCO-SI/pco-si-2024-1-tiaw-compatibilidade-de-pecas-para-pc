import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js'

// Alterando header se user estiver logado
const auth = getAuth()

const loggedInTemplate = document.getElementById('user-links-loggedIn')
const loggedOutTemplate = document.getElementById('user-links-loggedOut')

function updateUserLinks(user) {
  const userLinksContainer = document.querySelector('.user-links')
  const mobileUserLinks = document.querySelector('.user-links-mobile')
  userLinksContainer.innerHTML = ''
  mobileUserLinks.innerHTML = ''

  const content = user
    ? loggedInTemplate.content.cloneNode(true)
    : loggedOutTemplate.content.cloneNode(true)

  userLinksContainer.appendChild(content.cloneNode(true))
  mobileUserLinks.appendChild(content)

  if (user) {
    const logoutButton = userLinksContainer.querySelector('.logout-button')
    const logoutButtonMobile = mobileUserLinks.querySelector('.logout-button')

    const btns = [logoutButton, logoutButtonMobile]

    btns.forEach(btn => {
      btn.addEventListener('click', async () => {
        await signOut(auth)
        location.reload()
      })
    })
  }
}

onAuthStateChanged(auth, updateUserLinks)
