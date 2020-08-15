const express = require('express');
const router = express.Router();
const pool  = require('../../pool');
//const bcrypt  = require('bcrypt');
//const jwt = require('jsonwebtoken');
const verifyToken = require('../../middlewares/verifyToken');

router.get('/:topic_id', verifyToken ,  async(req,res)=>
{

    if(req.verified==1)
    {
        await pool.query(`SELECT * FROM article WHERE topic_id = ${req.params.topic_id}` , (err , result)=>
    {
        if(err)
        {
            res.send("oops it failed . Try again !!")
        }
        else{

            if(result[0]==null)
            {
                res.send("No article to show .Please create article so that others as well as you can see them !!")
            }
            else{
                res.json(result);
            }
           
        }
      })
    }
    else{

        await pool.query(`SELECT * FROM article WHERE topic_id = ${req.params.topic_id} AND isFeatured = 0 ` , (err , result)=>
        {
            if(err)
            {
                res.send("oops it failed . Try again !!")
            }
            else{
    
                if(result[0]==null)
                {
                    res.send("No article to show .Please create article so that others as well as you can see them !!")
                }
                else{
                    res.json(result);
                }
               
            }
          })

    }
   


})

module.exports = router;
