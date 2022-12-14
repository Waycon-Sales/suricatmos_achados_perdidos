import dbOpen from "./configDB.js";


const objectController = {

        async insertObject(object){
            return dbOpen.openDb().then(db=>{
                db.run('INSERT INTO objetos(titulo, local, categoria, desc, codObjeto, status, tipo, imgLink, nome, email) VALUES (?,?,?,?,?,?,?,?,?,?)', [object.titulo, object.local, object.categoria, object.desc,object.codObjeto, object.status, object.tipo, object.imgLink, object.nome, object.email]);
                return db.get('SELECT id FROM objetos WHERE codObjeto = ? ORDER BY id DESC LIMIT 1', [object.codObjeto]).then(res=>res);
            });
        },
        async updateCodeObject(object){
            return dbOpen.openDb().then(db=>{
                db.run('UPDATE objetos SET codObjeto = ? WHERE id = ?', [object.codObjeto, object.id]);
                return db.get('SELECT codObjeto FROM objetos WHERE id = ? ORDER BY id DESC LIMIT 1', [object.id]).then(res=>res);
            });
        },

        async updateImageObject(pathImageOld, id){
            
            return dbOpen.openDb().then(db=>{
                db.run('UPDATE objetos SET imgLink = ? WHERE id = ?', [pathImageOld, id]);
                return db.get('SELECT imgLink FROM objetos WHERE id = ? ORDER BY id DESC LIMIT 1', [id]).then(res=>res);
            });
        },

        async updateObject(object){
            
            return dbOpen.openDb().then(db=>{
                
                db.run('UPDATE objetos SET titulo = ?, local = ?, categoria = ?, tipo = ?, status = ?, desc = ?, nome = ?, email = ? WHERE id = ?', [object.titulo, object.local, object.categoria, object.tipo, object.status,object.desc,object.nome, object.email, object.id]);
                return db.get('SELECT codObjeto FROM objetos WHERE id = ? ORDER BY id DESC LIMIT 1', [object.id]).then(res=>res);
            });
        },

        async selectAllObjectsForType(object){
            return dbOpen.openDb().then(db=>{
                return db.all('SELECT * FROM objetos WHERE TIPO = ?',[object.tipo]).then(res=>res);
            });
        },

        async selectAllObjects(){
            return dbOpen.openDb().then(db=>{
                return db.all('SELECT * FROM objetos').then(res=>res);
            });
        },

        async selectOneObject(filter){
            filter = "%"+filter+"%";
            console.log(filter);
            return dbOpen.openDb().then(db=>{
                return db.all('SELECT * FROM objetos WHERE titulo LIKE ? OR tipo LIKE ? OR codObjeto LIKE ?', [filter,filter,filter]).then(res=>res);
            });
        },

        async selectIdObject(id){
            return dbOpen.openDb().then(db=>{
                return db.get('SELECT id FROM objetos WHERE id = ?', [id]).then(res=>res);
            });
        },

        async deleteObject(id){
            return dbOpen.openDb().then(db=>{
                return db.get('DELETE FROM objetos WHERE id = ?', [id]).then(res=>res);
            });
        }



}

export default objectController;