const mongoose = require('mongoose');

const CommandeSchema = new mongoose.Schema({
    produits: {
        type: [String]
    },
    email_utilisateur: String,
    prix_total: Number,
    
},{timestamps:true});

const Commande = mongoose.model('Commande',CommandeSchema);
module.exports = {Commande};
