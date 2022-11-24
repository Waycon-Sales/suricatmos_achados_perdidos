import { createRequire } from "module";
import controller from './controllers/methodsController.js';
import multer from 'multer';

const require = createRequire(import.meta.url);
const express = require('express');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "./public/uploads/");
    },
    filename: function (req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
    
});

const upload = multer({storage:storage});


router.get('/', controller.bemVinde);
router.post('/insertObject', upload.single("imagemObject"),controller.inserirObjeto);
router.post('/updateObject',controller.atualizarObjeto);
router.post('/updateImageObject', upload.single("imagemObject"),controller.atualizarImagemObjeto);
router.post('/selectAllObjectsType',controller.selectAllObjectsType);
router.get('/selectAllObjects',controller.selectAllObjects);
router.post('/adm/loginAdm',controller.loginAdm);
router.post('/adm/resetPw',controller.resetPw);
router.get('/selectAllCategories',controller.selectAllCategories);
router.post('/deleteObject',controller.deleteObject);
router.post('/selectOneObject',controller.selectOneObject);



export default router;