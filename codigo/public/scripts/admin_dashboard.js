import {
  getAuth,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js'
import {
  getFirestore,
  getDoc,
  getDocs,
  doc,
  collection,
  query,
  orderBy,
  limit,
  deleteDoc,
} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js'

const auth = getAuth()
const db = getFirestore()

const reviewsContainer = document.querySelector('.users-reviews')
const usersContainer = document.querySelector('.users-info')
const quantityContainer = document.querySelector('.dashboard-quantity')
const setupsContainer = document.querySelector('.setups')

// Peças mais utilizadas
const buildMostUsedComponents = setups => {
  const handleIncrement = (id, resultField, component) => {
    if (resultField[id]) {
      resultField[id].count++
    } else {
      resultField[id] = {
        ID: id,
        name: component.name,
        img: component.img,
        count: 1,
      }
    }
  }

  const result = {
    cpus: {},
    gpus: {},
    mtbh: {},
  }

  for (const s of setups) {
    const setup = s.setup

    if (setup.cpu) handleIncrement(setup.cpu.ID, result.cpus, setup.cpu)
    if (setup.gpu) handleIncrement(setup.gpu.ID, result.gpus, setup.gpu)
    if (setup.motherboard)
      handleIncrement(setup.motherboard.ID, result.mtbh, setup.motherboard)
  }

  // Ordenar por contagem (descendente)
  const sortFunction = (a, b) => b.count - a.count
  result.cpus = Object.values(result.cpus).sort(sortFunction).splice(0, 5)
  result.gpus = Object.values(result.gpus).sort(sortFunction).splice(0, 5)
  result.mtbh = Object.values(result.mtbh).sort(sortFunction).splice(0, 5)

  return result
}

async function renderMostUsedComponents() {
  const ref = collection(db, 'community-setups')
  const docs = await getDocs(ref)

  const setups = []
  docs.forEach(s => setups.push(s.data()))

  // Renderizando
  const result = buildMostUsedComponents(setups)
  for (const [componentType, mostUsed] of Object.entries(result)) {
    const container = document.createElement('div')
    container.classList.add('top-components')

    const componentHeader = document.createElement('h3')
    componentHeader.textContent = componentType.toUpperCase()
    container.appendChild(componentHeader)

    const listContainer = document.createElement('ol')

    for (const setup of mostUsed) {
      const structure = `
          <img src="${setup.img}"></img>
          <div>
            <p>${setup.name}</p>
            <span><span>Quantidade:</span>  ${setup.count}</span>
          </div>
      `

      const li = document.createElement('li')
      li.classList.add('top-li')
      li.innerHTML = structure
      listContainer.appendChild(li)
    }

    container.appendChild(listContainer)
    quantityContainer.appendChild(container)
  }
}

// Renders
async function renderReviews() {
  const ref = query(collection(db, 'users'), orderBy('username'), limit(100))
  const docs = await getDocs(ref)

  docs.forEach(uSnap => {
    const user = uSnap.data()

    if (user.type !== 'ADMIN' && user.review) {
      const structure = `
          <h3>${user.username}</h3>
          <p>${user.review}</p> 
      `

      const container = document.createElement('div')
      container.classList.add('review-card')
      container.innerHTML = structure

      reviewsContainer.appendChild(container)
    }
  })
}

async function renderUsers() {
  const ref = query(collection(db, 'users'), orderBy('type'), limit(100))
  const docs = await getDocs(ref)

  docs.forEach(uSnap => {
    const user = uSnap.data()

    const structure = `
          <h3>${user.username}</h3>
          <p>ID: ${user.uid}</p>
          <p>Tipo: ${user.type}</p> 
      `

    const container = document.createElement('div')
    container.classList.add('review-card')
    container.innerHTML = structure

    usersContainer.appendChild(container)
  })
}

async function renderSetups() {
  const ref = query(
    collection(db, 'community-setups'),
    orderBy('created_at', 'desc'),
    limit(50),
  )
  const docs = await getDocs(ref)

  docs.forEach(ss => {
    const setup = ss.data()

    const structure = `
        <div class="setup-name">
          <h3>${setup.name}</h3>
          <div>
            <span>${setup.owner} - Privado: ${
      setup.is_private ? 'Sim' : 'Não'
    }</span>
          </div>
        </div>

        <button id="delete">Deletar</button>
      `

    const container = document.createElement('div')
    container.classList.add('review-card')
    container.innerHTML = structure

    const deleteBtn = container.querySelector('#delete')
    deleteBtn.addEventListener('click', async () => {
      try {
        await deleteDoc(
          doc(db, 'community-setups', `${setup.slug}-${setup.uid}`),
        )
        location.reload()
      } catch (exp) {
        console.error(exp)
        return
      }
    })

    setupsContainer.appendChild(container)
  })
}

// veficiando se user é admin, se for, entra, se não, não deixe entrar
onAuthStateChanged(auth, async user => {
  if (user) {
    const uid = user.uid
    const ref = doc(db, 'users', uid)
    const loggedUser = await getDoc(ref)

    if (loggedUser.data().type !== 'ADMIN') window.location.href = '/'
    else {
      await renderMostUsedComponents()
      await renderReviews()
      await renderUsers()
      await renderSetups()
    }
  } else {
    window.location.href = '/'
  }
})
