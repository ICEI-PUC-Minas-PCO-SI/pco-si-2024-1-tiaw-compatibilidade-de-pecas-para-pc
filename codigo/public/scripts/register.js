import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"
import { collection, getDocs, getFirestore, setDoc, where, query, doc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"

const db = getFirestore()
const auth = getAuth()

const usernameInput = document.querySelector("input#username")
const emailInput = document.querySelector("input#email")
const passwordInput = document.querySelector("input#password")
const confirmPasswordInput = document.querySelector("input#confirm-password")

const usernameErr = document.querySelector("p#username-error")
const emailErr = document.querySelector("p#email-error")
const passwordErr = document.querySelector("p#password-error")
const confirmPasswordErr = document.querySelector("p#confirm-password-error")

const form = document.querySelector(".register-form")
const subBtn = document.querySelector(".sub-form")

// Limpando erros dos campos quando focados
usernameInput.addEventListener('focus', () => usernameErr.textContent = "")
emailInput.addEventListener('focus', () => emailErr.textContent = "")
passwordInput.addEventListener('focus', () => passwordErr.textContent = "")
confirmPasswordInput.addEventListener('focus', () => confirmPasswordErr.textContent = "")

// Função de redirecionamento se o usuário estiver logado
const redirectIfLoggedIn = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            form.innerHTML = `
                <div>
                  <h3>Sua conta foi criada! Seu usuário já está logado e disponível.</h3>
                </div>
            `
        }
    })
}
redirectIfLoggedIn()

// Funções para validar os campos
const validateUsername = (username, usernameErr) => {
    if (username.length < 6) {
        usernameErr.textContent = "Nome precisa ter pelo menos 6 caracteres!"
        return false
    }

    if (username.length > 30) {
        usernameErr.textContent = "Nome não pode passar de 30 caracteres!"
        return false
    }
    
    let letters = 0
    for (let char of username) if (char.match(/[a-zA-Z]/)) letters++
    if (letters < 3) {
        usernameErr.textContent = "Nome precisa ter pelo menos trẽs letras!"
        return false
    }
    
    const regex = /^[a-zA-Z0-9_.\s]+$/    
    if (!regex.test(username)) {
        usernameErr.textContent = "Nome possui caracteres inválidos!"
        return false
    }
    
    usernameErr.textContent = ""
    return true
}

const validateEmail = (email, emailErr) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!regex.test(email)) {
        emailErr.textContent = "Email Inválido!"
        return false
    }

    emailErr.textContent = ""
    return true
}

const validatePassword = (password, passwordErr) => {
    if (password.length < 6) {
        passwordErr.textContent = "Senha precisa ter pelo menos 6 caracteres!"
        return false
    }

    if (password.length > 120) {
        passwordErr.textContent = "Senha não pode passar de 120 caracteres!"
        return false
    }

    passwordErr.textContent = ""
    return true
}

const validateConfirmPassword = (password, otherPassword, confirmPasswordErr) => {
    if (password !== otherPassword) {
        confirmPasswordErr.textContent = "Senhas não são iguais!"
        return false
    }

    confirmPasswordErr.textContent = ""
    return true
}

const validate = (username, email, password, confirmPassword, uErr, eErr, pErr, cpErr) => {
    let isValid = true

    isValid = validateUsername(username, uErr) && isValid
    isValid = validateEmail(email, eErr) && isValid
    isValid = validatePassword(password, pErr) && isValid
    isValid = validateConfirmPassword(password, confirmPassword, cpErr) && isValid

    return isValid
}

// Funções de validação do firebase
const createUser = async (username, email, password, usernameErr, emailErr) => {    
    try {
        // Percorendo a coleção e verificando se o username já existe caso ela conter pelo menos um item
        const q = query(collection(db, 'users'), where("username", "==", username))
        const qSnap = await getDocs(q)
        for (const doc of qSnap.docs) {
            if (doc.exists) {
                usernameErr.textContent = "Nome de usuário já existe!"
                return
            }
        }

        // Criando de fato
        const user = await createUserWithEmailAndPassword(auth, email, password)
        const uid = user.user.uid

        const userDocRef = doc(db, 'users', uid)
        await setDoc(userDocRef, {
            uid,
            username,
            type: "USER",
        })

        redirectIfLoggedIn()
        return
    } catch (exp) {
        if (exp.code === 'auth/email-already-in-use') {
            emailErr.textContent = "Email já está em uso!"
            return
        } else {
            console.error('Erro ao criar usuário:', exp)
            return
        }
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    subBtn.disabled = true
    
    const username = usernameInput.value
    const email = emailInput.value
    const password = passwordInput.value
    const confirmPassword = confirmPasswordInput.value

    if (validate(
        username,
        email,
        password,
        confirmPassword,
        usernameErr,
        emailErr,
        passwordErr,
        confirmPasswordErr
    )) {
        await createUser(username, email, password, usernameErr, emailErr)
        subBtn.disabled = false
    } else {
        subBtn.disabled = false
    }
})
