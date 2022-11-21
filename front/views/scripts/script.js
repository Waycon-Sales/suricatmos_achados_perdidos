var modalCadStart =  document.getElementById("modalCadStart");
var btnOpenCadStart = document.getElementById("btnOpenCadStart");
var closeCadStart = document.getElementById("closeCadStart");

btnOpenCadStart.onclick = function(){
    modalCadStart.style.display = "block";
}

closeCadStart.onclick = function(){
    modalCadStart.style.display = "none";
}
