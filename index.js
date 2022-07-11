// LANCER  node index après chaque erreur/modif!!!
// Ou installer Nodemon pour lancer automatiquement node.js : nodemon ./index.js https://morioh.com/p/6c194fad524c
// rs pour restart nodemon
// import {session} from 'session.js'; marche pas à cause du require!


// INITIALISATION : mettre les require au debut!
const express = require("express");  // require ou import necessite un autre type json
const cors = require("cors");
const session = require('express-session')
const cookieParser = require("cookie-parser");
const app = express();  // initialise l'app express
const port = 4000;      // port web express sur 4000 : http request are routed from port 80 to 8080
const mysql = require('mysql');
const Connection = require("mysql/lib/Connection");

// SETUP

// ACTIVATION PORT LISTENING NODE JS

app.listen(port, function(error){
    if(error) throw error
    console.log(`Activation listening on port ${port}`)
})

// parsing the incoming data : This will help us parser an HTTP POST method request from an HTML document. We also need to serve 
// the CSS styling to format the outlook of the HTML form. Add the following express methods to perform these operations.
app.use(express.json());
app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    })
);

//serving public file
app.use(express.static(__dirname));

// cookie parser middleware : Define Cookie-parser usage so that the server can access the necessary option to save, read and access
// a cookie.
app.use(cookieParser());

//Paramétrage d'accès à la db. Voir différence entre createPool et createConnection : https://stackoverflow.com/questions/26432178/what-is-the-difference-between-mysql-createconnection-and-mysql-createpool-in-no
// When you create a connection, you only have one connection and it lasts until you close it (or it is closed by the mysql server).
// You can pass it around by reference and re-use it, or you can create and close connections on demand.
// A pool is a place where connections get stored. When you request a connection from a pool, you will receive a connection that is
// not currently being used, or a new connection. If you're already at the connection limit, it will wait until a connection is 
// available before it continues. These pooled connections do not need to be manually closed, they can remain open and be easily 
// reused.
const pool = mysql.createPool({
    host: "localhost",
    port: 3306,   // ATTENTION CHANGER LE PORT POUR PC : 3306, MAC : 8889,
    user: "root",
    password: "root",
    database: "furniture"
});


//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ 
//$         SESSIONS          $
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// La gestion de session consiste simplement à obtenir/définir/supprimer les propriétés d'un objet JavaScript.
// Dans ExpressJS, les sessions sont créées au niveau de l'application. Cela signifie que lorsque vous lancez
// votre application, vous créez un tout nouveau gestionnaire de session pour l'ensemble du processus Node.
// Au lieu de cela, en PHP, les sessions sont créées sur demande. Lorsque vous accédez à une page contenant 
// session_start(), PHP vérifie si le navigateur a déjà stocké le jeton de session. Si c'est le cas, il 
// continue avec la session en cours, sinon il démarre une nouvelle session.
// Supposons maintenant que vous implémentiez un panier dans Express. Si vous définissez la variable du 
// panier au tout début, vous obtiendrez simplement le résultat indésirable d'avoir un seul panier partagé 
// entre tous les utilisateurs de votre site Web. En d'autres termes, les variables de session doivent être
// définies localement après certaines actions de l'utilisateur.
// https://morioh.com/p/d1865292a4f4
// https://fr.acervolima.com/gestion-de-session-a-l-aide-du-module-de-session-express-dans-node-js/
// TUTO EN LIGNE : session.js

const oneDay = 1000 * 60 * 60 * 24; // creating 24 hours from milliseconds

// 0.1) Session middleware Setup : https://www.npmjs.com/package/express-session/v/1.17.3
// Il faut faire app.use à l'endroit où tu as toutes tes routes puis que tu vas récupérer la session dans la requête de ton 
// action en faisant req.session.

app.use(session({
  
    // It holds the secret key for session. It is stored in an environment variable and can’t be exposed to the public. 
    // The key is usually long and randomly generated in a production environment.
    secret: 'petitePrince$$3',
  
    // Forces the session to be saved back to the session store
    // It enables the session to be stored back to the session store, even if the session was never modified during the request. 
    // This can result in a race situation in case a client makes two parallel requests to the server. Thus modification made on 
    // the session of the first request may be overwritten when the second request ends. The default value is true. However, this 
    // may change at some point. false is a better alternative.
    resave: false,
  
    // Forces a session that is "uninitialized" to be saved to the store
    // this allows any uninitialized session to be sent to the store. When a session is created but not modified, it is referred 
    // to as uninitialized.
    saveUninitialized: true,

    // cookie : this sets the cookie expiry time. The browser will delete the cookie after the set duration elapses. The cookie 
    // will not be attached to any of the requests in the future. In this case, we’ve set the maxAge to a single day as computed 
    // by the following arithmetic.
    cookie: { maxAge: oneDay }
}))

