const mongoose = require('mongoose');


const sauces = mongoose.Schema({
    userId:{
        type:String,
        required:true, 
        index:true
    },
    description:{
        type:String,
        required:true,
        unique:true
    },
    file:{
        type:String,
        default:"None"
    },
    likes:{
        type:Number,
        required:false,
        default:0
    },
    dislikes:{
        type:Number,
        required:false,
        default:0
    },
    usersLiked:{
        type:[String],
        required:false,
       
    },
    usersDisliked :{
        type:[String],
        required:false,
    },
    message :{
        message:String,
        id_message:String,
        nom:String
    },
    nbre_message:{
        type:Number,
        required:false,
        default:0
    },
    id_message:{
        type:Number,
        required:false,
        default:0
    },

    nom:{
        type:String,
        required:true,
        
    },
    prenom:{
        type:String,
        required:true,
       
    },
    image_publication:{
        type:String,
        default:"None"
    }
  
});

module.exports = mongoose.model("Sauces", sauces);