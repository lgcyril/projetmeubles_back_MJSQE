// LANCER  node index après chaque erreur!!!
// import {session} from 'session.js'; marche pas à cause du require!

const express = require("express");  // require ou import necessite un autre type json
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
    port: 3306,   // ATTENTION CHANGER LE PORT POUR PC : 3306, MAC : 8889,
    user: "root",
    password: "root",
    database: "furniture"
});

//Message renvoyé lors de l'accès à l'index (/) de l'API
app.get("/", (request, result) => {
    result.json({ message: "Bienvenue sur l'API des meubles 2nd life, il faudra qu'on ajoute ici 2-3 tips pour la prise en main de l'API" })
});


//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ 
//$         SESSIONS          $
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

// https://fr.acervolima.com/gestion-de-session-a-l-aide-du-module-de-session-express-dans-node-js/
// TUTO EN LIGNE : session.js

const session = require('express-session')

// Session Setup
app.use(session({
  
    // It holds the secret key for session
    secret: 'petitePrince$$',
  
    // Forces the session to be saved
    // back to the session store
    resave: true,
  
    // Forces a session that is "uninitialized"
    // to be saved to the store
    saveUninitialized: true
}))
   
app.get("/startsession", function(req, res){
       
    // req.session.key = value
    req.session.name = 'userSession'
    console.log("req.session.name : " + req.session.name)
    return res.send("Session Set")
})
   
app.get("/session", function(req, res){
   
    var name = req.session.name
    console.log("name : " + name)
    return res.send(name)
   
    /*  To destroy session you can use
        this function 
     req.session.destroy(function(error){
        console.log("Session Destroyed")
    })
    */
})
    



//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ 
//$       FURNITURES          $
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


// 1.1) READ ALL FURNITURES : Test Postman : GET localhost:4000/items

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


// 1.2) READ 4 LAST FURNITURES : Test Postman : GET localhost:4000/last4items

app.get("/last4items", (request, result) => {
    console.log('attempting to connect to database')
    pool.getConnection((err, conn) => {
        console.log('etablissement de la connexion')
        if (err) throw err;
        conn.query("SELECT * FROM `furniture` WHERE created ORDER BY created DESC LIMIT 4;",
            (error, results, fields) => {
                console.log('envoi de la requête')
                conn.release();

                if (error) throw error;

                console.log(results)
                result.send(results)
            });
    });
});


// 1.3) READ BY ID FURNITURE : Test Postman : GET localhost:4000/items/"remplacer-par-mon-id"

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


// 1.4) READ BY CATEGORY : Test Postman : GET localhost:4000/get-items-byCategory/Tables

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


// 1.5) READ BY NAME : Test Postman : GET localhost:4000/get-items-byName/massif

