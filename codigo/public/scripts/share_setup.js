import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"
import { getFirestore, setDoc, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"

const db = getFirestore()
const auth = getAuth()

const section = document.querySelector(".presentation-container")

// uma pegada mais golang
function getSetup() {
    // Pegando setup do localstorage e parseando pra object
    const setup = JSON.parse(localStorage.getItem("setup"))
    
    if (setup.errors.length > 0) return ["Não é possível compartilhar um setup com erros!", null]
    for(const [component, value] of Object.entries(setup)) {
        if (component == "errors") continue
        if (value == null) return ["Não é possível compartilhar um setup faltando peças!"]
    }
    
    return ["", setup]
}
 
async function addSetupToCollection(setup, setupName) {
    const userUid = auth.currentUser.uid;

    // Pegando infos do user logado
    try {
        const usersDocRef = doc(db, "users", userUid)
        const userInfo = await getDoc(usersDocRef)

        // Se user existir, pego o username dele e salvo o setup dele na collection de setups
        if (userInfo.exists()) {
            // Checando pra ver se o user já tem um setup com o mesmo nome 
            const slug = setupName.toLowerCase().replace(/ /g, "-")
            const setupsDocRef = doc(db, "community-setups", `${slug}-${userUid}`)
            const setDocSnap = await getDoc(setupsDocRef)
            if (setDocSnap.exists()) 
                return "Você já tem um setup com esse nome!"
            
            // Adicionando na collection
            const shareSetup = {
                uid: userUid,
                owner: userInfo.data().username,
                slug,
                name: setupName,
                setup
            }
            await setDoc(setupsDocRef, shareSetup)

            return ""
        }
    } catch (exp) {
        console.error(exp)
        return "Error Interno. Tente novamente mais tarde."
    }
}

async function shareSetup() {
    // Modal bolado
    const structure = `
        <div class="modal-form">
            <div class="modal-info">
                <h2>Escolha o nome do Setup!</h2>
                <button class="close">X</button>
            </div>

            <input id="setup-name" type="text" name="setup-name" required placeholder="Nome do Setup">

            <div class="share-form-sender">
                <button id="share-btn-form">Compartilhar</button>
                <p class="msg"><\p>
            </div>
        </div>
    `

    const container = document.createElement("div")
    container.classList.add("modal")
    container.innerHTML = structure

    // Botão de close
    const close = container.querySelector(".close")
    close.addEventListener("click", _ => {
        container.remove()
    })

    // dando uma utilidade pro botão do modal
    const msg = container.querySelector(".msg")
    const input = container.querySelector("#setup-name")
    const btn = container.querySelector("#share-btn-form")

    input.addEventListener('focus', () => msg.textContent = "")

    btn.addEventListener("click", async _ => {
        btn.disabled = true
        msg.classList.remove("valid")

        let [err, setup] = getSetup()
        if (err != "") {
            msg.textContent = err
            btn.disabled = false
            return
        }

        if (input.value.length < 1) {
            msg.textContent = "Nome do setup não pode ser vazio!"
            btn.disabled = false
            return
        }

        if (input.value.length > 30) {
            msg.textContent = "Nome do setup não pode passar de 30 caracteres!"
            btn.disabled = false
            return
        }

        err = await addSetupToCollection(setup, input.value)
        if (err != "") {
            msg.textContent = err
            btn.disabled = false
            return
        } else {
            msg.classList.add("valid")
            msg.textContent = "Setup compartilhado com sucesso!"
            btn.disabled = false
            return
        }
    })

    section.appendChild(container)
}

function showShareButton() {
    const buttonsContainer = document.querySelector(".buttons-pc")
    const currentUser = auth.currentUser
    
    // Checando se o usar tá logado
    if (currentUser) {
      const shareBtn = document.createElement("button")

      shareBtn.id = "share-button"
      shareBtn.textContent = "Compartilhar Setup"
      shareBtn.addEventListener('click', async () => await shareSetup())

      buttonsContainer.appendChild(shareBtn)
    } else {
        // User deslogado = botão removido
        const existingButton = document.getElementById("share-button")
        if (existingButton) buttonsContainer.removeChild(existingButton)
    }
}

onAuthStateChanged(auth, showShareButton)
