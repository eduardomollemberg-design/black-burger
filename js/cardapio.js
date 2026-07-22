console.log("CARDAPIO OK");
const listaProdutos = document.getElementById("produtos");
const campoPesquisa = document.getElementById("pesquisa");
const botoesFiltro = document.querySelectorAll(".filtro");


function renderizarProdutos(lista){

    listaProdutos.innerHTML = "";


    const categorias = [
        {
            nome:"🍔 Hambúrgueres",
            tipo:"hamburguer"
        },
        {
            nome:"🌭 Prensados",
            tipo:"prensado"
        },
        {
            nome:"🍟 Porções",
            tipo:"porcao"
        },
        {
            nome:"🥤 Bebidas",
            tipo:"bebida"
        },
        {
            nome:"🍰 Sobremesas",
            tipo:"sobremesa"
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



renderizarProdutos(produtos);
console.log("PRODUTOS RENDERIZADOS");

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

