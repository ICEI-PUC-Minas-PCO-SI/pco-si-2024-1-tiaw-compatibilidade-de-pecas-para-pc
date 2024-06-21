import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"
import { getFirestore, setDoc, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"

const db = getFirestore()
const auth = getAuth()

const section = document.querySelector(".presentation-container")

// uma pegada mais golang
function getSetup() {
    // Pegando setup do localstorage e parseando pra object
    const setup = JSON.parse(localStorage.getItem("setup"))
    
    for(const [_, value] of Object.entries(setup)) {
        if (value == null) return ["Não é possível compartilhar um setup faltando peças!"]
    }
    
    return ["", setup]
}
 
async function addSetupToCollection(setup, setupName, isPrivate) {
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
                setup,
                is_private: isPrivate,
                created_at: new Date().toISOString()
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

            <div class="private-field">
                <input id="is-private" type="checkbox" name="is-private" >
                <label for="is-private">Privado</label>
            </div>

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

    // Private checkbox
    const checkboxPrivate = container.querySelector("#is-private")

    // dando uma utilidade pro botão do modal
    const msg = container.querySelector(".msg")
    const input = container.querySelector("#setup-name")
    const btn = container.querySelector("#share-btn-form")

    input.addEventListener('focus', () => msg.textContent = "")

    btn.addEventListener("click", async _ => {
        btn.disabled = true
        msg.textContent = ""
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

        if (input.value.length > 25) {
            msg.textContent = "Nome do setup não pode passar de 25 caracteres!"
            btn.disabled = false
            return
        }

        err = await addSetupToCollection(setup, input.value, checkboxPrivate.checked)
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
