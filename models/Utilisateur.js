const mongoose = require('mongoose');


const utilisateur = mongoose.Schema({
    nom:{
        type:String,
        require:true
    },
    role:{
        type:Boolean,
        require:true,
        default:false
    },
    prenom:{
        type:String,
        require:true
    },
    mot:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    file:{
        type:String,
        default:"None"
    }
  
});

module.exports = mongoose.model("Utilisateur", utilisateur);