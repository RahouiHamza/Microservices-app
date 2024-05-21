const express = require('express');
const router = express.Router();
const axios = require('axios');
const {Commande} = require('../model/Commande')
const asyncHandler = require('express-async-handler');
const verifyToken = require("../middlewares/verifyToken");

//?price calculation :
function prixTotal(produits) {
    let total = 0;
    for (let t = 0; t < produits.length; ++t) {
        total += produits[t].prix;
    }
    console.log("prix total :" + total);
    return total;
}

//?fetch data from produit :
async function httpRequest(ids) {
    try {
        const URL = "http://localhost:4000/api/produit/acheter"
        const response = await axios.post(URL, { ids: ids }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return prixTotal(response.data);
    } catch (error) {
        console.error(error);
    }
}

router.post("/",verifyToken, asyncHandler(
    async (req, res) => {

        const { ids } = req.body;
        httpRequest(ids).then(total => {

            const newCommande = new Commande({
                produits: ids,
                email_utilisateur: req.user.email,
                prix_total: total,
            });
            newCommande.save()
            .then(commande => res.status(201).json(commande))
            .catch(error => res.status(400).json({ error }));
        });
    }
));


module.exports = router;