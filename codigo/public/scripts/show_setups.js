import { upperAll } from "../lib/text.js"
import { getFirestore, collection, getDocs, query, orderBy, limit, startAfter, getCountFromServer } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"

const db = getFirestore()

// Funções Primarias
function createSetupCards(setups, container) {
    container.innerHTML = ""
    for (const userSetup of setups) {
        if (userSetup.is_private) continue

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
                       ${setup.storage.map(st => `<li style="margin-left: 20px;">${st.name}</li>`).join(' ')}
                    </ul>
                </ul>

                <div class="card-owner">
                    <p>Feito por: <span>${userSetup.owner}</span></p>
                    <p>R$ ${Math.round(setup.totalPrice)}</p>
                </div> 
            </div>
        `

        const c = document.createElement("div")
        c.classList.add("card")
        c.innerHTML = structure

        container.appendChild(c)
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.querySelector(".cards")
    const showMore = document.querySelector("#load-more")
    const loader = document.querySelector(".loader")

    const setups = []
    const pcPerLoad = 9
    let lastVisible = null

    const setupsRef = collection(db, "community-setups")
    const q = query(setupsRef, orderBy("name"), limit(pcPerLoad))

    const counter = await getCountFromServer(setupsRef)
    const querySetups = await getDocs(q)

    if (querySetups) loader.style.display = "none"
    querySetups.forEach((qs) => {
        setups.push(qs.data())
        lastVisible = qs
    })

    if (counter.data().count > pcPerLoad) showMore.style.display = 'flex'

    createSetupCards(setups, container)

    // Carregar mais setups
    showMore.addEventListener("click", async () => {
        showMore.disabled = true

        const nextQ = query(setupsRef, orderBy("created_at"), startAfter(lastVisible), limit(pcPerLoad))
        const nextSetups = await getDocs(nextQ)

        if (nextSetups.empty) {
            showMore.style.display = 'none'
        } else {
            nextSetups.forEach((qs) => {
                setups.push(qs.data())
                lastVisible = qs
            })

            createSetupCards(setups, container)
            showMore.disabled = false
        }
    })
})
