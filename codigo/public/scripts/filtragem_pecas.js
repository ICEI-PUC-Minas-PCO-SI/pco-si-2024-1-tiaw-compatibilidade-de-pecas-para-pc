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

// Estado Inicial
let setup = /* recoverSetupLS() || */ {
    totalPrice: 0,
    totalWats: 0,
    cpu: null,
    gpu: null,
    ram: null,
    storage: null,
    motherboard: null,
    cooling: null,
}
// window.addEventListener('DOMContentLoaded', () => {
//     updateSetup()
// })

// Carregando os arquivos JSON
const cpus = await getJSON('http://localhost:3000/cpu')
const gpus = await getJSON('http://localhost:3000/gpu')
const rams = await getJSON('http://localhost:3000/ram')
const storages = await getJSON('http://localhost:3000/storage')
const motherboards = await getJSON('http://localhost:3000/motherboard')
const coolings = await getJSON('http://localhost:3000/cooling')

// function recoverSetupLS() {
//     const setupString = localStorage.getItem('setup')
//     return setupString ? JSON.parse(setupString) : null
// }

// function updateSetup() {
//     if (setup.cpu) {
//         document.querySelector('.cpu-tr').innerHTML = buildInfoAboutComponent(setup.cpu, "CPU")
//         gpuBtn.removeAttribute('disabled')
//     }
//     if (setup.gpu) {
//         document.querySelector('.gpu-tr').innerHTML = buildInfoAboutComponent(setup.gpu, "Placa de Vídeo")
//     }
//     total.innerHTML = `Total: R$ ${priceParser(Math.round(setup.totalPrice))}`
// }

// Funções para checar compatibilidade
const verifyCompCPU = (cpu, mth) => cpu.socket === mth.socket
const verifyCompGPU = (gpu, mth) => gpu.interface === mth.gpuInterface
const verifyCompRAM = (ram, mth) => 
    ram.type === mth.ddr && 
    ram.velocity >= mth.ramMinVelocity
const verifyCompSTR = (str, mth) => mth.storageInterface.includes(str.interface)
const verifyCapacityPSU = (psu, sum) => psu.wats > sum

// Funções Gerais
function buildInfoAboutComponent(item, title) {
    const structure = `
        <td >${title}</td>
        <td class="tr-info">
            <img src=${item.img} alt="Item" />
            <span>${item.name}</span>
        </td>
        <td>R$ ${priceParser(item.price)}</td>
        <td><button class="change-component">Alterar</button></td>
    `

    return structure
}

