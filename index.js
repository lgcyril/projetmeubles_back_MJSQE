const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const mysql = require('mysql');

app.use(express.json());
app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    })
);

//Paramétrage d'accès à la db
const config = {
    db: {
        host: "db4free.net",
        user: "bynood",
        password: "oulianov",
        database: "test_furniture",
    },
    listPerPage: 10,
}

const pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password:"root",
    database: "furniture"
});

//Message renvoyé lors de l'accès à l'index (/) de l'API
app.get("/", (request, result) => {
result.json({message: "Bienvenue sur l'API des meubles 2nd life, il faudra qu'on ajoute ici 2-3 tips pour la prise en main de l'API"})
});

app.get("/items", (request, result)=> {
   console.log('attempting to connect to database')
   pool.getConnection((err, conn) => {
        console.log('etablissement de la connexion')
        if (err) throw err;
        conn.query("SELECT * FROM `furniture` LIMIT 50", 
        (error, results, fields) => {
            console.log('envoi de la requête')
            conn.release();

            if (error) throw error;

            console.log(results)
            result.send(results)
    });
   });
});


app.listen(port, () => {
    console.log(`Activation listening on port ${port}`)
})