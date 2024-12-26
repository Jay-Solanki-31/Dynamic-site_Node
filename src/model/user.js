const mongoose =  require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email ID')
            }
        },
    },
    phone:{
        type:Number,
        min:10,
        require:true

    },
    message:{
        type:String,
        require:true,
        minlength:3

    },
    date:{
        type:Date,
        default:Date.now 
    }

});

const User = mongoose.model('User',userSchema);
module.exports = User;