//username and password
const myusername = 'user1'
const mypassword = 'mypassword'

// a variable to save a session
var mySession;

// Message renvoyé lors de l'accès à l'index (/) de l'API
// VOIR ROUTAGE EXPRESS : https://expressjs.com/fr/guide/routing.html
// Si session est chargé après la route au chemin racine /, la demande ne l’atteindra jamais et l’application 
// n’imprimera pas “LOGGED”, car le gestionnaire de route du chemin racine interrompra le cycle de 
// demande-réponse.

app.get("/", (request, result) => {
    //result.json({ message: "Bienvenue sur l'API des meubles 2nd life, il faudra qu'on ajoute ici 2-3 tips pour la prise en main de l'API" })
    mySession=request.session;
    if(mySession.userid){  // s'il est deja logué, alors il affiche ce message
        result.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }else  // sinon la page de login
    result.sendFile('Login.html',{root:__dirname})
});


// 0.2) Pour définir votre session, ouvrez simplement le navigateur et tapez cette URL : http://localhost:4000/setsession

app.get("/setsession", function(req, res){
       
    // req.session.key = value
    req.session.name = 'userSession'  // recupere l'ID ou username du FRONT
    console.log("req.session.name : " + req.session.name)
    return res.send("Session Set")
})


// 0.3) Verifie le nom de la session en cours : http://localhost:4000/sessionname

app.get("/sessionname", function(req, res){
   
    var name = req.session.name
    console.log("name : " + name)
    return res.send(name)
})


// EN TEST ACTUELLEMENT :
// To create a session, the user will submit the credentials. The server will verify these credentials received in the request’s 
// body with the username and the password for the existing user.
// If the credentials are valid:
// The user will be granted the necessary access.
// The server will create a temporary user session with a random string known as a session ID to identify that session.
// The server will send a cookie to the client’s browser. The session ID is going to be placed inside this cookie.
// Once the client browser saves this cookie, it will send that cookie along with each subsequent request to the server. 
// The server will validate the cookie against the session ID. If the validation is successful, the user is granted access to the 
// requested resources on the server.
// If the credentials are invalid, the server will not grant this user access to the resources. No session will be initialized, 
// and no cookie will be saved.

// une fois logué il appelle ce lien /user et verifie le nom et mdp et envoie la home page si ok
app.post('/user',(req,res) => {
    if(req.body.username == myusername && req.body.password == mypassword){
        mySession=req.session;
        mySession.userid=req.body.username;
        console.log(req.session)
        res.sendFile('Home Page.html',{root:__dirname})
        res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
    }
    else{
        res.send('Invalid username or password');
    }
})

// EN TEST ACTUELLEMENT :
app.get('/admin',function(req,res){
    ssn = req.session;
    console.log("Admin ssn : " )
    console.log(ssn)

    if(ssn.email) {
    console.log("Admin ssn.email : " + ssn.email)
      res.write('<h1>Hello '+ssn.email+'</h1>');
      res.end('<a href="+">Logout</a>');
    } else {
      res.write('<h1>login first.</h1>');
      res.end('<a href="+">Login</a>');
    }
  });

// 0.4) Pour sortir de la session en cours : http://localhost:4000/logout
// When the user decides to log out, the server will destroy (req.session.destroy();) the session and clear out the cookie on the 
// client-side. Cookies are cleared in the browser when the maxAge expires.
app.get("/logout", function(req,res){
    req.session.destroy(function(err) {
      if(err) {
        console.log(err);
      } else {
        res.redirect('/Home Page.html');
      }
    });
  });




//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ 
//$       FURNITURES          $
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


// 1.1) READ ALL FURNITURES : Test Postman : GET localhost:4000/get-allItems

