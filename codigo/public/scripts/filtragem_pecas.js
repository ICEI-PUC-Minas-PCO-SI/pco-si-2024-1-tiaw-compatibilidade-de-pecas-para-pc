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
    errors: [],
    totalPrice: 0,
    totalWats: 0,
    cpu: null,
    gpu: null,
    ram: null,
    storage: null,
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
function buildInfoAboutComponent(item, title, components, componentKey, compatibilityErrors) {
    const tr = document.createElement('tr')

    const structure = `
        <td colspan="2">${title}</td>
        <td class="tr-info">
            <img src=${item.img} alt="Item" />
            <span>${item.name}</span>
        </td>
        <td>R$ ${priceParser(item.price)}</td>
    `

    const btn = document.createElement('button')
    btn.innerText = 'Alterar'
    btn.addEventListener('click', () => {
        if (setup[componentKey].hasOwnProperty('wats') && componentKey !== 'cooling') setup.totalWats -= setup[componentKey].wats
        setup.totalPrice -= setup[componentKey].price

        compatibilityErrors[componentKey] = []
        compatibilityBox.querySelectorAll(`li.${componentKey}-li`).forEach(el => el.remove())

        buildModal(title, components)
    })

    const container = document.createElement('td')
    container.appendChild(btn)

    tr.innerHTML = structure
    tr.classList.add('component-row', 'table-row')
    tr.appendChild(container)

    return tr
}

function updateComponentDisplay(selector, item, title, components, key, compatibilityErrors) {
    const element = document.querySelector(selector)
    element.innerHTML = ''

    const container = buildInfoAboutComponent(item, title, components, key, compatibilityErrors)
    Array.from(container.children).forEach(el => element.appendChild(el))
}

