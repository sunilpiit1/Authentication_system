const jwt  = require('jsonwebtoken');


const verifyToken = async function(req , res , next)
{
    const token = req.header('auth-token');
    //console.log(token);

    if(!token)
    {
        
        req.verified = 0;
           
            next();
    }
    else{


        try{
            
        const verify = await jwt.verify(token , process.env.TOKEN_SECRET);
        //above statement is going to return you information that is incrypted in the json web token if the secret key matches
         req.user = verify ; 
        
         if(req.user._id==null)
         {
            req.verified = 0;
         }
         else{
            req.verified = 1;
         }

        next();
        //this means that everything is verified and now we can make that get request
        //so it will take us back to the get request 

        }
        catch{

            req.verified = 0;
           next();
        }


    }

}

module.exports = verifyToken ; 