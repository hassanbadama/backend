const bcryp = require("bcrypt");
const web_token = require('jsonwebtoken');
const Utilisateur = require('../models/Utilisateur')


exports.AjouterUser = (req, res, next)=>{
    console.log("oui ici");
   console.log(`${req.protocol}://${req.get("host")}/images/${req.file.filename}`);
    console.log(req.body.mot);
    console.log(req.body.email);
    console.log(req.body);
    bcryp
      .hash(req.body.mot, 10)
      .then((hash) => {
        const utilisateur = new Utilisateur({
            nom: req.body.nom,
            role:true,
            prenom: req.body.prenom,
            mot: hash,
            email: req.body.email,
            file:`${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        });
        
        utilisateur.save()
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
          .catch((error) => res.status(400).json({ error }));
      })
      
      .catch((error) => res.status(500).json({ error }));
 
}


exports.Connexion = (req, res, next) => {

  Utilisateur.findOne({ email: req.body.email })
    .then((model) => {
      console.log("il ya user teste");
      console.log(model);
      if (!model) {
        return res.status(401).json({ message: "inconnu" })
      }
      //compare le mot de passe
      bcryp.compare(req.body.mot, model.mot)
        .then(valid => {
          if (!valid) {
            return res.status(400).json({ message: "non authentifier" })
          }
          else {
            //generer un token pour la securité
            console.log("c'est bn token creeer");
            res.status(201).json({
              role:model.role,
              userId: model._id,
              token: web_token.sign(
                { userId: model._id,
                  role:model.role },
                `${process.env.MOT_SECRE}`,
                { expiresIn: "24h" }
              )
            });
          }
        }).catch(error => res.status(403).json({ error }));
    }).catch(error => res.status(500).json({ error }));

}

exports.AfficherUser = (req, res, next)=>{
  console.log("affichetall");
  Utilisateur.find()
    .then((data) => res.status(200).json(data))
    .catch(error => res.status(400).json({ error }));

}
exports.RechercheUser = (req, res, next) => {
  const id = req.params.id
  Utilisateur.findOne({ _id: id })
    .then((data) => res.status(200).json(data))
    .catch(error => res.status(400).json({ error }));
}