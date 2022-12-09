
const localhost = "192.168.100.128";
const url = "http://"+localhost+":8080";

function previewImg(event, type){
    var id = "";
    var idPreviewModal2 = ""
    if(type == "perdido"){
        id = "imagemUpadaPerdido";
        idPreviewModal2 = "imgPreviewAchado";
    }else{
        id = "imgUpadaAchado";
        idPreviewModal2 = "imgPreviewAchado";
    }
    console.log(id);
	var fileReader = new FileReader();
	var imgPreview = document.getElementById(id);
	fileReader.onload = function(){
		if(fileReader.readyState == 2){
            imgPreview.src = fileReader.result;
		}
	}
	fileReader.readAsDataURL(event.target.files[0]);

    previewModal2(event,idPreviewModal2);
}


function previewModal2(event, id){
    var fileReader = new FileReader();
	var imgPreview = document.getElementById(id);
	fileReader.onload = function(){
		if(fileReader.readyState == 2){
            imgPreview.src = fileReader.result;
		}
	}
	fileReader.readAsDataURL(event.target.files[0]);
}


 

$("#btnOpenCadStart").click(function () {
    $("#modalCadStart").css("display", "block");
})

$("#closeCadStart").click(function () {
    $("#modalCadStart").css("display", "none");
})

$("#buttonLostCad").click(function () {
    $("#modalCadStart").css("display", "none");
    $("#modalCadLost").css("display", "block");
})
$("#returnCadStart").click(function () {
    $("#modalCadStart").css("display", "block");
    $("#modalCadLost").css("display", "none");
})

$("#buttonFindCad").click(function () {
    $("#modalCadStart").css("display", "none");
    $("#modalCadFind").css("display", "block");
})
$("#returnCadFind").click(function () {
    $("#modalCadStart").css("display", "block");
    $("#modalCadFind").css("display", "none");
})


$('#lostObjectSubmit').click(function(e){
    e.preventDefault();

    if($('#lostName').val() == "" || $('#lostEmail').val() == "" ||  $('#lostTitle').val() == "" ||$('#lostTextarea').val() == ""){
        alert("Por favor, preencha todos os campos obrigatórios. Campos não obrigatórios (Imagem e possível local onde perdeu)");
        return false;
    }
    $("#modalViewLost").css("display", "block");
    
});






$('#findObjectSubmit').click(function(e){
    e.preventDefault();
    console.log($("#selfOjb").is(":checked"));


    if($("#selfOjb").is(":checked")){
        if($("#findName").val() == "" || $("#findName").val() == "findMail"){
            alert("Por favor, em caso de ficar com objeto preencha seu nome e email para contato");
            return false;
        }
    }

    if($("#findTitle").val() == "" || $("#findImgObject")[0].files.length == 0){
        alert("Por favor, preencha todos os campos obrigatórios e adicione a imagem do objeto");
        return false;
    }

    $("#modalViewFind").css("display", "block");
   
});


$("#returnViewFind").click(function () {
    $("#modalViewFind").css("display", "none");
})

$("#returnViewLost").click(function () {
    $("#modalViewLost").css("display", "none");
})


function changeCategLost() {
    var lostCateg = $("#lostCateg").val();
}
$("select").change(changeCategLost);
changeCategLost();

function getRadioVal() {
    if ($("#coordObj").is(":checked")) {
        $("#textCheckbox").html($("#coordObjText").html());
        $("#findMailLabel").attr("style", "display:none;");
        $("#findNameLabel").attr("style", "display:none;");
        $(".findName").attr("style", "display:none;");
        $(".findMail").attr("style", "display:none;");
        $("#yourMailLabel").attr("style", "display:none;");
        $("#yourNameLabel").attr("style", "display:none;");
        return
    }
    $("#textCheckbox").html($("#selfObjText").html());
    $("#findMailLabel").attr("style", "display:flex;");
    $("#findNameLabel").attr("style", "display:flex;");
    $(".findName").attr("style", "display:flex;");
    $(".findMail").attr("style", "display:flex;");
    $("#yourMailLabel").attr("style", "display:flex;");
    $("#yourNameLabel").attr("style", "display:flex;");
}

