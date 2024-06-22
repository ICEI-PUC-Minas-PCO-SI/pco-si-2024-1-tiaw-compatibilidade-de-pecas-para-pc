const section = document.querySelector(".presentation-container")
const total = document.querySelector(".total")
const watsSpan = document.querySelector(".wats")
const compatibilityBox = document.querySelector('.compatibility-status')

const cleanBtn = document.querySelector("#clean-setup")
const cpuBtn = document.querySelector("#cpu")
const gpuBtn = document.querySelector("#gpu")
const ramBtn = document.querySelector("#ram")
const storageBtn = document.querySelector("#storage")
const motherboardBtn = document.querySelector("#motherboard")
const coolingBtn = document.querySelector("#psu")

const budgetInput = document.getElementById('budget')
const setBudgetButton = document.getElementById('set-budget')
const differenceSpan = document.getElementById('difference')
const totalCostElement = document.querySelector('.total')

// Estado Inicial
let setup = recoverSetupLS() || {
    totalPrice: 0,
    totalWats: 0,
    cpu: null,
    gpu: null,
    ram: null,
    storage: [],
    motherboard: null,
    cooling: null,
}

window.addEventListener('DOMContentLoaded', () => {
    loadJSONinLocalStorage()
})

// Carregando os arquivos JSON
const cpus = await getJSON('http://localhost:3000/cpu')
const gpus = await getJSON('http://localhost:3000/gpu')
const rams = await getJSON('http://localhost:3000/ram')
const storages = await getJSON('http://localhost:3000/storage')
const motherboards = await getJSON('http://localhost:3000/motherboard')
const coolings = await getJSON('http://localhost:3000/cooling')

// Funções para checar orçamento
let budget = 0

const updateCosts = () => {
    const difference = budget - setup.totalPrice
    differenceSpan.textContent = `R$ ${difference.toFixed(2)}`
    totalCostElement.textContent = `Total: R$ ${setup.totalPrice.toFixed(2)}`
}

setBudgetButton.addEventListener('click', () => {
    budget = parseFloat(budgetInput.value) || 0
    updateCosts()
})

// Funções para checar compatibilidade
const verifyCompCPU = (cpu, mth) => cpu.socket === mth.socket
const verifyCompGPU = (gpu, mth) => gpu.interface === mth.gpuInterface
const verifyCompRAM = (ram, mth) => 
    ram.type === mth.ddr && 
    ram.velocity >= mth.ramMinVelocity
const verifyCompSTR = (str, mth) => mth.storageInterface.includes(str.interface)
const verifyCapacityPSU = (psu, sum) => psu.wats > sum

// Funções Gerais
function buildInfoAboutComponent(item, title, components, componentKey) {
    const tr = document.createElement('tr')
    let structure
    let name

    if (title === "HD/SSD") {
        name = "Adicionar"
        structure = `
            <td colspan="2">${title}</td>
            ${setup.storage.map((st, index) => 
            `
                <td class="tr-info" style="justify-content: space-between;">
                    <img src=${st.img} alt="Item" />
                    <span class="small-n">${st.name}</span>
                    <span>R$ ${priceParser(st.price)}</span>
                    <button class="rm-el" data-index="${index}">Remover</button>
                </td>

            `
        )}
        `
    } else {
        name = "Alterar"
        structure = `
            <td colspan="2">${title}</td>
            <td class="tr-info">
                <img src=${item.img} alt="Item" />
                <span>${item.name}</span>
            </td>
            <td>R$ ${priceParser(item.price)}</td>
        `
    }

    const btn = document.createElement('button')
    btn.innerText = name
    btn.addEventListener('click', () => {
        if (setup[componentKey].hasOwnProperty('wats') && componentKey !== 'cooling') setup.totalWats -= setup[componentKey].wats
        if (componentKey !== 'storage') setup.totalPrice -= setup[componentKey].price  

        buildModal(title, components)
    })
    
    const container = document.createElement('td')
    
    tr.innerHTML = structure
    tr.classList.add('component-row', 'table-row')
    tr.appendChild(container)
    container.appendChild(btn)
    container.setAttribute('colspan', 3)
    container.setAttribute('align', 'right')
    
    if (title === "HD/SSD") {

        if (setup.storage.length > 2) {
            btn.disabled = true
        }
    
        // removendo HD
        tr.querySelectorAll('.rm-el').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index')
                const removedItem = setup.storage.splice(index, 1)[0]

                setup.totalPrice -= removedItem.price

                saveSetupLS()
                location.reload()
            })
        })
    }
    
    return tr
}

