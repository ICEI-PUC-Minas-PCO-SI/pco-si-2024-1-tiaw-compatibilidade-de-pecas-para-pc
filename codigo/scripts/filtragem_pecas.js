import cpus from "../assets/data/cpus.json" with { type: 'json' }
import gpus from "../assets/data/gpus.json" with { type: 'json' }

const section = document.querySelector(".presentation-container")

const cpuBtn = document.querySelector("#cpu");
const gpuBtn = document.querySelector("#gpu");

let setup = {
    cpu: null,
    gpu: null,
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
                                <span class="component-wats">${item.wats} Wats</span>
                                <span class="component-price">R$ ${priceParser(item.price)}</span>
                            </div>
                        </div>

                        <button class="component-selector">SELECIONAR</button>
                    </div>` 
                ).join('')}
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
            const selectedItem = items[index];
            handleSelection(selectedItem, title)

            container.remove()
        });
    })

    section.appendChild(container)
}

function buildInfoAboutComponent(item, title) {
    const structure = `
        <td >${title}</td>
        <td class="tr-info">
            <img src=${item.img} alt="Item" />
            <span>${item.name}</span>
        </td>
        <td>R$ ${priceParser(item.price)}</td>
    `

    return structure
}

function handleSelection(item, title) {
    switch (title) {
        case "CPU":
            setup.cpu = item
            gpuBtn.removeAttribute('disabled')
            document.querySelector('.cpu-tr')
                .innerHTML = buildInfoAboutComponent(item, title)

            break

        case "Placa de Vídeo":
            setup.gpu = item
            document.querySelector('.gpu-tr')
                .innerHTML = buildInfoAboutComponent(item, title)

            break
    }
}

// Helpers
function priceParser(price) {
    const [integerPart, decimalPart] = price.toString().split('.')
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    
    return `${formattedIntegerPart},${decimalPart || '0'}`
}

cpuBtn.addEventListener("click", _ => buildModal("CPU", cpus))
gpuBtn.addEventListener("click", _ => buildModal("Placa de Vídeo", gpus))
