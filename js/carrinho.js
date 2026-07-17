// CARRINHO


let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];


// SALVAR NO LOCAL STORAGE


function salvarCarrinho(){
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

}

//ADICIONAR PRODUTO


function adicionarAoCarrinho(produto){
    const produtoExiste = carrinho.find(function(item){
        return item.id === produto.id;
    });

    if(produtoExiste){
        produtoExiste.quantidade++;

    }else{

        carrinho.push({

            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: 1

        });
    }

    salvarCarrinho();
    atualizarCarrinho();
    atualizarContador();

    mostrarToast(`✅ ${produto.nome} foi adicionado ao carrinho!`);
    
}

//ELEMENTOS DO CARRINHO

const contadorCarrinho = document.querySelector(".carrinho span");
const listaCarrinho = document.getElementById("lista-carrinho");
const total = document.getElementById("total");
const botaoCarrinho = document.querySelector(".carrinho");
const overlay = document.getElementById("overlay");
const botaoFechar = document.getElementById("fecharCarrinho");

if(botaoCarrinho && overlay){
    botaoCarrinho.addEventListener("click", function(){
        overlay.classList.add("ativo");
    });

}

if(botaoFechar && overlay){
    botaoFechar.addEventListener("click", function(){
        overlay.classList.remove("ativo");
    });

}

if(overlay){
    overlay.addEventListener("click", function(event){
        if(event.target === overlay){
            overlay.classList.remove("ativo");
        }

    });

}


//ATUALIZA CONTADOR

function atualizarContador(){
    if(!contadorCarrinho){
        return;
    }

    const quantidadeTotal = carrinho.reduce(function(total, produto){
        return total + produto.quantidade;
    },0);

    contadorCarrinho.textContent = quantidadeTotal;

}

//ATUALIZAR CARRINHO 


function atualizarCarrinho(){

    if(!listaCarrinho){
        return;
    }

    listaCarrinho.innerHTML = "";

if(carrinho.length === 0){

    listaCarrinho.innerHTML = `
        <div class="carrinho-vazio">
            <h3>🛒</h3>
            <p>Seu carrinho está vazio.</p>
            <small>
                Adicione um produto para começar seu pedido.
            </small>
        </div>
    `;

    total.textContent = "Total: R$ 0,00";
    return;

}

    let valorTotal = 0;
    carrinho.forEach(function(produto){
        const item = document.createElement("div");

        item.innerHTML = `
            <h4>${produto.nome}</h4>

            <div class="controle-quantidade">
                <button class="diminuir">➖</button>
                <span>${produto.quantidade}</span>
                <button class="aumentar">➕</button>
            </div>

            <p class="subtotal">
                R$ ${(produto.preco * produto.quantidade).toFixed(2)}
            </p>

            <button class="remover">
                🗑 Remover
            </button>
        `;

        valorTotal += produto.preco * produto.quantidade;
        listaCarrinho.appendChild(item);

    });

    total.textContent = `Total: R$ ${valorTotal.toFixed(2)}`;

const botoesAumentar = document.querySelectorAll(".aumentar");
botoesAumentar.forEach(function(botao){
    botao.addEventListener("click", function(){
        const nome = botao.parentElement.parentElement.querySelector("h4").textContent;
        const produto = carrinho.find(function(item){
            return item.nome === nome;
        });

        produto.quantidade++;
        salvarCarrinho();
        atualizarContador();
        atualizarCarrinho();

    });

});

const botoesDiminuir = document.querySelectorAll(".diminuir");
botoesDiminuir.forEach(function(botao){
    botao.addEventListener("click", function(){
        const nome = botao.parentElement.parentElement.querySelector("h4").textContent;
        const produto = carrinho.find(function(item){
            return item.nome === nome;
        });

        if(produto.quantidade > 1){
            produto.quantidade--;

        }else{

            const indice = carrinho.indexOf(produto);
            carrinho.splice(indice,1);

        }

        salvarCarrinho();
        atualizarContador();
        atualizarCarrinho();

    });

});

const botoesRemover = document.querySelectorAll(".remover");
botoesRemover.forEach(function(botao){
    botao.addEventListener("click", function(){
        const nome = botao.parentElement.querySelector("h4").textContent;
        const produto = carrinho.find(function(item){
            return item.nome === nome;
        });

        const indice = carrinho.indexOf(produto);
        carrinho.splice(indice,1);
        salvarCarrinho();
        atualizarContador();
        atualizarCarrinho();

    });

});

}

document.addEventListener("DOMContentLoaded", function(){

    atualizarCarrinho();
    atualizarContador();

});