function updateComponentDisplay(selector, item, title, components, key) {
    const element = document.querySelector(selector)
    element.innerHTML = ''

    const container = buildInfoAboutComponent(item, title, components, key)
    Array.from(container.children).forEach(el => element.appendChild(el))
}

function handleSelection(item, title) {
    const updateTotalPrice = (price) => {
        setup.totalPrice += price
        total.innerHTML = `Total: R$ ${priceParser(Math.round(setup.totalPrice * 100) / 100)}`
    }

    const updateTotalWats = (wats) => {
        if (wats !== undefined) {
            setup.totalWats += wats
        }
        watsSpan.innerHTML = `${Math.round(setup.totalWats * 100) / 100} Wats`
    }

    // Main
    const componentActions = {
        "CPU": () => {
            setup.cpu = item
            updateComponentDisplay('.cpu-tr', item, title, cpus, 'cpu')
        },
        "Placa de Vídeo": () => {
            setup.gpu = item
            updateComponentDisplay('.gpu-tr', item, title, gpus, 'gpu')
        },
        "RAM": () => {
            setup.ram = item
            updateComponentDisplay('.ram-tr', item, title, rams, 'ram')
        },
        "HD/SSD": () => {
            setup.storage.push(item)
            updateComponentDisplay('.storage-tr', item, title, storages, 'storage')
        },
        "Placa Mãe": () => {
            setup.motherboard = item
            updateComponentDisplay('.motherboard-tr', item, title, motherboards, 'motherboard')
        },
        "Fonte": () => {
            setup.cooling = item
            updateComponentDisplay('.psu-tr', item, title, coolings, 'cooling')
        }
    }

    if (title !== "Fonte") updateTotalWats(item.wats)
    if (componentActions[title]) componentActions[title]()
        

    if (setup.cooling && setup.cooling.wats < setup.totalWats) {
        setup.cooling = null
            
        saveSetupLS()
        location.reload()
    }

    updateTotalPrice(item.price)
    updateCosts()
    saveSetupLS()
}

function buildModal(title, items) {
    const structure = `
        <div class="modal-content">
            <div class="modal-info">
                <h2>Selecione uma das peças para ${title}</h2>
                <button class="close">X</button>
            </div>
            <div class="search-item">
                <input id="item-searcher" type="text" placeholder="Digite o nome de uma peça..." />
            </div>
            <div class="items">
                ${items.map(item => `
                    <div class="component">
                        <div class="component-all">
                            <div class="component-circle"></div> 
                            <img src="${item.img}" alt="Componente" />
                            <div class="component-info">
                                <span class="component-name">${item.name}</span>
                                ${item.wats !== undefined ? `<span class="component-wats">${item.wats} Wats</span>` : ''}
                                <span class="component-price">R$ ${priceParser(item.price)}</span>
                            </div>
                        </div>
                        <button class="component-selector">SELECIONAR</button>
                    </div>`
                ).join('')}
            </div>
        </div>`

    const container = document.createElement("div")
    container.classList.add("modal")
    container.innerHTML = structure

    const searchInput = container.querySelector("#item-searcher")
    const itemsContainer = container.querySelector(".items")

    function updateItems(filteredItems) {
        itemsContainer.innerHTML = filteredItems.map(item => `
            <div class="component">
                <div class="component-all">
                    <div class="component-circle"></div>
                    <img src="${item.img}" alt="Componente" />
                    <div class="component-info">
                        <span class="component-name">${item.name}</span>
                        ${item.wats !== undefined ? `<span class="component-wats">${item.wats} Wats</span>` : ''}
                        <span class="component-price">R$ ${priceParser(item.price)}</span>
                    </div>
                </div>
                <button class="component-selector">SELECIONAR</button>
            </div>`
        ).join('')

        const selectors = itemsContainer.querySelectorAll(".component-selector")
        selectors.forEach((selector, index) => {
            selector.addEventListener('click', () => {
                const selectedItem = filteredItems[index]
                handleSelection(selectedItem, title)
                container.remove()
            })
        })
    }

    function filterItems(searchTerm) {
        return items.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            isCompatible(item, title)
        )
    }

    function isCompatible(item, title) {
        // TO-DO - Validar compatibilidade do storage
        if (title === "CPU" && setup.motherboard) return verifyCompCPU(item, setup.motherboard)
        if (title === "Placa de Vídeo" && setup.motherboard) return verifyCompGPU(item, setup.motherboard)
        if (title === "RAM" && setup.motherboard) return verifyCompRAM(item, setup.motherboard)
        // if (title === "HD/SSD" && setup.motherboard) return verifyCompSTR(item, setup.motherboard)
        if (title === "Placa Mãe") {
            return (!setup.cpu || verifyCompCPU(setup.cpu, item)) &&
                   (!setup.gpu || verifyCompGPU(setup.gpu, item)) &&
                   (!setup.ram || verifyCompRAM(setup.ram, item))
                //    (!setup.storage || verifyCompSTR(setup.storage, item))
        }
        if (title === "Fonte") {
            return verifyCapacityPSU(item, setup.totalWats)
        }
        return true
    }

    function handleSearchInput() {
        const searchTerm = searchInput.value
        const filteredItems = filterItems(searchTerm)
        updateItems(filteredItems)
    }

    // setup inicial
    const filtered = filterItems("")
    updateItems(filtered)

    // event listeners
    searchInput.addEventListener("input", handleSearchInput)

    const closeButton = container.querySelector(".close")
    closeButton.addEventListener("click", () => {
        container.remove()
    })

    section.appendChild(container)
}

