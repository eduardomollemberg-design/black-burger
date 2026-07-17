// PEGA A ÁREA ONDE OS CARDS VÃO APARECER


const listaProdutos = document.getElementById("produtos");
const campoPesquisa = document.getElementById("pesquisa");
const botoesFiltro =document.querySelectorAll(".filtro");

// CRIA TODOS OS CARDS


function renderizarProdutos(lista){
    listaProdutos.innerHTML = "";
    lista.forEach(function(produto){
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `

            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>

            <p class="descricao">
                ${produto.descricao}
            </p>

            <p class="preco">
                R$ ${produto.preco.toFixed(2)}
            </p>

            <button 
            class="btn-card adicionar-carrinho"
            data-id="${produto.id}"
            >
                Adicionar ao Carrinho
            </button>

        `;

        listaProdutos.appendChild(card);

    });

}


// MOSTRA TODOS OS PRODUTOS


renderizarProdutos(produtos);
ativarBotoesCarrinho();

function ativarBotoesCarrinho(){
    const botoes = document.querySelectorAll(".adicionar-carrinho");
    botoes.forEach(function(botao){
        botao.addEventListener("click", function(){
            const id = Number(botao.dataset.id);
            const produto = produtos.find(function(item){
                return item.id === id;
            });

            adicionarAoCarrinho(produto);
           
        });

    });

}

campoPesquisa.addEventListener("input", function(){

    const texto = campoPesquisa.value.toLowerCase();
    const produtosFiltrados = produtos.filter(function(produto){
        return produto.nome.toLowerCase().includes(texto);

    });

    renderizarProdutos(produtosFiltrados);
    ativarBotoesCarrinho();

});

botoesFiltro.forEach(function(botao){
    botao.addEventListener("click", function(){
        botoesFiltro.forEach(function(btn){
            btn.classList.remove("ativo");
        });

        botao.classList.add("ativo");
        const categoria = botao.dataset.categoria;
        if(categoria === "todos"){
            renderizarProdutos(produtos);
            ativarBotoesCarrinho();
            return;
        
        }

        const produtosFiltrados = produtos.filter(function(produto){
            return produto.categoria === categoria;

        });

        renderizarProdutos(produtosFiltrados);
        ativarBotoesCarrinho();

    });

});