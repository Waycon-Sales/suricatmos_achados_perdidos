import ObjectModel from '../model/ObjectModel.js';
import AdmModel from '../model/AdmModel.js';
import objectController from './objectController.js';
import admController from './admController.js';
import categoriesController from './categoriesController.js';
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const fs = require('fs');
const nodemailer = require('nodemailer');
require('dotenv/config');

const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const mailDetails = {
    from: process.env.EMAIL,
    to: process.env.EMAIL_FOR,
    subject: 'Teste Email',
    text: 'teste para envio de senha'
};



const controller = {
   
    async bemVinde(request , response){
        return response.json({message : 'API - SEJA BEM VINDO AO SISTEMA DE ACHADOS E PERDIDOS'})
    },

    async inserirObjeto(req,res){
        if(req.body != {}){
            const object = new ObjectModel(JSON.parse(req.body.text));
            if(object.titulo != null && object.titulo != "" &&
                object.local != null && object.local!= "" &&
                object.categoria != null && object.categoria != "" &&
                object.tipo != null && object.tipo != ""  ){

                    try{
                        if(req.file){
                            object.imgLink = req.file.path.replace(/\\/g, '/');
                        }else{
                            object.imgLink = "";
                        }
                        if(object.desc == null || object.desc == undefined){
                            object.desc = "";
                        }
                        object.codObjeto = object.categoria+"#";
                        object.status = "ativo";
                        let idObject = await objectController.insertObject(object);
                        object.id = idObject.id
                        object.codObjeto = object.codObjeto +  object.id;
                        console.log(object.codObjeto);
                        let codObjectRegistrado = await objectController.updateCodeObject(object);
                        console.log(codObjectRegistrado);                    
                        res.json({
                            "code": 200,
                            "message": "Sucesso, objeto Cadastrado!",
                            "codObjeto": codObjectRegistrado.codObjeto,
                            "id":object.id
                        });
                    }catch(e){
                        console.log(e.message);
                        if(req.file){
                            fs.unlink("./"+req.file.path.replace(/\\/g, '/'), function(err){
                                if(err) return console.log(err);
                                console.log('file deleted successfully');
                            }); 
                        } 
                        res.json({
                            "code": 500,
                            "message": "Erro ao cadastrar objeto - tente novamente!"
                        });        
                    }      
    
            }else{
                if(req.file){
                    fs.unlink("./"+req.file.path.replace(/\\/g, '/'), function(err){
                        if(err) return console.log(err);
                        console.log('file deleted successfully');
                    }); 
                } 
                res.json({
                    "code": 400,
                    "message": "Erro - Atributo(s) esta(m) vazio"
                });
            }
          
        }else{
            if(req.file){
                fs.unlink("./"+req.file.path.replace(/\\/g, '/'), function(err){
                    if(err) return console.log(err);
                    console.log('file deleted successfully');
                }); 
            } 
            res.json({
              "code": 400,
              "message": "Erro - body vazio"
            });
        }
    },

    async atualizarObjeto(req,res){
      
        if(req.body != {}){
            const object = new ObjectModel(req.body);
            if(object.id != null && object.id != "" &&
                object.titulo != null && object.titulo != "" &&
                object.local != null && object.local!= "" &&
                object.categoria != null && object.categoria != "" &&
                object.tipo != null && object.tipo != "" &&
                object.status != null && object.status != ""){
            
                    try{
                        if(object.desc == null || object.desc == undefined){
                            object.desc = "";
                        }
    
                        let codObjectUpdate = await objectController.updateObject(object);
                              
                        res.json({
                            "code": 200,
                            "message": "Objeto "+object.titulo+" do código"+codObjectUpdate.codObjeto+", editado com sucesso!",
                        
                        });
                    }catch(e){
                        console.log(e);
                        res.json({
                            "code": 500,
                            "message": "Erro ao atualizar objeto - tente novamente!"
                        }); 
                    
                    }      
    
            }else{
                res.json({
                    "code": 400,
                    "message": "Erro - Atributo(s) esta(m) vazio"
                });
            }
          
        }else{
          res.json({
              "code": 400,
              "message": "Erro - body vazio"
          });
        }
    },

    async atualizarImagemObjeto(req,res){
        if(req.body != {}){
            const object = new ObjectModel(JSON.parse(req.body.text));
            if(object.id != null && object.id != "" &&
            req.file && object.imgLink != null && object.imgLink != ""){
                    try{
                        var pathImageOld = req.file.path.replace(/\\/g, '/');
                        fs.access("./"+object.imgLink, fs.constants.F_OK, (err) => {
                            err? 
                            console.log("Arquivo não existe") : fs.unlink("./"+object.imgLink, function(err){
                                if(err) return console.log(err);
                                console.log('file deleted successfully');
                            }) ;
                          });
                         
                        let objectUpdate = await objectController.updateImageObject(pathImageOld, object.id);
                                            
                        res.json({
                            "code": 200,
                            "message": "Sucesso, objeto Cadastrado!",
                            "imgLink": objectUpdate.imgLink
                        });
                    }catch(e){
                        console.log(e.message);
                        if(req.file){
                            fs.unlink("./"+req.file.path.replace(/\\/g, '/'), function(err){
                                if(err) return console.log(err);
                                console.log('file deleted successfully');
                            }); 
                        }
                        res.json({
                            "code": 500,
                            "message": "Erro ao cadastrar objeto - tente novamente!"
                        });        
                    }      
    
            }else{
                if(req.file){
                    fs.unlink("./"+req.file.path.replace(/\\/g, '/'), function(err){
                        if(err) return console.log(err);
                        console.log('file deleted successfully');
                    }); 
                }
                res.json({
                    "code": 400,
                    "message": "Erro - Atributo(s) esta(m) vazio"
                });
            }
          
        }else{
            if(req.file){
                fs.unlink("./"+req.file.path.replace(/\\/g, '/'), function(err){
                    if(err) return console.log(err);
                    console.log('file deleted successfully');
                }); 
            } 
            res.json({
              "code": 400,
              "message": "Erro - body vazio"
            });
        }
    },

    async selectAllObjectsType(req,res){
        const object = new ObjectModel(req.body);
        if(req.body != {}){
            if(object.tipo != null && object.tipo != ""){
                try{
                    let allObjectsType = await  objectController.selectAllObjectsForType(object);
                    if(allObjectsType != ""){
                        res.json({
                            "code": 200,
                            "message": "sucess",
                            allObjectsType
                        });             
                    }else{
                        res.json({
                            "code": 200,
                            "message": "lista vazia",
                            allObjectsType
                        });
                    }
                }catch(e){
                    res.json({
                        "code": 500,
                        "message": "Erro inesperado do servidor",
                       
                    });
                }
                  
            }else{
                res.json({
                    "code": 400,
                    "message": "erro - campo de tipo vazio",
                   
                });
            }
        }else{
            res.json({
                "code": 400,
                "message": "erro body vazio",
               
            });
        }
    },

    async selectAllObjects(req,res){
                try{
                    let allObjects = await  objectController.selectAllObjects();
                    if(allObjects != ""){
                        res.json({
                            "code": 200,
                            "message": "sucess",
                            allObjects
                        });             
                    }else{
                        res.json({
                            "code": 200,
                            "message": "lista vazia",
                            allObjects
                        });
                    }
                }catch(e){
                    console.log(e.message)
                    res.json({
                        "code": 500,
                        "message": "Erro inesperado do servidor",
                       
                    });
                }
    },

    async selectOneObject(req,res){
        console.log(req.body);
        if(req.body != {}){
            var body = req.body;
            console.log(body.filter);
            if(body.filter != "" && body.filter != null){
                try{
                    let object = await  objectController.selectOneObject(body.filter);
                    if(object != "" && object != null){
                        res.json({
                            "code": 200,
                            "message": "sucess",
                            object
                        });             
                    }else{
                        res.json({
                            "code": 400,
                            "message": "Objeto não encontrado",
                            object
                        });
                    }
                }catch(e){
                    console.log(e.message)
                    res.json({
                        "code": 500,
                        "message": "Erro inesperado do servidor",
                    
                    });
                }
            }else{
                res.json({
                    "code": 400,
                    "message": "Erro filtro vazio",
                
                });    
            }
        }else{
            res.json({
                "code": 400,
                "message": "Erro body vazio",
            
            });
        }
    },


    async selectAllCategories(req,res){
        try{
            let allCategories = await  categoriesController.selectAllCategories();
            if(allCategories != ""){
                res.json({
                    "code": 200,
                    "message": "sucess",
                    allCategories
                });             
            }else{
                res.json({
                    "code": 500,
                    "message": "lista vazia error servidor",
                    allCategories
                });
            }
        }catch(e){
            console.log(e.message)
            res.json({
                "code": 500,
                "message": "Erro inesperado do servidor",
               
            });
        }
    },

    

    async deleteObject(req,res){
        if(req.body != {}){
            const idsReq = req.body;
            if(idsReq.length != 0){
                try{
                    var resultsDelete = [];
                
                    for (let i = 0; i < idsReq.length; i++) {
                    
                        var exist = await objectController.selectIdObject(idsReq[i].id);
                        console.log(exist);
                        if(exist != undefined){
                            await objectController.deleteObject(idsReq[i].id);
                            resultsDelete[i] = {
                                "id": idsReq[i].id,
                                "message": "Deletado com sucesso",
                                sucess: true
                            };
                        }else{
                            resultsDelete[i] ={
                                "id": idsReq[i].id,
                                "message": "Id inexistente no servidor - erro ao deletar",
                                sucess: false
                            };
                        }
                    }

                    const result1 = resultsDelete.every(bool => bool.sucess == true);
                    const result2 = resultsDelete.every(bool => bool.sucess == false);

                    if(result1 == true && result2 == false){
                        //todos foram deletados
                        res.json({
                            "code": 200,
                            "message": "sucess",
                            "result":resultsDelete
                        });  
                    }else if(result1 == false && result2 == true){
                        //nenhum foi deletado
                        res.json({
                            "code": 400,
                            "message": "error - nenhum objeto deletado",
                            "result": resultsDelete
                        }); 
                    }else if(result1 == false && result2 == false){
                        //Alguns foram deletados outros não
                        res.json({
                            "code": 200,
                            "message": "Alguns ids de objetos repassados não existem no banco de dados",
                            "result": resultsDelete
                        }); 
                    }

                }catch(e){
                    console.log(e.message)
                    res.json({
                        "code": 500,
                        "message": "Erro inesperado do servidor",
                        "result": []
                    });
                }
            }else{
                res.json({
                    "code": 400,
                    "message": "Error - array vazio",
                    "result": []
                });
            }
        }else{
            res.json({
                "code": 400,
                "message": "Error - body vazio",
                "result": []
            });
        }
    },



/*----------------------------ADMS------------------------------------------------*/
    async loginAdm(req,res){
        const adm = new AdmModel(req.body);
        if(req.body != {}){
            if(adm.email != null && adm.email != "" && adm.senha != null && adm.senha != ""){
                try{
                    let admDB = await admController.selectAdm();
                    console.log(admDB);
                    if(admDB != ""){
                        adm.senha = Buffer.from(adm.senha, 'base64').toString('ascii');
                        admDB[0].senha = Buffer.from(admDB[0].senha, 'base64').toString('ascii');
                        if(adm.email == admDB[0].email && adm.senha == admDB[0].senha){
                            res.json({
                                "code": 200,
                                "message": "login efetuado com sucesso",
                            });
                        }else{
                            res.json({
                                "code": 400,
                                "message": "Error: Usuário ou senha incorretos",
                            });
                        }             
                    }else{
                        res.json({
                            "code": 500,
                            "message": "Error adm não encontrado no banco de dados do servidor"
                        });
                    }
                }catch(e){
                    console.log(e);
                    res.json({
                        "code": 500,
                        "message": "Erro inesperado do servidor",
                       
                    });
                }
                  
            }else{
                res.json({
                    "code": 400,
                    "message": "erro - campos vazios",
                   
                });
            }
        }else{
            res.json({
                "code": 400,
                "message": "erro body vazio",
               
            });
        }
    },

    async resetPw(req,res){
        const adm = new AdmModel(req.body);
        if(req.body != {}){
            if(adm.email != null && adm.email != ""){
                try{
                    let admDB = await admController.selectEmail();
                    console.log(admDB);
                    if(admDB != ""){
                        if(adm.email == admDB[0].email){
                            mailTransporter.sendMail(mailDetails, function(error, info){
                                if (error) {
                                    console.log(error);
                                    res.json({
                                        "code": 405,
                                        "message": "Erro ao Enviar código por email",
                                    });
                                } else {
                                    res.json({
                                        "code": 200,
                                        "message": "Código de recuperação enviado com sucesso",
                                    });
                                  console.log('Email enviado: ' + info.response);
                                }
                              });
                        }else{
                            res.json({
                                "code": 404,
                                "message": "Email não corresponde ao cadastrado",
                            });
                        }             
                    }else{
                        res.json({
                            "code": 500,
                            "message": "Error adm não encontrado no banco de dados do servidor"
                        });
                    }
                }catch(e){
                    console.log(e);
                    res.json({
                        "code": 500,
                        "message": "Erro inesperado do servidor",
                       
                    });
                }
                  
            }else{
                res.json({
                    "code": 400,
                    "message": "erro - campos vazios",
                   
                });
            }
        }else{
            res.json({
                "code": 400,
                "message": "erro body vazio",
               
            });
        }
    },


}

export default controller;