const express = require('express');
const router = express.Router();
const {Produits} = require('../Model/Produit');
const Joi = require('joi');
const asyncHandler = require('express-async-handler');

/**
 *  @desc Get All Produit
 *  @methode GET
 *  @route /api/produit/acheter
 *  @access Public
 */
router.get('/acheter',asyncHandler(async (req,res)=>{
    const { ids } = req.body;
    const produitList = await Produits.find({ _id: { $in: ids } })
    res.json(produitList);
}))

/**
 *  @desc Add new Produit
 *  @methode POST
 *  @route /api/produit/ajouter
 *  @access Public
 */
router.post('/ajouter',asyncHandler(async(req,res)=>{
    const {error} = validateCreate(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }
    const produit = new Produits({
        nom: req.body.nom,
        description: req.body.description,
        prix: req.body.prix,
    })
    const result = await produit.save();
    res.status(201).json(result);
}))


//verification:
function validateCreate(obj){
    const Schema = Joi.object({
        nom:Joi.string().required(),
        description:Joi.string().required(),
        prix:Joi.number().required(),
    })
    return  Schema.validate(obj);
}





















module.exports = router;