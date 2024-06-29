import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"
import { getFirestore, query, getDocs, getDoc, collection, where, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"

import { upperAll } from "../lib/text.js"
import { confirmModal } from "../lib/confirm_modal.js"

const auth = getAuth()
const db = getFirestore()

const section = document.querySelector(".profile-container")
const container = document.querySelector(".cards")
const usernameP = document.querySelector("#uname")
const loader = document.querySelector(".loader")

async function getSetups(uid) {
    const ref = collection(db, "community-setups")
    const q = query(ref, where("uid", "==", uid))
    
    const docs = await getDocs(q)
    return docs
}

async function getUsername(uid) {
    const ref = doc(db, "users", uid)
    const user = await getDoc(ref)
    return user.data().username
}

async function showSetups(setups) {
    if (setups.length === 0) {
        const structure = `
            <h3 class="no-setups">Você não nenhum setup salvo! Crie e compartilhe novos setups <a href="./montar_pc.html">aqui</a>!</h3>
        `

        container.innerHTML = structure
        return
    }

    for (const userSetup of setups) {
        const setup = userSetup.setup

        const structure = `
            <div class="card-img">
                <div class="images">
                    <img src=${setup.cpu.img} alt="CPU" />
                    <img src=${setup.gpu.img} alt="PLACA" />
                </div>
            </div>
            <div class="card-info">
                <h3>${upperAll(userSetup.name)}</h3>

                <ul class="card-components">
                    <li><strong>CPU</strong> - ${setup["cpu"].name}</li>
                    <li><strong>GPU</strong> - ${setup["gpu"].name}</li>
                    <li><strong>RAM</strong> - ${setup["ram"].name}</li>
                    <li><strong>PLACA-MÃE</strong> - ${setup["motherboard"].name}</li>
                    <li><strong>FONTE</strong> - ${setup["cooling"].name}</li>
                    <li><strong>HD/SSD -</strong></li>
                    <ul>
                       ${setup["storage"].map(st => `<li style="margin-left: 20px;">${st.name}</li>`).join(' ')}
                    </ul>
                </ul>

                <div class="card-owner">
                    <p>Feito por: <span>${userSetup.owner}</span></p>
                    <p>R$ ${Math.round(setup.totalPrice)}</p>
                </div> 

                <button id="delete-setup">Deletar Setup</button>
            </div>
        `

        const c = document.createElement("div")
        c.classList.add("card")
        c.innerHTML = structure

        const deleteBtn = c.querySelector("#delete-setup")
        deleteBtn.addEventListener('click', async () => {
            const tryDelete = async () => {
                try {
                    await deleteDoc(doc(db, "community-setups", `${userSetup.slug}-${userSetup.uid}`))
                    location.reload()
                } catch (exp) {
                    console.error(exp)
                    return
                }
            }

            confirmModal(`Deseja deletar: "${userSetup.name}"?`, () => tryDelete(), section)
        })

        container.appendChild(c)
    }
}

async function deleteUserAccount(uid, user) {
    // Deletando da collection de users e de setups
    const userSetupsDocs = await getSetups(uid)
    userSetupsDocs.forEach(async setup => {
        const s = setup.data()
        const docTitle = `${s.slug}-${uid}`
        await deleteDoc(doc(db, "community-setups", docTitle))
    }) 

    await deleteDoc(doc(db, "users", uid))

    // Deletando user em si
    await user.delete()
}

async function renderProfile(uid, user) {
    try {
        // Username
        const username = await getUsername(uid)
        usernameP.textContent = username

        // Renderizando button
        const deleteBtn = document.querySelector("#delete-pf")
        deleteBtn.addEventListener('click', () => 
            confirmModal("Deseja mesmo deletar sua conta?", () => deleteUserAccount(user.uid, user), section))

        // Renderizando Setups
        const setups = []
        const userSetupsDocs = await getSetups(uid)
        if (userSetupsDocs) loader.style.display = "none"

        userSetupsDocs.forEach(doc => setups.push(doc.data())) 
        showSetups(setups)
    } catch (exp) {
        console.error(exp)
        return // TO-DO
    }
}

onAuthStateChanged(auth, async user => {
    if (user) {
        await renderProfile(user.uid, user)
    } else {
        window.location.href = "../subpages/login.html"
    }
})