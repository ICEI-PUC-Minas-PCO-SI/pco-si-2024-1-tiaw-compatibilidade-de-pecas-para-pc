// Função para carregar o arquivo JSON
async function fetchSetupJson() {
    const response = await fetch('/codigo/assets/data/setups.json'); // Carrega o arquivo JSON da pasta 'data'
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
            listItem.className = "component-item";

            const title = document.createElement("h3");
            title.textContent = component.nome;

            const description = document.createElement("p");
            description.textContent = component.descrição;

            content.appendChild(title);
            content.appendChild(description);

            if (component.preço) {
                const price = document.createElement("p");
                price.textContent = "Preço: " + component.preço;
                content.appendChild(price);
            }

            listItem.appendChild(image);
            listItem.appendChild(content);

            componentList.appendChild(listItem);
        });
    }
}

// Carrega o JSON uma vez e adiciona os ouvintes de eventos para os botões
fetchSetupJson().then(setupData => {
    document.getElementById("setup-low").addEventListener("click", () => renderComponents(setupData, "setup-low"));
    document.getElementById("setup-medio").addEventListener("click", () => renderComponents(setupData, "setup-medio"));
    document.getElementById("setup-high").addEventListener("click", () => renderComponents(setupData, "setup-high"));
    document.getElementById("setup-ultra").addEventListener("click", () => renderComponents(setupData, "setup-ultra"));
}).catch(error => {
    console.error("Erro ao carregar o JSON:", error);
});