app.get("/get-items-byName/:nom", (request, result) => {
    //need to add a variable to the id to be able to link them to the
    //check this link https://stackoverflow.com/questions/41168942/how-to-input-a-nodejs-variable-into-an-sql-query
    //in the object request.params, find the key id and create a variable out of it.
    const { nom } = request.params; // const id = request.params.id
    const sql = "SELECT * FROM furniture WHERE name LIKE '%" + nom + "%'";
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


// 1.6) READ BY PRICE DESCENDANT : Test Postman : GET localhost:4000/get-items-byPriceDesc/

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


// 1.7) READ BY PRICE ASCENDANT : Test Postman : GET localhost:4000/get-items-byPriceAsc/

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


// 1.8) READ BY DESCRIPTION : Test Postman : GET localhost:4000/get-items-byDescription/massif

app.get("/get-items-byDescription/:description", (request, result) => {
    //need to add a variable to the id to be able to link them to the
    //check this link https://stackoverflow.com/questions/41168942/how-to-input-a-nodejs-variable-into-an-sql-query
    //in the object request.params, find the key id and create a variable out of it.
    const { description } = request.params; // const id = request.params.id
    const sql = "SELECT * FROM furniture WHERE description LIKE '%" + description + "%'";

    pool.getConnection((err, conn) => {
        if (err) throw err;
        console.log(request.params);
        conn.query(sql, description, function (err, rows, fields) {
            console.log(rows)
            result.send(rows)
        });
    });
});


// 1.9) CREATE NEW FURNITURE : Test Postman : POST localhost:4000/items  Puis dans Headers remplir les clés name, description...

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


// 1.10) UPDATE FURNITURE NAME BY ID : Test Postman : PUT localhost:4000/items/"remplacer-par-mon-id"

app.put("/items/:id", (request, result) => {
    const { id } = request.params;
    pool.getConnection((err, conn) => {
        if (err) throw err;
        const raw_params = request.headers
        const params = (({ name }) => ({ name }))(raw_params)
        console.log(request.headers)
        // const params = [request.body.name, 'description', ...]
        conn.query("UPDATE `furniture` SET `created`=NOW(), ? WHERE id = " + id, params, (err, rows) => {
            conn.release()
            if (!err) {
                result.status(200).send("Meuble name modifié avec succès en BDD")
            } else {
                throw err
            }
        })
    })
})


// 1.11) UPDATE FURNITURE DESCRIPTION BY ID : Test Postman : PUT localhost:4000/items/"remplacer-par-mon-id"

app.put("/items/:id", (request, result) => {
    const { id } = request.params;
    pool.getConnection((err, conn) => {
        if (err) throw err;
        const raw_params = request.headers
        const params = (({ description }) => ({ description }))(raw_params)
        console.log(request.headers)
        // const params = [request.body.name, 'description', ...]
        conn.query("UPDATE `furniture` SET `created`=NOW(), ? WHERE id = " + id, params, (err, rows) => {
            conn.release()
            if (!err) {
                result.status(200).send("Meuble description modifié avec succès en BDD")
            } else {
                throw err
            }
        })
    })
})


// 1.12) UPDATE FURNITURE PRICE BY ID : Test Postman : PUT localhost:4000/items/"remplacer-par-mon-id"

app.put("/items/:id", (request, result) => {
    const { id } = request.params;
    pool.getConnection((err, conn) => {
        if (err) throw err;
        const raw_params = request.headers
        const params = (({ price }) => ({ price }))(raw_params)
        console.log(request.headers)
        // const params = [request.body.name, 'description', ...]
        conn.query("UPDATE `furniture` SET `created`=NOW(), ? WHERE id = " + id, params, (err, rows) => {
            conn.release()
            if (!err) {
                result.status(200).send("Meuble price modifié avec succès en BDD")
            } else {
                throw err
            }
        })
    })
})


// 1.13) UPDATE FURNITURE IMAGE BY ID : Test Postman : PUT localhost:4000/items/"remplacer-par-mon-id"

app.put("/items/:id", (request, result) => {
    const { id } = request.params;
    pool.getConnection((err, conn) => {
        if (err) throw err;
        const raw_params = request.headers
        const params = (({ img_url }) => ({ img_url }))(raw_params)
        console.log(request.headers)
        // const params = [request.body.name, 'description', ...]
        conn.query("UPDATE `furniture` SET `created`=NOW(), ? WHERE id = " + id, params, (err, rows) => {
            conn.release()
            if (!err) {
                result.status(200).send("Meuble image modifié avec succès en BDD")
            } else {
                throw err
            }
        })
    })
})


// 1.14) UPDATE FURNITURE CATEGORY BY ID : Test Postman : PUT localhost:4000/items/"remplacer-par-mon-id"

app.put("/items/:id", (request, result) => {
    const { id } = request.params;
    pool.getConnection((err, conn) => {
        if (err) throw err;
        const raw_params = request.headers
        const params = (({ category }) => ({ category }))(raw_params)
        console.log(request.headers)
        // const params = [request.body.name, 'description', ...]
        conn.query("UPDATE `furniture` SET `created`=NOW(), ? WHERE id = " + id, params, (err, rows) => {
            conn.release()
            if (!err) {
                result.status(200).send("Meuble category modifié avec succès en BDD")
            } else {
                throw err
            }
        })
    })
})

// 1.15) DELETE FURNITURE BY ID : Test Postman : DELETE localhost:4000/items/"remplacer-par-mon-id"

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




//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ 
//$            USERS          $
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

// 2.1) READ ALL USERS : Test Postman : GET localhost:4000/user

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


// 2.2) CREATE USER : Test Postman : POST localhost:4000/user  NE PAS UTILISER DES MAJUSCULES POUR LES NOMS DES CLES BDD

app.post("/user", (request, result) => {
    pool.getConnection((err, conn) => {
        if (err) throw err;
        const raw_params = request.headers  // contient tout !
        const params = (({ nom, prenom, adresse, email, password, phonenumber, isadmin }) => ({ nom, prenom, adresse, email, password, phonenumber, isadmin }))(raw_params)
        console.log(raw_params)
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


// 2.3) UPDATE USER NAME : Test Postman : PUT localhost:4000/user/"remplacer-par-mon-id"

app.put("/user/:id", (request, result) => {
    const { id } = request.params;
    pool.getConnection((err, conn) => {
        if (err) throw err;
        const raw_params = request.headers
        const params = (({ nom }) => ({ nom }))(raw_params)
        console.log(request.headers)
        // const params = [request.body.name, 'description', ...]
        conn.query("UPDATE `users` SET `created`=NOW(), ? WHERE id = " + id, params, (err, rows) => {
            conn.release()
            if (!err) {
                result.status(200).send("User name modifié avec succès en BDD")
            } else {
                throw err
            }
        })
    })
})


// 2.4) UPDATE USER PRENOM : Test Postman : PUT localhost:4000/user/"remplacer-par-mon-id"

app.put("/user/:id", (request, result) => {
    const { id } = request.params;
    pool.getConnection((err, conn) => {
        if (err) throw err;
        const raw_params = request.headers
        const params = (({ prenom }) => ({ prenom }))(raw_params)
        console.log(request.headers)
        // const params = [request.body.name, 'description', ...]
        conn.query("UPDATE `users` SET `created`=NOW(), ? WHERE id = " + id, params, (err, rows) => {
            conn.release()
            if (!err) {
                result.status(200).send("User prenom modifié avec succès en BDD")
            } else {
                throw err
            }
        })
    })
})


// 2.5) UPDATE USER ADRESSE : Test Postman : PUT localhost:4000/user/"remplacer-par-mon-id"

app.put("/user/:id", (request, result) => {
    const { id } = request.params;
    pool.getConnection((err, conn) => {
        if (err) throw err;
        const raw_params = request.headers
        const params = (({ adresse }) => ({ adresse }))(raw_params)
        console.log(request.headers)
        // const params = [request.body.name, 'description', ...]
        conn.query("UPDATE `users` SET `created`=NOW(), ? WHERE id = " + id, params, (err, rows) => {
            conn.release()
            if (!err) {
                result.status(200).send("User adresse modifié avec succès en BDD")
            } else {
                throw err
            }
        })
    })
})


// 2.6) UPDATE USER EMAIL : Test Postman : PUT localhost:4000/user/"remplacer-par-mon-id"

app.put("/useremail/:id", (request, result) => {
    const { id } = request.params;
    pool.getConnection((err, conn) => {
        if (err) throw err;
        const raw_params = request.headers
        const params = (({ email }) => ({ email }))(raw_params)
        console.log(request.headers)
        // const params = [request.body.name, 'description', ...]
        conn.query("UPDATE `users` SET `created`=NOW(), ? WHERE id = " + id, params, (err, rows) => {
            conn.release()
            if (!err) {
                result.status(200).send("User email modifié avec succès en BDD")
            } else {
                throw err
            }
        })
    })
})


// 2.7) UPDATE USER PASSWORD : Test Postman : PUT localhost:4000/user/"remplacer-par-mon-id"

app.put("/user/:id", (request, result) => {
    const { id } = request.params;
    pool.getConnection((err, conn) => {
        if (err) throw err;
        const raw_params = request.headers
        const params = (({ password }) => ({ password }))(raw_params)
        console.log(request.headers)
        // const params = [request.body.name, 'description', ...]
        conn.query("UPDATE `users` SET `created`=NOW(), ? WHERE id = " + id, params, (err, rows) => {
            conn.release()
            if (!err) {
                result.status(200).send("User password modifié avec succès en BDD")
            } else {
                throw err
            }
        })
    })
})


// 2.8) UPDATE USER PHONENUMBER : Test Postman : PUT localhost:4000/user/"remplacer-par-mon-id"
// parametres : recupere les champs + valeurs envoyes par le FRONT!

app.put("/user/:id", (request, result) => {
    const { id } = request.params;
    pool.getConnection((err, conn) => {
        if (err) throw err;
        const raw_params = request.headers
        const params = (({ phonenumber }) => ({ phonenumber }))(raw_params)
        console.log(request.headers)
        // const params = [request.body.name, 'description', ...]
        conn.query("UPDATE `users` SET `created`=NOW(), ? WHERE id = " + id, params, (err, rows) => {
            conn.release()
            if (!err) {
                result.status(200).send("User phonenumber modifié avec succès en BDD")
            } else {
                throw err
            }
        })
    })
})


// 2.9) UPDATE USER ISADMIN : Test Postman : PUT localhost:4000/user/"remplacer-par-mon-id"

app.patch("/user/:id", (request, result) => {
    const { id } = request.params;
    pool.getConnection((err, conn) => {
        if (err) throw err;
        const raw_params = request.headers
        const params = (({ isadmin }) => ({ isadmin }))(raw_params)
        console.log(request.headers)
        // const params = [request.body.name, 'description', ...]
        conn.query("UPDATE `users` SET `created`=NOW(), ? WHERE id = " + id, params, (err, rows) => {
            conn.release()
            if (!err) {
                result.status(200).send("User isadmin modifié avec succès en BDD")
            } else {
                throw err
            }
        })
    })
})


// 2.10) DELETE USER BY ID : Test Postman : DELETE localhost:4000/user/"remplacer-par-mon-id"

app.delete("/user/:id", (request, result) => {

    const { id } = request.params; // const id = request.params.id
    const sql = "DELETE FROM users WHERE id=?";

    pool.getConnection((err, conn) => {
        if (err) throw err;
        console.log(request.params);
        conn.query(sql, id, function (err, rows, fields) {
            console.log(rows)
            result.send(rows)
        });
    });
});




// ACTIVATION PORT LISTENING NODE JS

app.listen(port, function(error){
    if(error) throw error
    console.log(`Activation listening on port ${port}`)
})