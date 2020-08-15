const express = require('express');
const app = express();


const pool  = require('./pool');


app.use(express.json());
require('dotenv').config();

app.get('/' , (req,res)=>
{
    res.json({
        "To signup":"/user/signup",
        "Login":"/user/login",
        "To see all topics":"/topic",
        "To see topic by topic id":"/topic/:id",
        "To create topic" : "/topic/create (only admins can do that)",
        "To see all articles of a particular topic(isFeatured can anly bee seen by admins)":"/allartticles/:topic_id",
        "To see article by id (isFeatured can anly bee seen by admins)":"/article/:article_id",
        "To create an article in a particular topic": "/article/:topic_id/create (only admins)",
        "also you can update article by":"/article/update/:article_id" 

    });
})

const userRoute  = require('./routes/user_route/user_route');
app.use('/user' , userRoute);

const topicRoute = require('./routes/topic_route/topic_route');
app.use('/topic' , topicRoute);

const articleRoute = require('./routes/article_route/article_route');
app.use('/article' , articleRoute);

const allArticlesRoute = require('./routes/article_route/all_articles_route');
app.use('/allarticles' , allArticlesRoute);

/*
  app.get('/check' , async(req,res)=>{
    await pool.query('SELECT * FROM users' , (err , result)=>
    {
       if(err)
       {
           res.send("error");
       }
       else{
           res.json(result);
       }
    })
})
*/


port = 5000 || process.env.PORT ;
app.listen(port);