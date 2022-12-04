export default class ObjectModel{
    constructor(object){
        this.id = object.id;
        this.nome = object.nome;
        this.email = object.email;
        this.titulo = object.titulo;
        this.local = object.local; 
        this.imgLink = object.imgLink;
        this.categoria = object.categoria; 
        this.desc = object.desc;
        this.codObjeto = object.codObjeto; 
        this.status = object.status; 
        this.tipo = object.tipo;
    } 
}