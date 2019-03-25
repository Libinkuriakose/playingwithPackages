const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
const localStrategy = require('passport-local').Strategy;
const passport = require('passport');
const atob = require('atob');
const bcrypt= require('bcryptjs');

const bCrypt = ((req, res, next)=>{
bcrypt.genSalt(10).then((salt) => {
        bcrypt.hash(req.body.password, salt).then((hashed) => {
            req.body.password = hashed;
            console.log(hashed,'oo');
            next();
        });
    })
})
module.exports={
    bCrypt
}