// Local Storage
function recoverSetupLS() {
    const setupString = localStorage.getItem('setup')
    return setupString ? JSON.parse(setupString) : null
}

cleanBtn.addEventListener("click", () => {
    setup.totalPrice = 0
    setup.totalWats = 0
    setup.cpu = null
    setup.gpu = null
    setup.ram = null
    setup.storage = []
    setup.motherboard = null
    setup.cooling = null

    total.innerHTML = "Total:"
    watsSpan.innerHTML = ""

    saveSetupLS()
    location.reload()
})

function saveSetupLS() {
    localStorage.setItem('setup', JSON.stringify(setup))
}

async function loadJSONinLocalStorage() {
    const cpus = await getJSON('http://localhost:3000/cpu')
    const gpus = await getJSON('http://localhost:3000/gpu')
    const rams = await getJSON('http://localhost:3000/ram')
    const storages = await getJSON('http://localhost:3000/storage')
    const motherboards = await getJSON('http://localhost:3000/motherboard')
    const coolings = await getJSON('http://localhost:3000/cooling')

    updateSetup(cpus, gpus, rams, storages, motherboards, coolings)
}

function updateSetup(cpus, gpus, rams, storages, motherboards, coolings) {
    if (setup.cpu) updateComponentDisplay('.cpu-tr', setup.cpu, 'CPU', cpus, 'cpu')
    if (setup.gpu) updateComponentDisplay('.gpu-tr', setup.gpu, 'Placa de Vídeo', gpus, 'gpu')
    if (setup.ram) updateComponentDisplay('.ram-tr', setup.ram, 'RAM', rams, 'ram')
    if (setup.storage.length > 0) updateComponentDisplay('.storage-tr', setup.storage, 'HD/SSD', storages, 'storage')
    if (setup.motherboard) updateComponentDisplay('.motherboard-tr', setup.motherboard, 'Placa Mãe', motherboards, 'motherboard')
    if (setup.cooling) updateComponentDisplay('.psu-tr', setup.cooling, 'Fonte', coolings, 'cooling')

    total.innerHTML = `Total: R$ ${priceParser(Math.round(setup.totalPrice * 100) / 100)}`
    watsSpan.innerHTML = `${setup.totalWats} Wats`
}

// Helpers
function priceParser(price) {
    const [integerPart, decimalPart] = price.toString().split('.')
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

    return `${formattedIntegerPart},${decimalPart || '0'}`
}

async function getJSON(path) {
    const data = await fetch(path)
    return data.json()
}

// Carregando botões
cpuBtn.addEventListener("click", _ => buildModal("CPU", cpus))
gpuBtn.addEventListener("click", _ => buildModal("Placa de Vídeo", gpus))
ramBtn.addEventListener("click", _ => buildModal("RAM", rams))
storageBtn.addEventListener("click", _ => buildModal("HD/SSD", storages))
motherboardBtn.addEventListener("click", _ => buildModal("Placa Mãe", motherboards))
coolingBtn.addEventListener("click", _ => buildModal("Fonte", coolings))
