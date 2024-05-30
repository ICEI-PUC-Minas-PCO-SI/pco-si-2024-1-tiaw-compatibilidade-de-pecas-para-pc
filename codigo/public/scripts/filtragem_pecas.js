const section = document.querySelector(".presentation-container")
const total = document.querySelector(".total")

const cleanBtn = document.querySelector("#clean-setup")
const cpuBtn = document.querySelector("#cpu");
const gpuBtn = document.querySelector("#gpu");
const ramBtn = document.querySelector("#ram");
const storageBtn = document.querySelector("#storage");
const motherboardBtn = document.querySelector("#motherboard");
const coolingBtn = document.querySelector("#psu");

// Estado Inicial
let setup =  recoverSetupLS() ||  {
    totalPrice: 0,
    cpu: null,
    gpu: null,
    ram: null,
    storage: null,
    motherboard: null,
    cooling: null,
}
 window.addEventListener('DOMContentLoaded', () => {
     updateSetup();
     addBtnAlter();
 });

// Carregando os arquivos JSON
const cpus = await getJSON('http://localhost:3000/cpu')
const gpus = await getJSON('http://localhost:3000/gpu')
const rams = await getJSON('http://localhost:3000/ram')
const storages = await getJSON('http://localhost:3000/storage')
const motherboards = await getJSON('http://localhost:3000/motherboard')
const cooling = await getJSON('http://localhost:3000/cooling')

// Funções para checar compatibilidade
const verifyCompCPU = (cpu, mth) => cpu.socket === mth.socket
const verifyCompGPU = (gpu, mth) => gpu.interface === mth.gpuInterface
const verifyCompRAM = (ram, mth) => 
    ram.type === mth.ramType && 
    ram.velocity <= mth.ramMaxVelocity
const verifyCompSTR = (str, mth) => mth.storageInterface.includes(str.interface)

// Funções
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
    let isCompatible = true

    switch (title) {
        case "CPU":
            setup.cpu = item
            document.querySelector('.cpu-tr').innerHTML = buildInfoAboutComponent(item, title)

            if (setup.motherboard !== null) 
                isCompatible = verifyCompCPU(item, setup.motherboard)

            break

        case "Placa de Vídeo":
            setup.gpu = item
            document.querySelector('.gpu-tr').innerHTML = buildInfoAboutComponent(item, title)

            if (setup.motherboard !== null) 
                isCompatible = verifyCompGPU(item, setup.motherboard)

            break

        case "RAM":
            setup.ram = item
            document.querySelector('.ram-tr').innerHTML = buildInfoAboutComponent(item, title)

            break

        case "HD/SSD":
            setup.storage = item
            document.querySelector('.storage-tr').innerHTML = buildInfoAboutComponent(item, title)

            if (setup.motherboard !== null)
                isCompatible = verifyCompSTR(item, setup.motherboard)

            break

        case "Placa Mãe":
            setup.motherboard = item
            document.querySelector('.motherboard-tr').innerHTML = buildInfoAboutComponent(item, title)

            if (setup.cpu !== null) 
                isCompatible = isCompatible && verifyCompCPU(setup.cpu, item);
            if (setup.gpu !== null) 
                isCompatible = isCompatible && verifyCompGPU(setup.gpu, item);
            // if (setup.ram !== null) 
            //     isCompatible = isCompatible && verifyCompRAM(setup.ram, item);
            if (setup.storage !== null) 
                isCompatible = isCompatible && verifyCompSTR(setup.storage, item);

            break

        case "Fonte":
            setup.cooling = item
            document.querySelector('.psu-tr').innerHTML = buildInfoAboutComponent(item, title)

            break
    }

    if (!isCompatible) console.log("bosta")

    setup.totalPrice += item.price
    total.innerHTML = `Total: R$ ${priceParser(Math.round(setup.totalPrice))}`

     saveSetupLS()
     addBtnAlter()
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
            const selectedItem = items[index];
            handleSelection(selectedItem, title)

            container.remove()
        });
    })

    section.appendChild(container)
}
function recoverSetupLS() {
    const setupString = localStorage.getItem('setup');
    return setupString ? JSON.parse(setupString) : null;
}

