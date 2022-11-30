import dbOpen from "./configDB.js";


const admController = {

        async updatePassword(adm){    
            return dbOpen.openDb().then(db=>{
                db.run('UPDATE adms SET senha = ? WHERE id = 1', [adm.senha]);
            });
        },

        async updateCodeRec(adm){    
            return dbOpen.openDb().then(db=>{
                db.run('UPDATE adms SET codeRec = ? WHERE id = 1', [adm.codeRec]);
                return db.all('SELECT codeRec FROM adms WHERE id = 1').then(res=>res);
            });
        },

        async selectAdm(){
            return dbOpen.openDb().then(db=>{
                return db.all('SELECT email, senha FROM adms WHERE id = 1').then(res=>res);
            });
        },

        async selectEmail(){
            return dbOpen.openDb().then(db=>{
                return db.all('SELECT email FROM adms WHERE id = 1').then(res=>res);
            });
        },

        async selectAdmCodeRec(){
            return dbOpen.openDb().then(db=>{
                return db.all('SELECT codeRec FROM adms WHERE id = 1').then(res=>res);
            });
        },



}

export default admController;