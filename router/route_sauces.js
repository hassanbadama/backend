const express = require('express');
const Control = require('../controler/ctlSauces');
const multer = require('../middlewaire/gestion_fichier')
const auth = require("../middlewaire/auth")



const route = express.Router();
route.post('/sauces',auth,multer, Control.ajouteSauce);
route.post('/likes/:id', Control.likes);
route.get('/afficher',multer, Control.Afficher);
route.delete('/supprimer/:id',auth,Control.delete);
route.get('/rechercher/:id',Control.Recherche);
route.put('/modifier/:id',auth,multer, Control.update);
// router.put('/:id', auth,multer, Control.update);

module.exports = route;