app.get("/get-allItems", (request, result) => {
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


// 1.3) READ BY ID FURNITURE : Test Postman : GET localhost:4000/get-itemsbyID/"remplacer-par-mon-id"

app.get("/get-itemsbyID/:id", (request, result) => {
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


// 1.9) CREATE NEW FURNITURE : Test Postman : POST localhost:4000/post-items  Puis dans Headers remplir les clés name, description...

app.post("/post-items", (request, result) => {
    pool.getConnection((err, conn) => {
        if (err) throw err;
        const raw_params = request.headers
        const params = (({ name, description, price, img_url, category }) => ({ name, description, price, img_url, category }))(raw_params)
        console.log(request.headers)
        // const params = [request.body.name, 'description', ...]
        conn.query("INSERT INTO furniture SET `id`=NULL, `created`=NOW(), ?", params, (err, rows) => {
            conn.release()
            if (!err) {
                // A VOIR : https://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client
                result.status(200).send("Meuble ajouté avec succès en BDD")
            } else {
                throw err
            }
        })
    })
})


// 1.10) UPDATE FURNITURE NAME BY ID : Test Postman : PATCH localhost:4000/patch-itemsName/"remplacer-par-mon-id"

app.patch("/patch-itemsName/:id", (request, result) => {
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


// 1.11) UPDATE FURNITURE DESCRIPTION BY ID : Test Postman : PATCH localhost:4000/patch-itemsDescription/"remplacer-par-mon-id"

app.patch("/patch-itemsDescription/:id", (request, result) => {
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


// 1.12) UPDATE FURNITURE PRICE BY ID : Test Postman : PATCH localhost:4000/patch-itemsPrice/"remplacer-par-mon-id"

app.patch("/patch-itemsPrice/:id", (request, result) => {
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


// 1.13) UPDATE FURNITURE IMAGE BY ID : Test Postman : PUT localhost:4000/patch-itemsImage/"remplacer-par-mon-id"

app.patch("/patch-itemsImage/:id", (request, result) => {
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


// 1.14) UPDATE FURNITURE CATEGORY BY ID : Test Postman : PATCH localhost:4000/patch-itemsCategory/"remplacer-par-mon-id"

app.patch("/patch-itemsCategory/:id", (request, result) => {
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

// 1.15) DELETE FURNITURE BY ID : Test Postman : DELETE localhost:4000/del-itemsbyID/"remplacer-par-mon-id"

app.delete("/del-itemsbyID/:id", (request, result) => {

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

// 2.1) READ ALL USERS : Test Postman : GET localhost:4000/get-allUser

app.get("/get-allUser", (request, result) => {
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


// 2.2) CREATE USER : Test Postman : POST localhost:4000/post-user  NE PAS UTILISER DES MAJUSCULES POUR LES NOMS DES CLES BDD

app.post("/post-user", (request, result) => {
    pool.getConnection((err, conn) => {
        if (err) throw err;
        const raw_params = request.headers  // contient tout !
        const params = (({ nom, prenom, adresse, email, password, phonenumber, isadmin }) => ({ nom, prenom, adresse, email, password, phonenumber, isadmin }))(raw_params)
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


// 2.3) UPDATE USER NAME : Test Postman : PATCH localhost:4000/patch-userName/"remplacer-par-mon-id"

app.patch("/patch-userName/:id", (request, result) => {
    const { id } = request.params;
    pool.getConnection((err, conn) => {
        if (err) throw err;
        const raw_params = request.headers
        const params = (({ nom }) => ({ nom }))(raw_params)
        console.log("raw_params : ")
        console.log(request.headers)
        console.log("params : " )
        console.log(params)
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


// 2.4) UPDATE USER PRENOM : Test Postman : PATCH localhost:4000/patch-userPrenom/"remplacer-par-mon-id"

app.patch("/patch-userPrenom/:id", (request, result) => {
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


// 2.5) UPDATE USER ADRESSE : Test Postman : PATCH localhost:4000/patch-userAdresse/"remplacer-par-mon-id"

app.patch("/patch-userAdresse/:id", (request, result) => {
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


// 2.6) UPDATE USER EMAIL : Test Postman : PATCH localhost:4000/patch-userEmail/"remplacer-par-mon-id"

app.patch("/patch-userEmail/:id", (request, result) => {
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


// 2.7) UPDATE USER PASSWORD : Test Postman : PATCH localhost:4000/patch-userPassword/"remplacer-par-mon-id"

app.patch("/patch-userPasword/:id", (request, result) => {
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


// 2.8) UPDATE USER PHONENUMBER : Test Postman : PATCH localhost:4000/patch-userPhonenumber/"remplacer-par-mon-id"
// parametres : recupere les champs + valeurs envoyes par le FRONT!

app.patch("/patch-userPhonenumber/:id", (request, result) => {
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


// 2.9) UPDATE USER ISADMIN : Test Postman : PATCH localhost:4000/patch-userIsAdmin/"remplacer-par-mon-id"

app.patch("/patch-userIsAdmin/:id", (request, result) => {
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


// 2.10) DELETE USER BY ID : Test Postman : DELETE localhost:4000/del-userbyID/"remplacer-par-mon-id"

app.delete("/del-userbyID/:id", (request, result) => {

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