function updateSetup() {
   if (setup.cpu) {
       document.querySelector('.cpu-tr').innerHTML = buildInfoAboutComponent(setup.cpu, "CPU");
       gpuBtn.removeAttribute('disabled');
   }
   if (setup.gpu) {
       document.querySelector('.gpu-tr').innerHTML = buildInfoAboutComponent(setup.gpu, "Placa de Vídeo");
   }
   if (setup.ram) {
       document.querySelector('.ram-tr').innerHTML = buildInfoAboutComponent(setup.ram, "RAM");
   }
   if (setup.storage) {
       document.querySelector('.storage-tr').innerHTML = buildInfoAboutComponent(setup.storage, "HD/SSD");
   }
   if (setup.motherboard) {
       document.querySelector('.motherboard-tr').innerHTML = buildInfoAboutComponent(setup.motherboard, "Placa Mãe");
   }
   if (setup.cooling) {
       document.querySelector('.psu-tr').innerHTML = buildInfoAboutComponent(setup.cooling, "Fonte");
   }
   total.innerHTML = `Total: R$ ${priceParser(Math.round(setup.totalPrice))}`;
}

 function saveSetupLS() {
     localStorage.setItem('setup', JSON.stringify(setup));
 }
 
 cleanBtn.addEventListener("click", () => {
    
    setup.cpu = null;
    setup.gpu = null;
    setup.ram = null;
    setup.storage = null;
    setup.motherboard = null;
    setup.cooling = null;
    setup.totalPrice = 0;

    document.querySelector('.cpu-tr').innerHTML = "";
    document.querySelector('.gpu-tr').innerHTML = "";
    document.querySelector('.ram-tr').innerHTML = "";
    document.querySelector('.storage-tr').innerHTML = "";
    document.querySelector('.motherboard-tr').innerHTML = "";
    document.querySelector('.psu-tr').innerHTML = "";
    total.innerHTML = `Total: R$ 0,00`;

    gpuBtn.setAttribute('disabled', 'disabled');
    cpuBtn.removeAttribute('disabled');
    gpuBtn.removeAttribute('disabled');

    saveSetupLS();
    location.reload();
});

function infoComponent(item, title) {
    let btnAlter = '';
  
    
    if (title === "CPU" && setup.cpu) {
      btnAlter = '<button class="alter-btn" data-type="CPU">Alterar</button>';
    } else if (title === "Placa de Vídeo" && setup.gpu) {
      btnAlter = '<button class="alter-btn" data-type="Placa de Vídeo">Alterar</button>';
    } else if (title === "Memória RAM" && setup.ram) {
      btnAlter = '<button class="alter-btn" data-type="Memória RAM">Alterar</button>';
    } else if (title === "Armazenamento" && setup.storage) {
      btnAlter = '<button class="alter-btn" data-type="Armazenamento">Alterar</button>';
    } else if (title === "Placa-mãe" && setup.motherboard) {
      btnAlter = '<button class="alter-btn" data-type="Placa-mãe">Alterar</button>';
    } else if (title === "Fonte" && setup.psu) {
      btnAlter = '<button class="alter-btn" data-type="Fonte">Alterar</button>';
    }
  
    const structure = `
      <td>${title}</td>
      <td class="tr-info">
        <img src=${item.img} alt="Item" />
        <span>${item.name}</span>
      </td>
      <td>R$ ${priceParser(item.price)}</td>
      <td class="alter-cell">${btnAlter}</td>`;
  
    return structure;
  }

function addBtnAlter() {
    const alterButtons = document.querySelectorAll(".alter-btn");
    alterButtons.forEach(button => {
      button.addEventListener("click", () => {
        const type = button.getAttribute("data-type");
        console.log(`Alter button clicked for ${type}`);
        if (type === "CPU") {
          buildModal("CPU", cpus);
        } else if (type === "Placa de Vídeo") {
          buildModal("Placa de Vídeo", gpus);
        } else if (type === "Memória RAM") {
          buildModal("Memória RAM", rams);
        } else if (type === "Armazenamento") {
          buildModal("Armazenamento", storage);
        } else if (type === "Placa-mãe") {
          buildModal("Placa-mãe", motherboards);
        } else if (type === "Fonte") {
          buildModal("Fonte", psu);
        }
      });
    });
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
coolingBtn.addEventListener("click", _ => buildModal("Fonte", cooling))
