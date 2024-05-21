const web_token = require('jsonwebtoken');
const dotenv = require('dotenv').config();


module.exports = (req, res, next)=>{
    try{
        //header , authorisation dans l'entete
        const token = req.headers.authorization.split(' ')[1];
        console.log("autorisation");
        console.log(token);
        const decodeToken = web_token.verify(token, `${process.env.MOT_SECRE}`);
        
        //requipperer id dans token
        const modelId = decodeToken.userId;
        const role = decodeToken.role;
        console.log("oui ouiiiiii teste de token");
        console.log(modelId);
        console.log(role);
        //envoyer l'id
        req.auth={
            userId: modelId,
            role:role
        };
        console.log("teste useId");
        console.log(req.auth);
        next();
    }
    catch(erreur){
        res.status(401).json({erreur});
    }
}

// module.exports = (req, res, next)=>{
//     try{
//         //header , authorisation dans l'entete
//         //  "Authorization":`Bearer ${token}` split(' ') recuperer tout ce qui trouve apré espace  pour entre beare et token
//         const token = req.headers.authorization.split(' ')[1];
//         // verifier le mot cle 'RANDON-TOKEN-SECRET' qui est sait dans controleur lors de la connexion
//         const decodeToken = web_token.verify(token, 'RANDON-TOKEN-SECRET');
//         //requipperer id dans token
//         const modelId = decodeToken.userId;
//         //envoyer l'id  pour garantir la securité
//         req.auth={
//             userId: modelId
//         };
//     }
//     catch(erreur){
//         res.status(401).json({erreur});
//     }
// }