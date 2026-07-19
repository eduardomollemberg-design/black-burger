const botaoFinalizar = document.getElementById("finalizarPedido");
const modalPedido = document.getElementById("modalPedido");
const fecharModal = document.getElementById("fecharModal");
const botaoEnviar = document.getElementById("enviarPedido");
const botoes = document.querySelectorAll(".adicionar-carrinho");
botoes.forEach(function(botao){
    botao.addEventListener("click", function(){
        const card = botao.closest(".card");
        adicionarAoCarrinho({
            id: Number(card.dataset.id),
            nome: card.dataset.nome,
            preco: Number(card.dataset.preco)

        });

    });

});

if(botaoFinalizar){
botaoFinalizar.addEventListener("click", function(){
    overlay.classList.remove("ativo");
    modalPedido.classList.add("ativo");

});
}

if(fecharModal){
    fecharModal.addEventListener("click", function(){
        modalPedido.classList.remove("ativo");
    });
}

if(modalPedido){
modalPedido.addEventListener("click", function(event){
    if(event.target === modalPedido){
        modalPedido.classList.remove("ativo");
    }
});
}
function finalizarPedido(){

    if(carrinho.length === 0){
        alert("Seu carrinho está vazio!");
        return;
        
    }

    let mensagem = "🍔 *BLACK BURGER*%0A%0A";
    mensagem += "━━━━━━━━━━━━━━%0A%0A";
    mensagem += "📋 *PEDIDO*%0A%0A";
    carrinho.forEach(function(produto){
        mensagem += `• ${produto.quantidade}x ${produto.nome}%0A`;
        mensagem += `R$ ${(produto.preco * produto.quantidade).toFixed(2)}%0A%0A`;
    });

    mensagem += "━━━━━━━━━━━━━━%0A%0A";
    mensagem += `💰 *${total.textContent}*%0A%0A`;
    mensagem += "━━━━━━━━━━━━━━%0A%0A";
    mensagem += "👤 Nome:%0A";
    mensagem += "📍 Endereço:%0A";
    mensagem += "💳 Forma de pagamento:%0A";
    mensagem += "📝 Observações:%0A";
    const numero = "5511915701095";
    window.open(
        `https://wa.me/${numero}?text=${mensagem}`,
        "_blank"
    );

}

atualizarCarrinho();
atualizarContador();
