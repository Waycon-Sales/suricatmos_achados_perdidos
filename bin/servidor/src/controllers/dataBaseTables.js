import dbOpen from "./configDB.js";


const dbTables = {
async createTables(){

    
    dbOpen.openDb().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS objetos (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT NOT NULL, local TEXT NOT NULL, categoria TEXT NOT NULL, desc TEXT NULL, codObjeto TEXT NOT NULL, status TEXT NOT NULL, sinalizacao TEXT NULL, tipo TEXT NOT NULL, imgLink TEXT NULL)');
        db.exec('CREATE TABLE IF NOT EXISTS adms (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, senha TEXT NOT NULL, email TEXT NOT NULL, codRec TEXT NULL)');
        db.exec('CREATE TABLE IF NOT EXISTS banners (id INTEGER PRIMARY KEY AUTOINCREMENT, imgBanner TEXT NOT NULL, link TEXT NOT NULL)');
        db.exec('CREATE TABLE IF NOT EXISTS solicitacoes (id INTEGER PRIMARY KEY AUTOINCREMENT, codObjeto, nomeSolicitante TEXT NOT NULL, contato TEXT NOT NULL)');
    });
},

async dropTables(){
    dbOpen.openDb().then(db=>{
        db.exec('DROP TABLE IF EXISTS objetos');
        db.exec('DROP TABLE IF EXISTS adms');
        db.exec('DROP TABLE IF EXISTS banners');
        db.exec('DROP TABLE IF EXISTS solicitacoes');
    });
}
}

export default dbTables;