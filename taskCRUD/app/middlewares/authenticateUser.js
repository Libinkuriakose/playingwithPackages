const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
const localStrategy = require('passport-local').Strategy;
const passport = require('passport');


const authenticateUser = ((req, res, next)=>{
    const tkn=req.headers.authorization;
    if(typeof tkn !== "undefined"){
        let token=tkn.split(' ');
        jwt.verify(token[1],'supersecret',(err,authData)=>{
            if(err){
                res.sendStatus(403);
            }else{
                next()
            }
        })
    }else{
        res.sendStatus(403);
    }
    
});

//     passport.use(new localStrategy((username,password,done)))
//     jwt.sign(req.body, 'supersecret',{expiresIn:'40s'},(err,token)=>{
//         res.json(token)
//     })
// });

module.exports={
    authenticateUser
}