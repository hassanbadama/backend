const Sauces = require('../models/sauces');
const fichierImageModifier = require('fs');
const web_token = require('jsonwebtoken');

exports.ajouteSauce = (req, res, next) => {
    //recuperer toutes les donnee dans le formulaire
    console.log("teste reqqqq");
   
   console.log(req.body);
   console.log(req.body.nom);
   console.log(req.body.description);
    const data = req.body
    console.log('enregitre');
    console.log(data);
    const sauces = new Sauces({
      ...data,
      file:`${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      // file: `/images/${req.files.image[0].filename}`,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: []
      //image_publication:`${req.protocol}://${req.get("host")}/images/${req.image_publication.filename}`
    });
    sauces.save()
      .then(() => res.status(201).json({ message: "objet sauces ajouter avec succe!" }))
      .catch((error) => res.status(400).json({ error }));
  };

  exports.Afficher = (req, res, next)=>{
    console.log("affichetall");
    Sauces.find()
      .then((data) => res.status(200).json(data))
      .catch(error => res.status(400).json({ error }));

  }

  exports.likes = (req, res, next)=>{

    if (req.body.like == 0) {
      console.log("dislikeee");
      console.log(req.body);
      Sauces.findOne({ _id: req.params.id })
       .then((lik)=>{
        //tester si id de user exite dans bd
        if (lik.usersLiked.includes(req.body.mot)) {
          Sauces.updateOne(
            {_id:req.params.id},
            {
              // faire mise a jour de element dans bd
              $pull:{usersLiked:req.body.mot},
              $inc:{likes:-1}
            }
          )
          .then(() => res.status(201).json({ message: "objet n'est pas aimé" }))
          .catch((error) => res.status(400).json({ error }));
        }
        if (lik.usersDisliked.includes(req.body.mot)) {
          Sauces.updateOne(
            {_id:req.params.id},
            {
              $pull:{usersDisliked:req.body.mot},
              $inc:{dislikes:-1}
            }
          )
          .then(() => res.status(201).json({ message: "objet n'est pas aimé" }))
          .catch((error) => res.status(400).json({ error }));
          
        }
       })
    }

    if (req.body.like === 1) {
      console.log("likeee");
      console.log(req.body);
     
      Sauces.updateOne(
        {_id:req.params.id},
        {
          // ajouter id de user qui a liké. ça fait d'une maniere automatique avec ($push et $inc element reconnu par js)
          $push:{usersLiked:req.body.mot},
          $inc:{likes:+1}
        }
    
      ).then(() => res.status(201).json({ message: "objet liké" }))
       .catch((error) => res.status(400).json({ error }));
        
      }

      if (req.body.like === -1) {
            console.log("oui teste ne pas likee");
          console.log(req.body.mot);
          console.log("oui teste id");
          console.log(req.params);
         
          Sauces.updateOne(
          {_id:req.params.id},
          {
            $push:{usersDisliked:req.body.mot},
            $inc:{dislikes:+1}
          }
      
        ).then(() => res.status(201).json({ message: "objet n'est pas liké" }))
         .catch((error) => res.status(400).json({ error }));
          
        }
  }

  //supprimer
exports.delete = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
  .then((data) => {
    //pour le niveau de securite pour tester si c'est vraiment user qui est connecté
    if (data.userId === req.auth.userId || req.auth.role === true) {
      const elt = data.file.split('/images/')[1];
      
      //supprimer l'image qui existe dans le dossier images
      fichierImageModifier.unlink(`images/${elt}`, (error) => {
        if (error) {
          console.log(error);
        }
      })
      const id = req.params.id
      Sauces.deleteOne({ _id: id })
        .then((data) => res.status(200).json(data))
        .catch(error => res.status(400).json({ error }));

    }
  })
}


//recherche
exports.Recherche = (req, res, next) => {
  const id = req.params.id
  Sauces.findOne({ _id: id })
    .then((data) => res.status(200).json(data))
    .catch(error => res.status(400).json({ error }));
}


//modification
exports.update = (req, res, next) => {
  //const id = req.params.id
  console.log("teste moddifier ");
  console.log(req.params.id);
  console.log(req.params);
  console.log(req.body);
  Sauces.findOne({ _id: req.params.id })
    .then((data) => {
      //pour le niveau de securite pour tester si c'est vraiment user qui est connecté
      if (data.userId === req.auth.userId || req.auth.role === true) {
        if (req.file) {
          const elt = data.file.split('/images/')[1];
          //supprimer le image qui existe dans le dossier image
          fichierImageModifier.unlink(`images/${elt}`, (error) => {
            if (error) {
              console.log(error);
            }
          });
        }
        // si on a modifie les elements avec image
        const ObjetNouveaufichier = req.file ? {
          ...req.body,
          file:`${req.protocol}://${req.get("host")}/images/${req.file.filename}`,

        } : { ...req.body };
        // Modelsauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) ça modifier juste les elements sans modifie image
        Sauces.updateOne({ _id: req.params.id }, { ...ObjetNouveaufichier, _id: req.params.id })
          .then((data) => res.status(200).json(data))
          .catch(error => res.status(400).json({ error }));
      }
    })


}
