const toast = document.getElementById("toast");
function mostrarToast(texto){

    if(!toast){
        return;
    }

    toast.textContent = texto;
    toast.classList.add("mostrar");
    setTimeout(function(){
        toast.classList.remove("mostrar");
    },2000);

}