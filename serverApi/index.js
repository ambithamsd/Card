const express = require ('express');
const dbConfig = require('./config/database.config');
let mongoose   = require('mongoose');
let bodyParser = require('body-parser');
const app = express();
app.use('/uploads', express.static('./uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect(dbConfig.url).then(()=>{
    console.log("Suucessfully connected to the database");
}).catch(err=>{
    console.log('Could not connect the database.Exiting now..',err);
    process.exit();
});


const routes = require('./router/card'); // import the routes

app.use('/', routes); //to use the routes

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})