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
    port: 3306,   // PC : 3306, MAC : 8889,
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

//READ 

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


//READ BY CATEGORY : test Postman localhost:4000/get-items-byCategory/Tables

app.get("/get-items-byCategory/:category", (request, result) => {
    //need to add a variable to the id to be able to link them to the
    //check this link https://stackoverflow.com/questions/41168942/how-to-input-a-nodejs-variable-into-an-sql-query
    //in the object request.params, find the key id and create a variable out of it.
    const { category } = request.params; // const id = request.params.id
    const sql = "SELECT * FROM furniture WHERE category = ?";

    pool.getConnection((err, conn) => {
        if (err) throw err;
        console.log(request.params);
        conn.query(sql, category, function (err, rows, fields) {
            console.log(rows)
            result.send(rows)
        });
    });
});


//READ BY NAME : Test Postman : localhost:4000/get-items-byName/massif

app.get("/get-items-byName/:nom", (request, result) => {
    //need to add a variable to the id to be able to link them to the
    //check this link https://stackoverflow.com/questions/41168942/how-to-input-a-nodejs-variable-into-an-sql-query
    //in the object request.params, find the key id and create a variable out of it.
    const {nom} = request.params; // const id = request.params.id
    const sql = "SELECT * FROM furniture WHERE name LIKE '%" + nom +"%'";
    console.log(sql);
    pool.getConnection((err, conn) => {
        if (err) throw err;
        console.log(request.params);
        conn.query(sql, nom, function (err, rows, fields) {
            console.log(rows)
            result.send(rows)
        });
    });
});


//READ BY PRICE DESCENDANT Test Postman localhost:4000/get-items-byPriceDesc/

app.get("/get-items-byPriceDesc/", (request, result) => {
    //need to add a variable to the id to be able to link them to the
    //check this link https://stackoverflow.com/questions/41168942/how-to-input-a-nodejs-variable-into-an-sql-query
    //in the object request.params, find the key id and create a variable out of it.
    const { price } = request.params; // const id = request.params.id
    const sql = "SELECT * FROM furniture WHERE price ORDER BY price DESC";

    pool.getConnection((err, conn) => {
        if (err) throw err;
        console.log(request.params);
        conn.query(sql, price, function (err, rows, fields) {
            console.log(rows)
            result.send(rows)
        });
    });
});


//READ BY PRICE ASCENDANT Test Postman localhost:4000/get-items-byPriceAsc/

app.get("/get-items-byPriceAsc/", (request, result) => {
    //need to add a variable to the id to be able to link them to the
    //check this link https://stackoverflow.com/questions/41168942/how-to-input-a-nodejs-variable-into-an-sql-query
    //in the object request.params, find the key id and create a variable out of it.
    const { price } = request.params; // const id = request.params.id
    const sql = "SELECT * FROM furniture WHERE price ORDER BY price ASC";

    pool.getConnection((err, conn) => {
        if (err) throw err;
        console.log(request.params);
        conn.query(sql, price, function (err, rows, fields) {
            console.log(rows)
            result.send(rows)
        });
    });
});








//READ BY DESCRIPTION Test Postman localhost:4000/get-items-byDescription/massif

app.get("/get-items-byDescription/:description", (request, result) => {
    //need to add a variable to the id to be able to link them to the
    //check this link https://stackoverflow.com/questions/41168942/how-to-input-a-nodejs-variable-into-an-sql-query
    //in the object request.params, find the key id and create a variable out of it.
    const { description } = request.params; // const id = request.params.id
    const sql = "SELECT * FROM furniture WHERE description LIKE '%" + description +"%'";

    pool.getConnection((err, conn) => {
        if (err) throw err;
        console.log(request.params);
        conn.query(sql, description, function (err, rows, fields) {
            console.log(rows)
            result.send(rows)
        });
    });
});


//CREATE

app.post("/items", (request, result) => {
    pool.getConnection((err, conn) => {
        if (err) throw err;
        const raw_params = request.headers
        const params = (({ name, description, price, img_url, category }) => ({ name, description, price, img_url, category }))(raw_params)
        console.log(request.headers)
        // const params = [request.body.name, 'description', ...]
        conn.query("INSERT INTO furniture SET `id`=NULL, `created`=NOW(), ?", params, (err, rows) => {
            conn.release()
            if (!err) {
                result.status(200).send("Meuble ajouté avec succès en BDD")
            } else {
                throw err
            }

        })

    })
})

//UPDATE

app.put("/items/:id", (request, result) => {
    const { id } = request.params;
    pool.getConnection((err, conn) => {
        if (err) throw err;
        const raw_params = request.headers
        const params = (({ name, description, price, img_url, category }) => ({ name, description, price, img_url, category }))(raw_params)
        console.log(request.headers)
        // const params = [request.body.name, 'description', ...]
        conn.query("UPDATE `furniture` SET `created`=NOW(), ? WHERE id = " + id, params, (err, rows) => {
            conn.release()
            if (!err) {
                result.status(200).send("Meuble modifié avec succès en BDD")
            } else {
                throw err
            }
        })

    })
})

// DELETE

app.delete("/items/:id", (request, result) => {

    const { id } = request.params; // const id = request.params.id
    const sql = "DELETE FROM furniture WHERE id=?";

    pool.getConnection((err, conn) => {
        if (err) throw err;
        console.log(request.params);
        conn.query(sql, id, function (err, rows, fields) {
            console.log(rows)
            result.send(rows)
        });
    });
});

//READ USER Test Postman localhost:4000/user

app.get("/user", (request, result) => {
    const { user } = request.params; // const id = request.params.id
    const sql = "SELECT * FROM users";

    pool.getConnection((err, conn) => {
        if (err) throw err;
        console.log(request.params);
        conn.query(sql, user, function (err, rows, fields) {
            console.log(rows)
            result.send(rows)
        });
    });
});


//CREATE USER

app.post("/user", (request, result) => {
    pool.getConnection((err, conn) => {
        if (err) throw err;
        const raw_params = request.headers
        const params = (({ Nom, Prenom, Adresse, email, password, phoneNumber }) => ({Nom, Prenom, Adresse, email, password, phoneNumber }))(raw_params)
        console.log(params)
        // const params = [request.body.name, 'description', ...]
        conn.query("INSERT INTO users SET `id`=NULL, `created`=NOW(), ?", params, (err, rows) => {
            conn.release()
            if (!err) {
                result.status(200).send("Nouveau User ajouté avec succès en BDD")
            } else {
                throw err
            }

        })

    })
})






app.listen(port, () => {
    console.log(`Activation listening on port ${port}`)
})