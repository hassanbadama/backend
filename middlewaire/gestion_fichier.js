const multer = require('multer');


//gestion des images 
const MIME_TYPES = {
    'image/jpg':'jpg',
    'image/jpeg':'jpg',
    'image/png':'png'
};
const storage = multer.diskStorage({
    destination:(req, file, calback)=>{
        //creer dossier images dans backend
        calback(null, 'images');
    },
    filename:(req,file, calback)=>{
        //pour les images si ya space remplacer par '-'
        const name = file.originalname.split(' ').join('_');
        //teste les extensiom
        const extension = MIME_TYPES[file.mimetype];
        //ajouter une date 
        calback(null, name + Date.now()+ '.'+extension);
    }
});

module.exports = multer({storage:storage}).single('image');
