const express = require("express");
const cardRoute = require('./routes/cardRoute');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config');
let bodyParser = require('body-parser');
var cors       = require('cors');
const app     = express();
app.use(express.json());
app.use(cors());
app.use("/",cardRoute);
app.use('/uploads', express.static('./uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(dbConfig.url).then(()=>{
    console.log("Suucessfully connected to the database");
}).catch(err=>{
    console.log('Could not connect the database.Exiting now..',err);
    process.exit();
});


const PORT = 8082;
const listener = app.listen(process.env.PORT || PORT, () => {
    console.log('App is listening on port ' + listener.address().port)
})