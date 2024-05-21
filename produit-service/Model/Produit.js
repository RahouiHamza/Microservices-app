const mongoose = require('mongoose');

const ProduitSchema = new mongoose.Schema({
    nom:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    prix :{
        type:Number,
        require:true
    }
},{timestamps:true});

const Produits = mongoose.model("Produits", ProduitSchema);
module.exports = {Produits};
