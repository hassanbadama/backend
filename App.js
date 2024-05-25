const express = require ('express');
// const mongo = require('mongodb');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const body_parser = require('body-parser');
const path = require('path');
//pour gere tt les variables envirenement
const dotenv = require('dotenv').config()
const route_user = require('./router/route_utilisateur')
const route_sauces = require('./router/route_sauces')




//projet_complet
 mongoose.connect(`mongodb+srv://${process.env.ENV_USER}:${process.env.ENV_PASSWORD}${process.env.URL}`,
// {userNewUrlParser:true,useUnifiedTopology:true

// }
).then(()=>console.log("connexion en mongodb recu"))
 .catch(()=>{
    console.log("connexion n'est pas vraiment  reçu");
 });
//  app.get('/',(req, res)=>{
//     res.send("bonjoure bbbb")
//  });

//rendre le service demande par front
//cors(crousss origine resource sharhne partage) utiliser
app.use((req,res, next)=>{
   res.setHeader('Access-Control-Allow-Origin', 'https://backend-mongodb-0jt7.onrender.com'); //le lien de requette(localhost, http...)
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTION');
   next();
});
//passer toutes les donnees en json
app.use(express.json());
//passer les donnees en body  en json
app.use(body_parser.json());
app.use('/api/auth',route_user);
app.use('/api/auth',route_sauces);
//app.use('/api/sauces',routerajout);
//chemin en local pour afficher image
app.use('/images', express.static(path.join(__dirname,'images')));
module.exports = app;
