

const botoes = document.querySelectorAll(".adicionar-carrinho");
botoes.forEach(function(botao){
    botao.addEventListener("click", function(){
        const card = this.closest(".card");

        if(!card){
            console.log("Card não encontrado");
            return;
        }

    const id = Number(card.dataset.id);
const produto = produtos.find(function(item){
    return item.id === id;
});


if(produto.combo){

    abrirModalCombo(produto);

}else{

    adicionarAoCarrinho(produto);

}

const produtoCompleto = produtos.find(function(item){
    return item.id === produto.id;
});

if(produtoCompleto && produtoCompleto.combo){
    abrirModalCombo(produtoCompleto);

}else{

    adicionarAoCarrinho(produto);

}

        adicionarAoCarrinho(produto);

    });

});


atualizarCarrinho();
atualizarContador();

if(botaoEnviar){
    botaoEnviar.addEventListener("click", finalizarPedido);
}

const radiosPedido = document.querySelectorAll('input[name="tipoPedido"]');
const dadosEntrega = document.getElementById("dadosEntrega");

radiosPedido.forEach(function(radio){
    radio.addEventListener("change", function(){
        if(this.value === "Retirada"){
            dadosEntrega.style.display = "none";

        }else{

            dadosEntrega.style.display = "block";

        }

    });

});