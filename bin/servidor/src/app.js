import { createRequire } from "module";
import router from './router.js';
import dbOpen from "./controllers/configDB.js";
import dbTables from './controllers/dataBaseTables.js';

const require = createRequire(import.meta.url);
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    app.use(cors());
    console.log("acessou o midware");
    next();
});

app.use(router);

app.use("/public/uploads", express.static("public/uploads"));
app.use(express.json({limit: '15mb'}));
app.use(express.urlencoded({extended: true, limit: '15mb'}));


//dbOpen.openDb(); //Roda uma unica vez para gerar aquivo database.db
//dbTables.createTables(); // roda pra criar as tabelas
//dbTables.dropTables(); // limpa tabelas
app.listen(8080, () => {
    console.log("Server started in http://localhost:8080")
});