const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config()

//?connect to mongoDB:
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Commande-DB conected to mongodb'))
    .catch((error) => console.log('connection faild to mongodb', error))

//?app init :
const app = express();
const CommandePath = require('./routes/commande');

app.use(express.json());

//?Routes:
app.use('/api/commande', CommandePath);

//?Runing the server : 
const Port = process.env.PORT || 4001;
app.listen(Port, () => {
    console.log(`the server is runing in ${Port}`)
})
