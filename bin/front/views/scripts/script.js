
const localhost = "192.168.100.128";
const url = "http://"+localhost+":8080";

/*var modalCadStart =  document.getElementById("modalCadStart");
var btnOpenCadStart = document.getElementById("btnOpenCadStart");
var closeCadStart = document.getElementById("closeCadStart");

btnOpenCadStart.onclick = function(){
    modalCadStart.style.display = "block";
}

closeCadStart.onclick = function(){
    modalCadStart.style.display = "none";
}
*/


/******************************************Consumo de serviço ******************************/

function registerObject(){
    /*$.ajax({
        url : url+"/insertObject",
        type : 'post',
        data : {
             nome : "Maria Fernanda",
             salario :'3500'
        },
        beforeSend : function(){
             $("#resultado").html("ENVIANDO...");
        }
   })
   .done(function(msg){
        $("#resultado").html(msg);
   })
   .fail(function(jqXHR, textStatus, msg){
        alert(msg);
   });*/

}

 function registerObject(type) {
    var imagemObject;
    var name, email, title, place,category,desc;

    if(type == "perdido"){
        name = $('#lostName').val();
        email = $('#lostEmail').val();
        title = $('#lostTitle').val();
        place = $('#lostPlaceGeral :selected').text() + $('#lostPlaceEspecific :selected').text(); ; 
        category = $('#lostCategory :selected').text(); 
        desc = $('#lostDesc').val();
        imagemObject = $('#lostImgObject');
    }else{
        name = "";
        email = "";
        title = $('#findTitle').val();
        place = $('#findPlaceGeral :selected').text() + $('#findPlaceEspecific :selected').text(); ; 
        category = $('#findCategory :selected').text(); 
        desc = $('#findDesc').val();
        imagemObject = $('#findImgObject');
    }

    var text = {
            "nome":name,
            "email":email,
            "titulo":title,
            "local":place,
            "categoria":category,
            "tipo":type,
            "desc": desc
        }
    
    console.log(text);
    console.log(imagemObject[0].files.length);
    //console.log(imagemObject[0].files[0].type);
    if(imagemObject[0].files.length == 0){
        let formData = new FormData(); 
            formData.append("imagemObject", imagemObject[0].files[0]);
            formData.append("text", JSON.stringify(text));
            console.log(formData);
            $.ajax({
                url : url+"/insertObject",
                type : 'post',
                data : formData,
                processData: false,
                contentType: false
            })
            .done(function(msg){
                console.log(msg);
               alert(msg.message);
            })
            .fail(function(jqXHR, textStatus, msg){
                alert("Ocorreu um erro ao registrar objeto, tente novamente mais tarde!");
            });
    }else{
        if(imagemObject[0].files[0].type == "image/png" || imagemObject[0].files[0].type == "image/jpeg" || imagemObject[0].files[0].type == "image/jpg" ){
            let formData = new FormData(); 
            formData.append("imagemObject", imagemObject[0].files[0]);
            formData.append("text", JSON.stringify(text));
            console.log(formData);
            $.ajax({
                url : url+"/insertObject",
                type : 'post',
                data : formData,
                processData: false,
                contentType: false
            })
            .done(function(msg){
               console.log(msg);
            })
            .fail(function(jqXHR, textStatus, msg){
                alert(msg);
            });
    
        }else{
            alert("O tipo de arquivo não é aceito, por favor insira uma imagem png ou jpg/jpeg");
        }
    }
    

}