function changeVals() {
    var lostPlace = $("#lostPlaceGeral").val();
    if (lostPlace == 'lostGroundFloor') {
        $(".especificGroundFloorL").attr("style", "display:block;");
        $(".especificFirstFloorL").attr("style", "display:none");
        $(".especificSecondFloorL").attr("style", "display:none");
        $(".especificExternalAreaL").attr("style", "display:none");
        $(".especificGroundFloorL").attr("id", "lostPlaceEspecific");
        $(".especificFirstFloorL").attr("id", "");
        $(".especificSecondFloorL").attr("id", "");
        $(".especificExternalAreaL").attr("id", "");
    }
    else if (lostPlace == 'lostFirstFloor') {
        $(".especificGroundFloorL").attr("style", "display:none");
        $(".especificFirstFloorL").attr("style", "display:block;");
        $(".especificSecondFloorL").attr("style", "display:none");
        $(".especificExternalAreaL").attr("style", "display:none");
        $(".especificGroundFloorL").attr("id", "");
        $(".especificFirstFloorL").attr("id", "lostPlaceEspecific");
        $(".especificSecondFloorL").attr("id", "");
        $(".especificExternalAreaL").attr("id", "");
    }
    else if (lostPlace == 'lostSecondFloor') {
        $(".especificGroundFloorL").attr("style", "display:none");
        $(".especificFirstFloorL").attr("style", "display:none");
        $(".especificSecondFloorL").attr("style", "display:block;");
        $(".especificExternalAreaL").attr("style", "display:none");
        $(".especificGroundFloorL").attr("id", "");
        $(".especificFirstFloorL").attr("id", "");
        $(".especificSecondFloorL").attr("id", "lostPlaceEspecific");
        $(".especificExternalAreaL").attr("id", "");
    }
    else if (lostPlace == 'lostExtArea') {
        $(".especificGroundFloorL").attr("style", "display:none");
        $(".especificFirstFloorL").attr("style", "display:none");
        $(".especificSecondFloorL").attr("style", "display:none");
        $(".especificExternalAreaL").attr("style", "display:block;");
        $(".especificGroundFloorL").attr("id", "");
        $(".especificFirstFloorL").attr("id", "");
        $(".especificSecondFloorL").attr("id", "");
        $(".especificExternalAreaL").attr("id", "lostPlaceEspecific");
    }
}
$("select").change(changeVals);
changeVals();

function changeCategFind() {
    var findCateg = $("#findCateg").val();
}
$("select").change(changeCategFind);
changeCategFind();

function changeValsFind() {
    var findPlace = $("#findPlaceGeral").val();
    if (findPlace == 'findGroundFloor') {
        $(".especificGroundFloor").attr("style", "display:block;");
        $(".especificFirstFloor").attr("style", "display:none");
        $(".especificSecondFloor").attr("style", "display:none");
        $(".especificExternalArea").attr("style", "display:none");
        $(".especificGroundFloor").attr("id", "findPlaceEspecific");
        $(".especificFirstFloor").attr("id", "");
        $(".especificSecondFloor").attr("id", "");
        $(".especificExternalArea").attr("id", "");
    }
    else if (findPlace == 'findFirstFloor') {
        $(".especificGroundFloor").attr("style", "display:none");
        $(".especificFirstFloor").attr("style", "display:block;");
        $(".especificSecondFloor").attr("style", "display:none");
        $(".especificExternalArea").attr("style", "display:none");
        $(".especificGroundFloor").attr("id", "");
        $(".especificFirstFloor").attr("id", "findPlaceEspecific");
        $(".especificSecondFloor").attr("id", "");
        $(".especificExternalArea").attr("id", "");
    }
    else if (findPlace == 'findSecondFloor') {
        $(".especificGroundFloor").attr("style", "display:none");
        $(".especificFirstFloor").attr("style", "display:none");
        $(".especificSecondFloor").attr("style", "display:block;");
        $(".especificExternalArea").attr("style", "display:none");
        $(".especificGroundFloor").attr("id", "");
        $(".especificFirstFloor").attr("id", "");
        $(".especificSecondFloor").attr("id", "findPlaceEspecific");
        $(".especificExternalArea").attr("id", "");
    }
    else if (findPlace == 'findExtArea') {
        $(".especificGroundFloor").attr("style", "display:none");
        $(".especificFirstFloor").attr("style", "display:none");
        $(".especificSecondFloor").attr("style", "display:none");
        $(".especificExternalArea").attr("style", "display:block;");
        $(".especificGroundFloor").attr("id", "");
        $(".especificFirstFloor").attr("id", "");
        $(".especificSecondFloor").attr("id", "");
        $(".especificExternalArea").attr("id", "findPlaceEspecific");
    }
}
$("select").change(changeValsFind);
changeValsFind();


