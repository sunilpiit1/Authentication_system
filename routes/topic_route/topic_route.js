const express = require('express');
const router = express.Router();
const pool  = require('../../pool');
//const jwt = require('jsonwebtoken');
const verifyToken = require('../../middlewares/verifyToken');

router.get('/' , async(req,res)=>{
     await pool.query('SELECT * FROM topic' , (err , result)=>
     {
         if(err)
         {
             res.send("oops it failed . Try again !!")
         }
         else{
            if(result[0]==null)
            {
                res.send("No topics to show. Need to add some topics !!")
            }
            else{
                res.json(result);
            }
         }
     })
})

router.post('/create' ,verifyToken, (req,res)=>
{

    if(req.verified==0)
   {
    res.status(401).send('access denied . Need to login first !!');
   }
   else{
    
    pool.query(`INSERT INTO topic(user_id , name , image) VALUES ('${req.user._id}','${req.body.name}','${req.body.imageURL}') ` , (err , result)=>{
        if(err)
        {
            res.send(err);
        }
        else{
            res.send("Topic created Successfully !!")
        }
        
        
    })

   }
   
})

router.get('/:id' , async(req,res)=>
{
    await pool.query(`SELECT * FROM topic WHERE topic_id = ${req.params.id}` , (err , result)=>
     {
         if(err)
         {
             res.send("oops it failed . Try again !!")
         }
         else{
            if(result[0]==null)
            {
                res.send("No topics to show. Need to add some topics !!")
            }
            else{
                res.json(result);
            }
         }
     })

})

module.exports = router;