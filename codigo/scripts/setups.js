document.getElementById("setup-low").addEventListener("click", function() {
    const cpuList = document.getElementById("cpu-list");

    // Limpa a lista antes de adicionar os elementos
    cpuList.innerHTML = "";

    json.cpus.forEach(cpu => {
        const listItem = document.createElement("li");
        listItem.className = "cpu-item";

        const image = document.createElement("img");
        image.src = cpu.image_url;

        const content = document.createElement("div");

        const title = document.createElement("h3");
        title.textContent = cpu.nome;

        content.appendChild(title);

        if (cpu.descrição) {
            const description = document.createElement("p");
            description.textContent = cpu.descrição;
            content.appendChild(description);
        }

        if (cpu.preco) {
            const price = document.createElement("p");
            price.textContent = "Preço: " + cpu.preco;
            content.appendChild(price);
        }

        listItem.appendChild(image);
        listItem.appendChild(content);

        cpuList.appendChild(listItem);
    });
});