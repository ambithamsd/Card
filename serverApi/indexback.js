const express  = require('express');
let bodyParser = require('body-parser');
const dbConfig = require('./config/database.config');
let mongoose   = require('mongoose');
const multer   = require('multer');
const app =express();
const PORT = 8082;
const cardRouter = require('./router/card-router');
app.use(express.json())
app.use('/api', cardRouter);
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(dbConfig.url).then(()=>{
    console.log("Suucessfully connected to the database");
}).catch(err=>{
    console.log('Could not connect the database.Exiting now..',err);
    process.exit();
});

app.listen(
    PORT,
    ()=> console.log(`it's alive on http://localhost:${PORT}`)
);

app.get('/',(req,res)=>{
        res.send("Hello");
});

