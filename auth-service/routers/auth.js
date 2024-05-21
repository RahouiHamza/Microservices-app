const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {User , validateLoginUser , validateUser} = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config()

/**
 *  @desc Register New User
 *  @methode Post
 *  @route /api/auth/register
 *  @access Public
 */
router.post("/register", asyncHandler(async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    let user = await User.findOne({email:req.body.email})
    if(user){
        return res.status(400).json({ message: "this use have already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    req.body.mot_passe = await bcrypt.hash(req.body.mot_passe , salt)


    user = new User({
        nom:req.body.nom,
        email:req.body.email,
        mot_passe:req.body.mot_passe,
    })
    const result = await user.save()
    res.status(201).json(result);

}));

/**
 *  @desc Login User
 *  @methode Post
 *  @route /api/auth/login
 *  @access Public
 */
router.post("/login", asyncHandler(async (req, res) => {
    const { error } = validateLoginUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    let user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).json({ message: "invalid email or password" });
    }

    const isPasswordMatch = await bcrypt.compare(req.body.mot_passe ,user.mot_passe )
    if(!isPasswordMatch){
        return res.status(400).json({ message: "invalid email or password" });
    }
    

    const Token = jwt.sign({email:user.email , nom:user.nom},process.env.JWT_SECRET_KEY);
    res.status(200).json({Token:Token});

}));

module.exports = router;
