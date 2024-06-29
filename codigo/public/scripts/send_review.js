import {
  getAuth,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js'
import {
  getFirestore,
  getDoc,
  doc,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js'

const auth = getAuth()
const db = getFirestore()

const textarea = document.querySelector('#review-area')
const form = document.querySelector('.review-form form')
const resultText = document.querySelector('.result-field')
const review = document.querySelector('.current-review')
const submitButton = document.querySelector('#send-review')

async function changeReview(uid, text) {
  const ref = doc(db, 'users', uid)
  await updateDoc(ref, {
    review: text,
  })
}

async function renderPreviousReview(uid) {
  const ref = doc(db, 'users', uid)
  const userSnap = await getDoc(ref)

  if (userSnap.exists()) {
    const r = userSnap.data().review
    return r !== '' ? r : null
  }
}

textarea.addEventListener('focus', () => (resultText.textContent = ''))

onAuthStateChanged(auth, async user => {
  if (user) {
    const r = await renderPreviousReview(user.uid)
    if (r !== null) review.textContent = r

    form.addEventListener('submit', async e => {
      e.preventDefault()
      resultText.classList.remove('error')

      const text = textarea.value
      if (text.length < 20 || text.length > 500) {
        resultText.classList.add('error')
        resultText.textContent =
          'A avaliação tem de ser entre 20-500 caracteres!'
        return
      }

      try {
        submitButton.disabled = true
        await changeReview(user.uid, text)
        resultText.textContent =
          'Avaliação enviada com sucesso! Obrigado(a) pelo feedback!'
      } catch (exp) {
        console.error(exp)

        resultText.classList.add('error')
        resultText.textContent =
          'Erro interno. Por favor tente novamente mais tarde.'
        return
      }
    })
  } else {
    window.location.href = '../subpages/login.html'
  }
})
