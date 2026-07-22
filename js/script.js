console.log("Script carregou");
const botoes = document.querySelectorAll(".adicionar-carrinho");

botoes.forEach(function(botao){

    botao.addEventListener("click", function(){

        console.log("Script carregou");
        
        const card = this.closest(".card");

        if(!card){
            console.log("Card não encontrado");
            return;
        }

        const id = Number(card.dataset.id);

        const produto = produtos.find(function(item){
            return item.id === id;
        });

        if(!produto){
            return;
        }

        if(produto.combo){

            abrirModalCombo(produto);

        }else{

            adicionarAoCarrinho(produto);

        }

    });

});

atualizarCarrinho();
atualizarContador();

const radiosPedido = document.querySelectorAll('input[name="tipoPedido"]');
const dadosEntrega = document.getElementById("dadosEntrega");

if(radiosPedido.length && dadosEntrega){

    radiosPedido.forEach(function(radio){

        radio.addEventListener("change", function(){

            if(this.value === "Retirada"){

                dadosEntrega.style.display = "none";

            }else{

                dadosEntrega.style.display = "block";

            }

        });

    });

}