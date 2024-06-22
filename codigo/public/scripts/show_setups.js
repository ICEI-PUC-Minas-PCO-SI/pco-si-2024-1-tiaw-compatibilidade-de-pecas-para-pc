import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"
import { 
    getFirestore, 
    collection, 
    getDocs, 
    query, 
    orderBy, 
    doc, 
    getDoc, 
    limit, 
    startAfter, 
    getCountFromServer, 
    deleteDoc 
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"

import { upperAll } from "../lib/text.js"
import { confirmModal } from "../lib/confirm_modal.js"

const auth = getAuth()
const db = getFirestore()

const section = document.querySelector(".cards-container")

// Funções Primarias
function createSetupCards(setups, container, isAdmin) {
    const generateStructure = (isAdmin, userSetup) => {
        return `
            <div class="card-img">
                <div class="images">
                    <img src=${userSetup.setup.cpu.img} alt="CPU" />
                    <img src=${userSetup.setup.gpu.img} alt="PLACA" />
                </div>
            </div>
            <div class="card-info">
                <h3>${upperAll(userSetup.name)}</h3>
                <ul class="card-components">
                    <li><strong>CPU</strong> - ${userSetup.setup.cpu.name}</li>
                    <li><strong>GPU</strong> - ${userSetup.setup.gpu.name}</li>
                    <li><strong>RAM</strong> - ${userSetup.setup.ram.name}</li>
                    <li><strong>PLACA-MÃE</strong> - ${userSetup.setup.motherboard.name}</li>
                    <li><strong>FONTE</strong> - ${userSetup.setup.cooling.name}</li>
                    <li><strong>HD/SSD -</strong></li>
                    <ul>
                        ${userSetup.setup.storage.map(st => `<li style="margin-left: 20px;">${st.name}</li>`).join(' ')}
                    </ul>
                </ul>
                <div class="card-owner">
                    <p>Feito por: <span>${userSetup.owner}</span></p>
                    <p>R$ ${Math.round(userSetup.setup.totalPrice)}</p>
                </div>
                ${isAdmin ? '<button id="delete-setup">Deletar Setup</button>' : ''}
            </div>
        `
    }

    container.innerHTML = ""
    for (const userSetup of setups) {
        if (userSetup.is_private) continue

        const structure = generateStructure(isAdmin, userSetup)

        const c = document.createElement("div")
        c.classList.add("card")
        c.innerHTML = structure

        if (isAdmin) {
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
        }

        container.appendChild(c)
    }
}

// Checando se user logado é ADMIN
let isAdmin = false
onAuthStateChanged(auth, async user => {
    const uid = user.uid
    const ref = doc(db, "users", uid)
    const loggedUser = await getDoc(ref)

    if (loggedUser.data().type === "ADMIN") isAdmin = true
})

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.querySelector(".cards")
    const showMore = document.querySelector("#load-more")
    const loader = document.querySelector(".loader")

    const setups = []
    const pcPerLoad = 9
    let lastVisible = null

    const setupsRef = collection(db, "community-setups")
    const q = query(setupsRef, orderBy("created_at", "desc"), limit(pcPerLoad))

    const counter = await getCountFromServer(setupsRef)
    const querySetups = await getDocs(q)

    if (querySetups) loader.style.display = "none"
    querySetups.forEach((qs) => {
        setups.push(qs.data())
        lastVisible = qs
    })

    if (counter.data().count > pcPerLoad) showMore.style.display = 'flex'

    createSetupCards(setups, container, isAdmin)

    // Carregar mais setups
    showMore.addEventListener("click", async () => {
        showMore.disabled = true

        const nextQ = query(setupsRef, orderBy("created_at", "desc"), startAfter(lastVisible), limit(pcPerLoad))
        const nextSetups = await getDocs(nextQ)

        if (nextSetups.empty) {
            showMore.style.display = 'none'
        } else {
            nextSetups.forEach((qs) => {
                setups.push(qs.data())
                lastVisible = qs
            })

            createSetupCards(setups, container, isAdmin)
            showMore.disabled = false
        }
    })
})
