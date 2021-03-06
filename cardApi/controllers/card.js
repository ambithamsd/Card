const Card =require("../model/Cardmodel");
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const uploadImg = multer({storage: storage}).single('image');
const getAllCard = (req, res, next) => {
    Card.find({}, (err, data)=>{
        if (err){
            return res.json({Error: err});
        }
        return res.json(data);
    })
};

const newCard = (req, res, next) => {
    console.log(req.body);
    Card.findOne({ title: req.body.title }, (err, data) => {

        //if tea not in db, add it
        if (!data) {
            //create a new tea object using the Tea model and req.body

                const newCard = new Card({
                    title:req.body.title,
                    description:req.body.description,
                    duration:req.body.duration,
                    genre:req.body.genre,
                    image:req.file.path
                 });


            // save this object to database
            newCard.save((err, data)=>{
                if(err) return res.json({Error: err});
                return res.json(data);
            })
        //if there's an error or the tea is in db, return a message         
        }else{
            if(err) return res.json(`Something went wrong, please try again. ${err}`);
            return res.json({message:"Card already exists"});
        }
    })

};


//GET '/card/:name'
const getOneCard = (req, res, next) => {
    let title = req.params.title; 
    Card.findOne({title:title}, (err, data) => {
    if(err || !data) {
        return res.json({message: "Card doesn't exist."});
    }
    else return res.json(data); 
    });
};

//POST '/card/:name'
const newComment = (req, res, next) => {
    let title = req.params.title; 
    // console.log(req.body);
    // console.log(req.file);
    Card.findOne({title:title}, function (err, data) {
        if(err || !data ) {
            return res.json({message: "Card doesn't exist."});
        }
        else {
            console.log(data);
            //add comment to comments array of the tea object
            data.title=req.body.title?req.body.title:data.title;
            data.description=req.body.description;
            data.duration=req.body.duration;
            data.genre=req.body.genre;
            if(req.file != undefined){

                data.image=req.file.path;
            }
            //save changes to db
            data.save(err => {
                if (err) { 
                return res.json({message: "Update.", error:err});
                }
                return res.json(data);
            })  
        } 



       
    });
};

//DELETE '/card/:name'
const deleteOneCard = (req, res, next) => {
    let title = req.params.title; // get the name of tea to delete

    Card.deleteOne({title:title}, (err, data) => {
    //if there's nothing to delete return a message
    if( data.deletedCount == 0) return res.json({message: "Card doesn't exist."});
    //else if there's an error, return the err message
    else if (err) return res.json(`Something went wrong, please try again. ${err}`);
    //else, return the success message
    else return res.json({message: "Card deleted."});
    });
};

//export controller functions
module.exports = {
    getAllCard, 
    uploadImg,
    newCard,
    getOneCard,
    newComment,
    deleteOneCard
};

