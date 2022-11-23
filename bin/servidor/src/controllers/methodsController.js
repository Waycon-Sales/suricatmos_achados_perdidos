import ObjectModel from '../model/ObjectModel.js';
import objectController from './objectController.js';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require('fs');

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
                        object.status = "postado";
                        let idObject = await objectController.insertObject(object);
                        object.id = idObject.id
                        object.codObjeto = object.codObjeto +  object.id;
                        console.log(object.codObjeto);
                        let codObjectRegistrado = await objectController.updateCodeObject(object);
                        console.log(codObjectRegistrado);                    
                        res.json({
                            "code": 200,
                            "message": "Sucesso, objeto Cadastrado!",
                            "codObjeto": codObjectRegistrado.codObjeto
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

    

}

export default controller;