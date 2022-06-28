const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);


//Message renvoyé lors de l'accès à l'index (/) de l'API
app.get("/", (request, result) => {
result.json({message: "Bienvenue sur l'API des meubles 2nd life, il faudra qu'on ajoute ici 2-3 tips pour la prise en main de l'API"})
});



app.listen(port, () => {
    console.log('Activation listening on port 3000')
})