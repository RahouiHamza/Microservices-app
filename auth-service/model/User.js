const  mongoose = require("mongoose");
const Joi = require("joi");

const UserSchema = new mongoose.Schema({
    nom:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        require:true,
    },
    mot_passe:{
        type:String,
        require:true,
        minlenght:8,
    },
},{timestamps:true});
const User = mongoose.model('User',UserSchema);

//validation : 
//?validate user:
function validateUser(obj){
    const Schema = Joi.object({
        nom:Joi.string().required().trim(),
        email:Joi.string().required().email().trim(),
        mot_passe:Joi.string().required().trim(),
    })
    return Schema.validate(obj)
}

//?validate login user:
function validateLoginUser(obj){
    const Schema = Joi.object({
        email:Joi.string().required().email().trim(),
        mot_passe:Joi.string().required().trim(),
    })
    return Schema.validate(obj)
}

module.exports = {User , validateLoginUser , validateUser};