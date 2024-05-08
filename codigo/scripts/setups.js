const carregarProdutosBtn = document.getElementById('setup-low');

if (carregarProdutosBtn) {
    // Evento de clique para carregar produtos
    carregarProdutosBtn.addEventListener('click', () => {
        // Usar Fetch para carregar o arquivo JSON com produtos
        fetch('codigo/assets/data/cpus.json') // Caminho para o JSON
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar o JSON');
                }
                return response.json(); // Converte para objeto JavaScript
            })
            .then(data => {
                // Processar e adicionar produtos ao HTML
                const produtoLista = document.querySelector('.produto-lista'); // Referência à lista
                if (produtoLista) {
                    data.forEach(produto => {
                        const produtoItem = document.createElement('li'); // Criar item para a lista
                        produtoItem.className = 'produto-item'; // Classe para estilizar

                        // Preencher conteúdo do item
                        produtoItem.innerHTML = `
                            <img src="${produto.imagem_url}" alt="${produto.nome}" class="produto-imagem">
                            <div>
                                <h6>${produto.nome}</h6>
                                <p>${produto.descricao}</p>
                            </div>
                            <div class="produto-acoes">
                                <h6 class="text-success">${produto.preco}</h6>
                            </div>
                        `;

                        // Adicionar o item à lista
                        produtoLista.appendChild(produtoItem);
                    });
                }
            })
            .catch(error => {
                console.error('Erro ao carregar o JSON:', error); // Tratamento de erro
            });
    });
} else {
    console.error("O botão com ID 'setup-low' não foi encontrado");
}