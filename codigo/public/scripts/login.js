import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// / Ver se usuário já está logado
const auth = getAuth()
onAuthStateChanged(auth, user => {
    if (user) window.location.href = "../index.html"
})

const emailInput = document.querySelector("input#email")
const passwordInput = document.querySelector("input#password")
const form = document.querySelector(".login-form")
const formBtn = document.querySelector(".sub-form")
const errorSpan = document.querySelector(".login-error")

async function logon(email, password) {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password)
        return result
    } catch(exp) {
        console.error(exp)
        return null
    }
}

function hideErrorSpan() {
    errorSpan.classList.add("invisible")
}

emailInput.addEventListener('click', hideErrorSpan)
passwordInput.addEventListener('click', hideErrorSpan)

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    formBtn.disabled = true

    const email = emailInput.value
    const password = passwordInput.value

    const response = await logon(email, password)

    if (response !== null) {
        formBtn.disabled = false
        window.location.href = "../index.html"
    } else {
        formBtn.disabled = false
        errorSpan.textContent = "Credenciais Inválidas! Tente novamente"
        errorSpan.classList.remove("invisible")
    }
})
