const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
const localStrategy = require('passport-local').Strategy;
const passport = require('passport');
const atob = require('atob');


const authenticateUser = ((req, res, next)=>{
    const tkn=req.headers.authorization;
    if(typeof tkn !== "undefined"){
        let token=tkn.split(' ');
        jwt.verify(token[1],'supersecret',(err,authData)=>{
            if(err){
                res.sendStatus(403);
            }else{
                let a = JSON.parse(atob(token[1].split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
                User.findOne({accesscode:a.accesscode}).then((user)=>{
                    if(user){
                    req.id=a.id;
                    next();
                    }else{
                        res.sendStatus(403);
                    }
                }).catch(err=>res.sendStatus(403));
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
// function parseJwt (token) {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     return JSON.parse(window.atob(base64));
// };

module.exports={
    authenticateUser
}