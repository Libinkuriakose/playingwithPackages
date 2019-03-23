const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const {authenticateUser} = require('../middlewares/authenticateUser');


//see all of user
router.get('/',authenticateUser,(req, res) => {
    const t = req.header('x-auth');
    const tkn=req.headers['authorisation'];
    console.log(tkn);
    console.log(t);
   User.find().then((users) => {
       res.send(users);
   }).catch((err) => {
       res.send(err);
   }); 
});

// add a user
router.post('/', (req, res) => {
    User.create(req.body).then((user) => {
        res.send({
            user,
            notice: 'successfully added user'
        });
    }).catch((err) => {
        res.send(err);
    });
});


//update a user
router.put('/id',authenticateUser, (req, res) => {
    User.findOneAndUpdate({ _id: req.id}, { $set: req.body }).then((user) => {
        if(!user){
            res.send({
                notice: 'user not found'
            });
        }
        user.save();
        res.send({
            user,
            notice: 'Successfully updated user'
        });
    });
});

//find user by id
router.get('/id',authenticateUser, (req, res) => {
    User.findById(req.id).then((user) => {
        res.send(user);
    });
});

//find user by name
//localhost:3000/users?name=
router.get('/name',authenticateUser, (req, res) => {
    User.find({ userName: req.query.name}).then((user) => {
        res.send(user);
    }).catch((err) => {
        res.send(err);
    });
});

//delete a user
router.delete('/id',authenticateUser, (req, res) => {
    User.findByIdAndDelete(req.id).then((user) => {
        if(user) {
            res.send(user);
        } else {
            res.send({
                notice: 'user not found'
            })
        }
    }).catch((err) => {
        res.send(err);
    });
});


module.exports = {
    usersController: router
}