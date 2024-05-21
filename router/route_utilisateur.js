const express = require('express');
const Control = require('../controler/Controle');
const multer = require('../middlewaire/gestion_fichier')
const auth = require('../middlewaire/auth')



const router = express.Router();
router.post('/users',multer, Control.AjouterUser);
router.post('/connexion', Control.Connexion);
router.get('/AfficherUser', Control.AfficherUser);

module.exports = router;