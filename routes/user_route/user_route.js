const express = require('express');
const app = express();
const router = express.Router();
const pool  = require('../../pool');
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../../middlewares/verifyToken');




router.post('/signup' , async(req,res)=>{


    await pool.query(`SELECT email FROM users` , async(err , result)=>
    {
        const arr = [...result];
       // res.send(arr[0]);
        
        for(let i=0;i<arr.length;i++)
        {
            if(arr[i].email===req.body.email)
            {
                res.send("email is already registered , please login or signup with another email");
            }
        }

        const hashedPassword = await bcrypt.hash(req.body.password , 10);
        //console.log(hashedPassword);

        await pool.query(`INSERT INTO users(name,email,password) VALUES ('${req.body.name}' , '${req.body.email}' , '${hashedPassword}')` , async(err,result)=>
        {
            if(err)
            {
                res.send(err);
            }
            else{
                res.send("New user added Successfully!!")
     
             
            }
        });


      
    });
   

    

   
  
  
 
   
 });
 
 
 router.post('/login',async(req,res)=>
  {

    await pool.query(`SELECT * FROM users WHERE email='${req.body.email}'` , async(err , result)=>
    {
       
        if(err)
        {
            res.send("error !! fill everything currectly .")
        }
        else{

           

           if(result[0]==null)
           {
               res.send("incorrect email !!");
           }
           else
           {
               if(await bcrypt.compare(req.body.password , result[0].password))
               {
                  // res.send(result);
                   const token = await jwt.sign({_id : result[0].user_id} , process.env.TOKEN_SECRET , {expiresIn:'5min'});
                   const dialogue = ` since we are only making a backend application so we are not using localstorage to save our token .So , what you can do is you can copy the token from below and put it in the req header whenver making a private request .`
                   res.header('auth-token' , token).json({comment : dialogue , token:token});
                  
               }
               else
               {
                   res.send("incorrect Password !!");
               }
           }

        } 
        
    })
 
    
 
});

module.exports = router ; 
