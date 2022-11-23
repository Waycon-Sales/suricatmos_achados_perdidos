import dbOpen from "./configDB.js";


const categoriesController = {
        /*async updateCategory(categoria){    
            return dbOpen.openDb().then(db=>{
                db.run('UPDATE categorias SET categoria = ? WHERE id = ?', [categoria.id]);
            });
        },*/

        async selectAllCategories(){
            return dbOpen.openDb().then(db=>{
                return db.all('SELECT * FROM categorias').then(res=>res);
            });
        },

}

export default categoriesController;