const express = require('express');
const router = express.Router();
const pool  = require('../../pool');
//const bcrypt  = require('bcrypt');
//const jwt = require('jsonwebtoken');
const verifyToken = require('../../middlewares/verifyToken');



router.post('/:topic_id/create' ,verifyToken ,  async(req,res)=>
{

   // res.send(req.params.topic_id);

   if(req.verified==0)
   {
    res.status(401).send('access denied . Need to login first !!');
   }
   else
   {

          pool.query(`INSERT INTO article(user_id,topic_id , title ,image , content  , isFeatured , tags) VALUES ('${req.user._id}','${req.params.topic_id}','${req.body.title}','${req.body.imageURL}','${req.body.content}','${req.body.isFeatured}','${req.body.tags}') ` , (err , result)=>{
                 if(err)
                 {
                     res.send(err);
                     //res.send("oops something went wrong ' Try again later !!");
                 }
                 else{
                     res.send("Article created Successfully !!")
                 }
                 
             
           });

   }
  
 
       
        

})


router.patch('/update/:article_id' ,verifyToken , async(req,res)=>
{

    if(req.verified==0)
   {
    res.status(401).send('access denied . Need to login first !!');
   }
   else{

    await pool.query(`SELECT * FROM article WHERE article_id = ${req.params.article_id} AND user_id=${req.user._id}` , async(err,result)=>
    {
        if(err)
        {
            res.send("Bad request made")
        }
        else
        {
           if(result[0]==null)
           {
               res.send("Unauthorised. Since this Article doesn't belong to you !!")
           }
           else{

            await pool.query(`UPDATE article  SET title = '${req.body.title}' ,image = '${req.body.imageURL}' ,content = '${req.body.content}' ,isFeatured = ${req.body.isFeatured} ,tags = '${req.body.tags}'   WHERE  article_id = ${req.params.article_id}` ,async(err , result)=>
            {
               if(err)
               {
                   res.send(err);
               }
               else
               {
                res.send("gteat job!! updated successgully")
               }
                
            });
 
            
        }
     }
    });
  
   }

    

})



router.get('/:article_id', verifyToken, async(req,res)=>
{
    
    if(req.verified==0)
    {
     res.status(401).send('access denied . Need to login first !!');
    }
    else{

        await pool.query(`SELECT * FROM article WHERE  article_id = ${req.params.article_id}` , async (err , result)=>
        {
            if(err)
            {
                res.send("oops it failed . Try again !!")
            }
            else{
    
                if(result[0]==null)
                {
                    res.send("Bad request made !!")
                }
                else{
    
                  let temp = result[0].views+1;
                  //console.log(temp);
    
                    await pool.query(`UPDATE article  SET views = ${temp} WHERE  article_id = ${req.params.article_id}` ,async(err , result)=>
                    {
                        if(err)
                        {
                            res.send("oops !! someting went wrong !!")
                        }
                        else{
    
                            await pool.query(`SELECT * FROM article WHERE  article_id = ${req.params.article_id}` , async (err , result)=>{
    
                                res.json(result);
            
                            })
    
                        }
                    });
                   
                    
                }
               
            }
        })
    
    

    }
    
   
})






module.exports = router;