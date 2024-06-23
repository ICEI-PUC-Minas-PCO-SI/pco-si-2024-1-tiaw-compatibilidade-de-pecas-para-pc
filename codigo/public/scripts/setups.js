 // Função para carregar o arquivo JSON e renderizar o setup padrão
async function loadAndRenderDefaultSetup() {
    try {
        const setupData = await fetchSetupJson(); // Carrega o JSON
        const defaultSetup = "setup-low"; // Defina aqui o setup padrão que deseja carregar inicialmente

        renderComponents(setupData, defaultSetup); // Renderiza os componentes do setup padrão
        renderDesc(setupData, defaultSetup); // Renderiza a descrição e o preço do setup padrão
    } catch (error) {
        console.error("Erro ao carregar e renderizar o setup padrão:", error);
    }
}
 
 //Função para carregar o arquivo JSON
async function fetchSetupJson() {
    const response = await fetch('http://localhost:3000/setup'); // Carrega o arquivo JSON da pasta 'data'
    if (!response.ok) {
        throw new Error('Não foi possível carregar o arquivo JSON.');
    }

    return response.json(); // Retorna o JSON como objeto
}

// Função para renderizar os componentes do setup especificado
function renderComponents(setupData, setupName) {
    const componentList = document.getElementById("component-list");
    componentList.innerHTML = ""; // Limpa a lista antes de adicionar os componentes

    const setupComponents = setupData[setupName][0]; // Obtém o primeiro objeto do array

    // Itera sobre cada categoria de componentes
    for (const category in setupComponents) {
        const components = setupComponents[category];

        // Adiciona cada componente à lista
        components.forEach(component => {
            const listItem = document.createElement("li");
            listItem.className = "component-item";
            listItem.style.marginBottom = "10px"
            listItem.style.padding = "20px 25px"

            const image = document.createElement("img");
            image.src = component.image_url;
            image.style.width = "130px";
            image.style.borderRadius = "10px";

            const content = document.createElement("div");

            const title = document.createElement("h3");
            title.textContent = component.nome;

            const description = document.createElement("p");
            description.textContent = component.descrição;

            content.appendChild(title);
            content.appendChild(description);

            if (component.preço) {
                const price = document.createElement("p");
                price.textContent = "Preço: R$ " + component.preço;
                content.appendChild(price);
            }

            listItem.appendChild(image);
            listItem.appendChild(content);

            componentList.appendChild(listItem);
        });
    }
}

// Função para renderizar a descrição e o preço de cada componente do setup especificado
function renderDesc(setupData, setupName) {
    const checkout = document.getElementById("total-checkout");
    const descList = document.getElementById("average-list");
    const totalValue = document.getElementById("average-total");
    const avgValue = document.getElementById("average-value");
    var total = 0;
    var media = 0;
    var cont = 0;
    descList.innerHTML = ""; // Limpa a lista antes de adicionar os componentes

    const setupComponents = setupData[setupName][0]; // Obtém o primeiro objeto do array

    // Itera sobre cada categoria de componentes
    for (const category in setupComponents) {
        const components = setupComponents[category];

        // Adiciona cada componente e seu preço à lista de checkout
        components.forEach(component => {
            const listItem = document.createElement("li");
            listItem.className = "average-item";
            listItem.style.marginBottom = "2em"
            listItem.style.padding = ""

            const title = document.createElement("h5");
            title.textContent = component.nome;
            title.style.fontSize = "1em"

            const content = document.createElement("div");

            content.appendChild(title);

            if (component.preço) {
                const price = document.createElement("p");
                price.textContent = "Preço: R$ " + component.preço;
                content.appendChild(price);
            }
            
            checkout.style.display = "inline-block"; // Exibe o checkout do setup especificado
            total += component.preço;
            cont++;
            listItem.appendChild(content);
            descList.appendChild(listItem);
        });
    }

    // Cálculo de média e exibição final dos valores de média e total
    media = total / cont;
    totalValue.textContent = total.toFixed(2);
    avgValue.textContent = media.toFixed(2);
}

// Carrega o JSON uma vez e adiciona os ouvintes de eventos para os botões
fetchSetupJson().then(setupData => {
    const setups = ["setup-low", "setup-medio", "setup-high", "setup-ultra"];
setups.forEach(setup => {
    document.getElementById(setup).addEventListener("click", () => {
        renderComponents(setupData, setup);
        renderDesc(setupData, setup);
    });
});
loadAndRenderDefaultSetup();
}).catch(error => {
    console.error("Erro ao carregar o JSON:", error);
});



window.onload = function () {
    carregaVideo1()
}

function carregaVideo1(){
    let imprime = '';
    imprime = `
    <video src="../assets/video/Minecraft.mp4 " alt ="Game" id = "reset" width="95%" height="250px" class="mine" autoplay loop muted></video>
    `
    document.getElementById('video').innerHTML=imprime;
}
function carregaVideo2(){
    let imprime = '';
    imprime = `
    <video src="../assets/video/valorant.mp4" alt ="Game" id="reset" width="95%" height="250px" class="vava" autoplay loop muted></video> 
    `
    document.getElementById('video').innerHTML=imprime;
}
function carregaVideo3(){
    let imprime = '';
    imprime = `
    <video src="../assets/video/MWII.mp4" alt ="Game" id = "reset" width="95%" height="250px" class="MWII" autoplay loop muted></video>
    `
    document.getElementById('video').innerHTML=imprime;
}
function carregaVideo4(){
    let imprime = '';
    imprime = `
    <video src="../assets/video/Cyberpunk.mp4" alt ="Game" id = "reset" width="95%" height="250px" class="cyber" autoplay loop muted></video>
    `
    document.getElementById('video').innerHTML=imprime;
}

document.getElementById("setup-low").addEventListener("click", () => renderComponents(carregaVideo1()));
document.getElementById("setup-medio").addEventListener("click", () => renderComponents(carregaVideo2()));
document.getElementById("setup-high").addEventListener("click", () => renderComponents(carregaVideo3()));
document.getElementById("setup-ultra").addEventListener("click", () => renderComponents(carregaVideo4()));