import cpus from "../assets/data/cpus.json" with { type: 'json' }
import gpus from "../assets/data/gpus.json" with { type: 'json' }
/*import rams from "../assets/data/rams.json" with { type: 'json' }
import storage from "../assets/data/storages.json" with { type: 'json' }
import motherboards from "../assets/data/motherboards.json" with { type: 'json' }
import psu from "../assets/data/PSU.json" with { type: 'json' }*/

const section = document.querySelector(".presentation-container")
const total = document.querySelector(".total")

const cleanBtn = document.querySelector("#clean-setup")

//buttons
const cpuBtn = document.querySelector("#cpu");
const gpuBtn = document.querySelector("#gpu");
const ramBtn = document.querySelector("#ram"); 
const storageBtn = document.querySelector("#storage"); 
const motherboardBtn = document.querySelector("#motherboard"); 
const psuBtn = document.querySelector("#psu"); 

let setup = recoverSetupLS() || {
  totalPrice: 0,
  cpu: null,
  gpu: null,
  ram: null, 
  storage: null, 
  motherboard: null, 
  psu: null, 
}

window.addEventListener('DOMContentLoaded', () => {
  updateSetup();
  addBtnAlter();
});

function recoverSetupLS() {
  const setupString = localStorage.getItem('setup');
  return setupString ? JSON.parse(setupString) : null;
}

function updateSetup() {
  if (setup.cpu) {
    document.querySelector('.cpu-tr').innerHTML = infoComponent(setup.cpu, "CPU");
    gpuBtn.removeAttribute('disabled');
  }
  if (setup.gpu) {
    document.querySelector('.gpu-tr').innerHTML = infoComponent(setup.gpu, "Placa de Vídeo");
  }
  if (setup.ram) { 
    document.querySelector('.ram-tr').innerHTML = infoComponent(setup.ram, "Memória RAM");
    storageBtn.removeAttribute('disabled');
  }
  if (setup.storage) { 
    document.querySelector('.storage-tr').innerHTML = infoComponent(setup.storage, "Armazenamento");
    motherboardBtn.removeAttribute('disabled');
  }
  if (setup.motherboard) { 
    document.querySelector('.motherboard-tr').innerHTML = infoComponent(setup.motherboard, "Placa-mãe");
    psuBtn.removeAttribute('disabled');
  }
  if (setup.psu) { 
    document.querySelector('.psu-tr').innerHTML = infoComponent(setup.psu, "Fonte");
  }
  total.innerHTML = `Total: R$ ${priceParser(Math.round(setup.totalPrice))}`;
}

function buildModal(title, items) {
    console.log(`Building modal for ${title}`);
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

                    </div>`).join('')}
            </div>
        </div>
    `;

    const container = document.createElement("div");
    container.classList.add("modal");
    container.innerHTML = structure;

    const btn = container.querySelector(".close");
    btn.addEventListener("click", () => {
        container.remove();
    });

    const selectors = container.querySelectorAll(".component-selector");
    selectors.forEach((selector, index) => {
        selector.addEventListener('click', () => {
            const selectedItem = items[index];
            handleSelection(selectedItem, title);

            container.remove();
        });
    });

    section.appendChild(container);
}


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

function handleSelection(item, title) {
  let previousPrice = 0;
  switch (title) {
    case "CPU":
      if (setup.cpu) {
        previousPrice = setup.cpu.price;
      }
      setup.cpu = item;
      gpuBtn.removeAttribute('disabled');
      document.querySelector('.cpu-tr').innerHTML = infoComponent(item, title);
      break;

    case "Placa de Vídeo":
      if (setup.gpu) {
        previousPrice = setup.gpu.price;
      }
      setup.gpu = item;
      document.querySelector('.gpu-tr').innerHTML = infoComponent(item, title);
      break;

    case "Memória RAM":
      if (setup.ram) {
        previousPrice = setup.ram.price;
      }
      setup.ram = item;
      document.querySelector('.ram-tr').innerHTML = infoComponent(item, title);
      storageBtn.removeAttribute('disabled');
      break;

    case "Armazenamento":
      if (setup.storage) {
        previousPrice = setup.storage.price;
      }
      setup.storage = item;
      document.querySelector('.storage-tr').innerHTML = infoComponent(item, title);
      motherboardBtn.removeAttribute('disabled');
      break;

    case "Placa-mãe":
      if (setup.motherboard) {
        previousPrice = setup.motherboard.price;
      }
      setup.motherboard = item;
      document.querySelector('.motherboard-tr').innerHTML = infoComponent(item, title);
      psuBtn.removeAttribute('disabled');
      break;

    case "Fonte":
      if (setup.psu) {
        previousPrice = setup.psu.price;
      }
      setup.psu = item;
      document.querySelector('.psu-tr').innerHTML = infoComponent(item, title);
      break;
  }

  setup.totalPrice = setup.totalPrice - previousPrice + item.price;
  total.innerHTML = `Total: R$ ${priceParser(Math.round(setup.totalPrice))}`;

  saveSetupLS();
  addBtnAlter();
}

function saveSetupLS() {
  localStorage.setItem('setup', JSON.stringify(setup));
}

cleanBtn.addEventListener("click", () => {
  setup = {
    totalPrice: 0,
    cpu: null,
    gpu: null,
    ram: null,
    storage: null,
    motherboard: null,
    psu: null
  };

  gpuBtn.setAttribute('disabled', 'disabled');
  ramBtn.setAttribute('disabled', 'disabled');
  storageBtn.setAttribute('disabled', 'disabled');
  motherboardBtn.setAttribute('disabled', 'disabled');
  psuBtn.setAttribute('disabled', 'disabled');

  total.innerHTML = `Total: R$ 0,00`;
  saveSetupLS();
  location.reload();
});

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

cpuBtn.addEventListener("click", _ => {
  console.log("CPU button clicked");
  buildModal("CPU", cpus);
});
gpuBtn.addEventListener("click", _ => {
  console.log("GPU button clicked");
  buildModal("Placa de Vídeo", gpus);
});
ramBtn.addEventListener("click", _ => {
  console.log("RAM button clicked");
  buildModal("Memória RAM", rams);
});
storageBtn.addEventListener("click", _ => {
  console.log("Storage button clicked");
  buildModal("Armazenamento", storage);
});
motherboardBtn.addEventListener("click", _ => {
  console.log("Motherboard button clicked");
  buildModal("Placa-mãe", motherboards);
});
psuBtn.addEventListener("click", _ => {
  console.log("PSU button clicked");
  buildModal("Fonte", psu);
});
