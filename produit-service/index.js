const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config()

//?connect to mongoDB:
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Produit-DB connected to MongoDB'))
.catch((error) => console.log('Connection failed to MongoDB', error));

//?app init :
const app = express();
const ProduitPath = require('./Routers/produi');

app.use(express.json());

//?Routes:
app.use('/api/produit',ProduitPath);

//?Runing the server : 
const Port = process.env.PORT || 4000;
app.listen(Port,()=>{
    console.log(`the server is runing in ${Port}`)
})
