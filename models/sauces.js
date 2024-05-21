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

    nom:{
        type:String,
        required:true,
        unique:true
    },
    prenom:{
        type:String,
        required:true,
        unique:true
    },
    image_publication:{
        type:String,
        default:"None"
    }
  
});

module.exports = mongoose.model("Sauces", sauces);