function handleSelection(item, title) {
    let compatibilityErrors = {
        cpu: [],
        gpu: [],
        ram: [],
        storage: [],
        cooling: []
    }

    const checkCompatibility = (componentKey, item, motherboard, verifyFunction, motherboardTitle) => {
        if (motherboard !== null && !verifyFunction(item, motherboard)) {
            compatibilityErrors[componentKey].push(`${item.name} não é compatível com a ${motherboardTitle} ${motherboard.name}`)
        }
    }

    const checkAllCompatibilities = (motherboard) => {
        ['cpu', 'gpu', 'ram', 'storage'].forEach(componentKey => {
            const component = setup[componentKey]
            if (component !== null) {
                const verifyFunction = {
                    cpu: verifyCompCPU,
                    gpu: verifyCompGPU,
                    ram: verifyCompRAM,
                    storage: verifyCompSTR
                }[componentKey]

                compatibilityBox.querySelectorAll(`li.${componentKey}-li`).forEach(el => el.remove())
                checkCompatibility(componentKey, component, motherboard, verifyFunction, 'Placa Mãe')
            }
        })
    }

    const checkPSUCapacity = (psu) => {
        if (!verifyCapacityPSU(psu, setup.totalWats)) {
            compatibilityErrors['cooling'].push(`${psu.name} não tem capacidade para suprir o setup. MÁX - ${psu.wats} de Potência`)
        }
    }

    const handleCompatibilityErrors = (errors) => {
        setup.errors = []

        Object.keys(errors).forEach(key => {
            errors[key].forEach(msg => {
                const li = document.createElement('li')
                li.classList.add(`${key}-li`)
                li.innerText = msg

                compatibilityBox.querySelector('ul').appendChild(li)
                compatibilityBox.classList.remove('invisible')
            })
        })

        compatibilityBox.querySelector('ul').querySelectorAll('li').forEach(el => {
            setup.errors.push({
                type: el.className,
                msg: el.innerText,
            })
        })

        if (compatibilityBox.querySelector('ul').querySelectorAll('li').length === 0) compatibilityBox.classList.add('invisible')
    }

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
            updateComponentDisplay('.cpu-tr', item, title, cpus, 'cpu', compatibilityErrors)
            checkCompatibility('cpu', item, setup.motherboard, verifyCompCPU, 'Placa Mãe')

            if (setup.cooling !== null) {
                compatibilityBox.querySelectorAll(`li.cooling-li`).forEach(el => el.remove())
                checkPSUCapacity(setup.cooling)
            }
        },
        "Placa de Vídeo": () => {
            setup.gpu = item
            updateComponentDisplay('.gpu-tr', item, title, gpus, 'gpu', compatibilityErrors)
            checkCompatibility('gpu', item, setup.motherboard, verifyCompGPU, 'Placa Mãe')

            if (setup.cooling !== null) {
                compatibilityBox.querySelectorAll(`li.cooling-li`).forEach(el => el.remove())
                checkPSUCapacity(setup.cooling)
            }
        },
        "RAM": () => {
            setup.ram = item
            updateComponentDisplay('.ram-tr', item, title, rams, 'ram', compatibilityErrors)
            checkCompatibility('ram', item, setup.motherboard, verifyCompRAM, 'Placa Mãe')

            if (setup.cooling !== null) {
                compatibilityBox.querySelectorAll(`li.cooling-li`).forEach(el => el.remove())
                checkPSUCapacity(setup.cooling)
            }
        },
        "HD/SSD": () => {
            setup.storage = item
            updateComponentDisplay('.storage-tr', item, title, storages, 'storage', compatibilityErrors)
            checkCompatibility('storage', item, setup.motherboard, verifyCompSTR, 'Placa Mãe')
        },
        "Placa Mãe": () => {
            setup.motherboard = item
            updateComponentDisplay('.motherboard-tr', item, title, motherboards, 'motherboard', compatibilityErrors)
            checkAllCompatibilities(item)
        },
        "Fonte": () => {
            setup.cooling = item
            updateComponentDisplay('.psu-tr', item, title, coolings, 'cooling', compatibilityErrors)
            checkPSUCapacity(item)
        }
    }

    if (title !== "Fonte") updateTotalWats(item.wats)
    if (componentActions[title]) componentActions[title]()
    updateTotalPrice(item.price)
    handleCompatibilityErrors(compatibilityErrors)
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
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }

    function handleSearchInput() {
        const searchTerm = searchInput.value
        const filteredItems = filterItems(searchTerm)
        updateItems(filteredItems)
    }

    // setup inicial
    updateItems(items)

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
    setup.errors = []
    setup.totalPrice = 0
    setup.totalWats = 0
    setup.cpu = null
    setup.gpu = null
    setup.ram = null
    setup.storage = null
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
    if (setup.cpu) updateComponentDisplay('.cpu-tr', setup.cpu, 'CPU', cpus, 'cpu', setup.errors)
    if (setup.gpu) updateComponentDisplay('.gpu-tr', setup.gpu, 'Placa de Vídeo', gpus, 'gpu', setup.errors)
    if (setup.ram) updateComponentDisplay('.ram-tr', setup.ram, 'RAM', rams, 'ram', setup.errors)
    if (setup.storage) updateComponentDisplay('.storage-tr', setup.storage, 'HD/SSD', storages, 'storage', setup.errors)
    if (setup.motherboard) updateComponentDisplay('.motherboard-tr', setup.motherboard, 'Placa Mãe', motherboards, 'motherboard', setup.errors)
    if (setup.cooling) updateComponentDisplay('.psu-tr', setup.cooling, 'Fonte', coolings, 'cooling', setup.errors)

    total.innerHTML = `Total: ${priceParser(Math.round(setup.totalPrice * 100) / 100)}`
    watsSpan.innerHTML = `${setup.totalWats} Wats`

    setup.errors.forEach(err => {
        const li = document.createElement('li')
        li.classList.add(err.type)
        li.innerText = err.msg

        compatibilityBox.querySelector('ul').appendChild(li)
        compatibilityBox.classList.remove('invisible')
    })
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
