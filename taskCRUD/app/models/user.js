const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//delete mongoose.connection.models[''];
let bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken' );
const validator = require('validator');

const userSchema = new Schema({
    userName:{
        type:String,
        required:true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: function () {
                return 'invalid email format'    //can be a string also 
            }
        }
    },
    age:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    accesscode:{
        type:Number
    }
});
// console.log(this,'this')
// userSchema.pre('save', function (next) {
//     let user = this;
//     console.log(this.password,'this');
//     if(user.password==undefined){
//     bcrypt.genSalt(10).then((salt) => {
//         bcrypt.hash(user.password, salt).then((hashed) => {
//             user.password = hashed;
//         });
//     });
//     }
// });



// userSchema.statics.findByToken = function (token) {
//     let User = this;
//     let tokenData;
//     try {
//         tokenData = jwt.verify(token, 'supersecret');
//     } catch (e) {
//         return Promise.reject(e);
//     }
//     return User.findOne({
//         '_id': tokenData._id,
//         'tokens.token': token
//     }).then((user) => {
//         if (user) {
//             return Promise.resolve(user);
//         } else {
//             return Promise.reject(user);
//         }
//     });
// };


const User = mongoose.model('User', userSchema);


module.exports = {
    User
}
