const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
const mysql = require('mysql');
const Connection = require("mysql/lib/Connection");

app.use(express.json());
app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    })
);

//Paramétrage d'accès à la db
const pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "furniture"
});

//Message renvoyé lors de l'accès à l'index (/) de l'API
app.get("/", (request, result) => {
    result.json({ message: "Bienvenue sur l'API des meubles 2nd life, il faudra qu'on ajoute ici 2-3 tips pour la prise en main de l'API" })
});

app.get("/items", (request, result) => {
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

app.get("/items/:id", (request, result) => {
    //need to add a variable to the id to be able to link them to the
    //check this link https://stackoverflow.com/questions/41168942/how-to-input-a-nodejs-variable-into-an-sql-query
    //in the object request.params, find the key id and create a variable out of it.
    const { id } = request.params; // const id = request.params.id
    const sql = "SELECT * FROM furniture WHERE id = ?";

    pool.getConnection((err, conn) => {
        if (err) throw err;
        console.log(request.params);
        conn.query(sql, id, function (err, rows, fields) {
            console.log(rows)
            result.send(rows)
        });
    });
});


app.post("/items", (request, result) => {
    pool.getConnection((err, conn) => {
        if (err) throw err;
        const raw_params = request.headers
        const params = (({name, description, price, img_url, category}) => ({name, description, price, img_url, category} ))(raw_params)
        console.log(request.headers)
        // const params = [request.body.name, 'description', ...]
        conn.query("INSERT INTO furniture SET `id`=NULL, `created`=NOW(), ?", params, (err, rows) => {
            conn.release()
            if (!err) {
                result.send('Furniture was added')
            } else {
                throw err
            }
            result.send("yahoooooo", rows)
        })

    })
})


app.listen(port, () => {
    console.log(`Activation listening on port ${port}`)
})