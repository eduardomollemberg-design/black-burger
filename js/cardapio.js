// PEGA A ÁREA ONDE OS CARDS VÃO APARECER


const listaProdutos = document.getElementById("produtos");
const campoPesquisa = document.getElementById("pesquisa");
const botoesFiltro =document.querySelectorAll(".filtro");

// ===== MODAL COMBO =====

const modalCombo = document.getElementById("modalCombo");
const tituloCombo = document.getElementById("tituloCombo");
const btnLanche = document.getElementById("btnLanche");
const btnCombo = document.getElementById("btnCombo");
const fecharModal = document.getElementById("fecharModal");
let produtoSelecionado = null;
const precoLanche = document.getElementById("precoLanche");
const precoCombo = document.getElementById("precoCombo");

// CRIA TODOS OS CARDS


function renderizarProdutos(lista){

    listaProdutos.innerHTML = "";

    const categorias = [
        {
            nome: "🍔 Hambúrgueres",
            tipo: "hamburguer"
        },
        {
            nome: "🍔 Hambúrgueres Prensados ",
            tipo: "prensado"
        },
        {
            nome: "🍟 Porções",
            tipo: "porcao"
        },
        {
            nome: "🍰 Sobremesas",
            tipo: "sobremesa"
        },
        {
            nome: "🥤 Bebidas",
            tipo: "bebida"
        }
    ];

    categorias.forEach(function(categoria){

        const produtosCategoria = lista.filter(function(produto){
            return produto.categoria === categoria.tipo;
        });

        if(produtosCategoria.length === 0){
            return;
        }

        const titulo = document.createElement("h2");
        titulo.className = "titulo-categoria";
        titulo.textContent = categoria.nome;
        listaProdutos.appendChild(titulo);

        const grid = document.createElement("div");
        grid.className = "grid-categoria";

        produtosCategoria.forEach(function(produto){

            const card = document.createElement("div");
            card.className = "card";

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
                    data-id="${produto.id}">
                    Adicionar ao Carrinho
                </button>
            `;

            grid.appendChild(card);

        });

        listaProdutos.appendChild(grid);

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

            if(produto.combo){
                
                abrirModalCombo(produto);
        
            }else{

                  adicionarAoCarrinho(produto);

            }

          
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

function abrirModalCombo(produto){

    produtoSelecionado = produto;

    tituloCombo.textContent = produto.nome;

    precoLanche.textContent = `R$ ${produto.preco.toFixed(2)}`;


    const diferenca = produto.precoCombo - produto.preco;

precoCombo.innerHTML = `
        <strong>R$ ${produto.precoCombo.toFixed(2)}</strong><br>
        <span class="texto-combo">
            Apenas +R$ ${diferenca.toFixed(2)} para transformar em Combo 🚀
        </span>
    `;

    modalCombo.classList.add("ativo");

}

function fecharModalCombo(){

    modalCombo.classList.remove("ativo");

    produtoSelecionado = null;

}

fecharModal.addEventListener("click", fecharModalCombo);

modalCombo.addEventListener("click", function(event){

    if(event.target === modalCombo){

        fecharModalCombo();

    }

});

btnLanche.addEventListener("click", function(){

    adicionarAoCarrinho(produtoSelecionado);

    fecharModalCombo();

});

btnCombo.addEventListener("click", function(){

    adicionarAoCarrinho({

        id: produtoSelecionado.id + 1000,
        nome: produtoSelecionado.nome + " Combo",
        preco: produtoSelecionado.precoCombo

    });

    fecharModalCombo();

});