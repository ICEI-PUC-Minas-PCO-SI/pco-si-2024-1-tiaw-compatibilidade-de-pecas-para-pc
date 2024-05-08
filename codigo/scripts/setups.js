        // Referência ao botão e à lista de produtos
        const carregarProdutosBtn = document.getElementById('setup-low');
        const produtoLista = document.getElementById('produto-lista'); // Referência à lista

        // Evento de clique para carregar produtos
        carregarProdutosBtn.addEventListener('click', () => {
            // Usar Fetch para carregar o JSON externo
            fetch('cpus.json') // Nome do arquivo JSON
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao carregar o JSON');
                    }
                    return response.json(); // Converte a resposta para objeto JavaScript
                })
                .then(data => {
                    // Adicionar produtos à lista
                    data.forEach(produto => {
                        const produtoItem = document.createElement('li'); // Criar um item
                        produtoItem.className = 'produto-item'; // Estilizar

                        // Conteúdo do item
                        produtoItem.innerHTML = `
                            <img src="${produto.imagem}" alt="${produto.nome}" class="produto-imagem">
                            <div>
                                <h6>${produto.nome}</h6>
                                <p>${produto.descricao}</p>
                            </div>
                            <div class="produto-acoes">
                                <h6 class="text-success">${produto.preco}</h6>
                                <button class="btn btn-primary">Comprar</button>
                            </div>
                        `;

                        // Adicionar o item à lista
                        produtoLista.appendChild(produtoItem);
                    });
                })
                .catch(error => {
                    console.error('Erro:', error); // Tratamento de erros
                });
        });