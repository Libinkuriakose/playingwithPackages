const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
const localStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcryptjs')
const {authenticateUser} = require('../middlewares/authenticateUser');
const _ = require('lodash');

//register and add user
// router.post('/', (req, res) => {
//     User.create(req.body).then((user) => {

//         res.send({
//             user,
//             notice: 'successfully added user'
//         });
//     }).catch((err) => {
//         res.send(err);
//     });
// });

//////////,
router.post('/login', (req, res,next) => {
    User.findOne({userName:req.body.userName},(err,user)=>{
        if(err)throw err;
        if(user){
            console.log(req.body.password);
            bcrypt.compare(req.body.password,user.password,(err,isMatch)=>{
                console.log(err,isMatch);
                if(isMatch){
                    user.accesscode=(Math.floor(Math.random()*8999)+1000);
                    user.save();
                    jwt.sign(_.pick(user,['userName','email','age','_id','accesscode']), 'supersecret',{expiresIn:'60d'},(err,token)=>{
                        res.json(token)
                        next()
                    })
                    
                }else{
                    res.json({message:"password mismatch"});
                }
            })
        }
    })
    
});

module.exports={
    loginSigninController:router
}