/******************************************Consumo de serviço ******************************/

 function registerObject(type) {
    var imagemObject;
    var name, email, title, place,category,desc;

    if(type == "perdido"){
        name = $('#lostName').val();
        email = $('#lostEmail').val();
        title = $('#lostTitle').val();
        place = $('#lostPlaceGeral :selected').text();
        var lostPlace = $("#lostPlaceGeral").val();
        switch (lostPlace) {
            case 'lostGroundFloor':
                place = place + ": " + $('.especificGroundFloorL :selected').text(); 
                break;
            case 'lostFirstFloor':
                place = place + ": " + $('.especificFirstFloorL :selected').text(); 
                break;                
            case 'lostSecondFloor':
                place = place + ": " + $('.especificSecondFloorL :selected').text(); 
                break;
            case 'lostExtArea':
                place = place + ": " + $('.especificExternalAreaL :selected').text(); 
                break;
        }
        console.log(place);
        category = $('#lostCateg :selected').text(); 
        desc = $('#lostTextarea').val();
        imagemObject = $('#lostImgObject');
    }else{
        name = $('#findName').val();
        email = $('#findMail').val();
        title = $('#findTitle').val();
        place = $('#findPlaceGeral :selected').text();
        var findPlace = $("#findPlaceGeral").val();
        switch (findPlace) {
            case 'findGroundFloor':
                place = place + ": " + $('.especificGroundFloor :selected').text(); 
                break;
            case 'findFirstFloor':
                place = place + ": " + $('.especificFirstFloor :selected').text(); 
                break;                
            case 'findSecondFloor':
                place = place + ": " + $('.especificSecondFloor :selected').text(); 
                break;
            case 'findExtArea':
                place = place + ": " + $('.especificExternalArea :selected').text(); 
                break;
        }
        console.log(place);
        category = $('#findCateg :selected').text(); 
        desc = $('#findTextarea').val();
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
    console.log(imagemObject);
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
               if(type == 'perdido'){
                $("#modalSucessFind").css("display","block");
                $("#modalViewFind").css("display","none");
                $("#modalCadFind").css("display","none");
                $("main").css("filter","blur(5px)");
                return 
            }
            $("#modalSucessLost").css("display","block");
                $("#modalViewLost").css("display","none");
                $("#modalCadLost").css("display","none");
                $("main").css("filter","blur(5px)");               
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
                if(type == 'perdido'){
                    $("#modalSucessFind").css("display","block");
                    $("#modalViewFind").css("display","none");
                    $("#modalCadFind").css("display","none");
                    $("main").css("filter","blur(5px)");
                    return 
                }
                $("#modalSucessLost").css("display","block");
                    $("#modalViewLost").css("display","none");
                    $("#modalCadLost").css("display","none");
                    $("main").css("filter","blur(5px)"); 
               
            })
            .fail(function(jqXHR, textStatus, msg){
                alert(msg);
            });
    
        }else{
            alert("O tipo de arquivo não é aceito, por favor insira uma imagem png ou jpg/jpeg");
        }
    }
    

}