function handleSelection(item, title) {
    let compatibilityErrors = {
        cpu: [],
        gpu: [],
        ram: [],
        storage: [],
        cooling: []
    }

    const updateComponentDisplay = (selector, item, title) => {
        const element = document.querySelector(selector)
        element.innerHTML = buildInfoAboutComponent(item, title)
    }

    const addChangeComponentListener = (selector, modalTitle, components, componentKey) => {
        document.querySelector(selector).querySelector('.change-component').addEventListener('click', () => {
            if (setup[componentKey].hasOwnProperty('wats') && componentKey !== 'cooling') setup.totalWats -= setup[componentKey].wats
            setup.totalPrice -= setup[componentKey].price

            compatibilityErrors[componentKey] = []
            compatibilityBox.querySelectorAll(`li.${componentKey}-li`).forEach(el => el.remove())

            buildModal(modalTitle, components)
        })
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
            compatibilityErrors['cooling'].push(`${psu.name}não tem capacidade para suprir o setup. MÁX - ${psu.wats} de Potência`)
        }
    }

    const handleCompatibilityErrors = (errors) => {
        Object.keys(errors).forEach(key => {
            errors[key].forEach(msg => {
                const li = document.createElement('li')
                li.classList.add(`${key}-li`)
                li.innerText = msg

                compatibilityBox.querySelector('ul').appendChild(li)
                compatibilityBox.classList.remove('invisible')
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
            setup.totalWats += wats;
        }
        watsSpan.innerHTML = `${Math.round(setup.totalWats * 100) / 100} Wats`
    }

    // Main
    const componentActions = {
        "CPU": () => {
            setup.cpu = item
            updateComponentDisplay('.cpu-tr', item, title)
            addChangeComponentListener('.cpu-tr', 'CPU', cpus, 'cpu')
            checkCompatibility('cpu', item, setup.motherboard, verifyCompCPU, 'Placa Mãe')

            if (setup.cooling !== null) {
                compatibilityBox.querySelectorAll(`li.cooling-li`).forEach(el => el.remove())
                checkPSUCapacity(setup.cooling)
            }
        },
        "Placa de Vídeo": () => {
            setup.gpu = item
            updateComponentDisplay('.gpu-tr', item, title)
            addChangeComponentListener('.gpu-tr', 'Placa de Vídeo', gpus, 'gpu')
            checkCompatibility('gpu', item, setup.motherboard, verifyCompGPU, 'Placa Mãe')

            if (setup.cooling !== null) {
                compatibilityBox.querySelectorAll(`li.cooling-li`).forEach(el => el.remove())
                checkPSUCapacity(setup.cooling)
            }
        },
        "RAM": () => {
            setup.ram = item
            updateComponentDisplay('.ram-tr', item, title)
            addChangeComponentListener('.ram-tr', 'RAM', rams, 'ram')
            checkCompatibility('ram', item, setup.motherboard, verifyCompRAM, 'Placa Mãe')

            if (setup.cooling !== null) {
                compatibilityBox.querySelectorAll(`li.cooling-li`).forEach(el => el.remove())
                checkPSUCapacity(setup.cooling)
            }
        },
        "HD/SSD": () => {
            setup.storage = item
            updateComponentDisplay('.storage-tr', item, title)
            addChangeComponentListener('.storage-tr', 'HD/SSD', storages, 'storage')
            checkCompatibility('storage', item, setup.motherboard, verifyCompSTR, 'Placa Mãe')
        },
        "Placa Mãe": () => {
            setup.motherboard = item
            updateComponentDisplay('.motherboard-tr', item, title)
            addChangeComponentListener('.motherboard-tr', 'Placa Mãe', motherboards, 'motherboard')
            checkAllCompatibilities(item)
        },
        "Fonte": () => {
            setup.cooling = item
            updateComponentDisplay('.psu-tr', item, title)
            addChangeComponentListener('.psu-tr', 'Fonte', coolings, 'cooling')
            checkPSUCapacity(item)
        }
    }

    if (title !== "Fonte") updateTotalWats(item.wats)
    if (componentActions[title]) componentActions[title]()
    updateTotalPrice(item.price)
    handleCompatibilityErrors(compatibilityErrors)
}

function buildModal(title, items) {
    const structure = `    
        <div class="modal-content">
            <div class="modal-info">
                <h2>Selecione uma das peças para a ${title}</h2>
                <button class="close">X</button>
            </div>
            <div class="items">
                ${items.map(item => `
                    <div class="component">
                        <div class="component-all">
                            <div class="component-circle"></div> 
                            <img src=${item.img} alt="Componente" />
                            <div class="component-info">
                                <span class="component-name">${item.name}</span>
                                <span class="component-wats">${item.wats !== undefined ? item.wats + " Wats" : ""}</span>
                                <span class="component-price">R$ ${priceParser(item.price)}</span>
                            </div>
                        </div>

                        <button class="component-selector">SELECIONAR</button>
                    </div>`                 ).join('')}
            </div>
        </div>
    `

    const container = document.createElement("div")
    container.classList.add("modal")
    container.innerHTML = structure

    const btn = container.querySelector(".close")
    btn.addEventListener("click", _ => {
        container.remove()
    })

    const selectors = container.querySelectorAll(".component-selector")
    selectors.forEach((selector, index) => {
        selector.addEventListener('click', () => {
            const selectedItem = items[index]
            handleSelection(selectedItem, title)

            container.remove()
        })
    })

    section.appendChild(container)
}

// function saveSetupLS() {
//     localStorage.setItem('setup', JSON.stringify(setup))
// }

// cleanBtn.addEventListener("click", () => {

//     setup.cpu = null
//     setup.gpu = null
//     setup.totalPrice = 0

//     gpuBtn.setAttribute('disabled', 'disabled')

//     cpuBtn.removeAttribute('disabled')
//     gpuBtn.removeAttribute('disabled')

//     total.innerHTML = `Total: R$ 0,00`
//     saveSetupLS()
//     location.reload()
// })

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
