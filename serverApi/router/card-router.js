let express     = require('express');
let router      = express.Router();
const CardModel = require('../model/Cardmodel');
const multer    = require('multer');
// const upload = multer({ dest: 'uploads/' });
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const uploadImg = multer({storage: storage}).single('image');


// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, './images');
//     },
//     filename: (req, file, cb) => {
     
//      cb(null, `image-${Date.now()}` + path.extname(file.originalname))
//         //path.extname get the uploaded file extension
//     }
//   });
//   const multerFilter = (req, file, cb) => {
     
//           if (!file.originalname.match(/\.(png|jpg)$/)) { 
//                // upload only png and jpg format
//              return cb(new Error('Please upload a Image'))
//            }
//          cb(null, true)
      
//   };




router.get('/',(req,res)=>{
    CardModel.get(function (err, cards) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Card retrieved successfully",
            data: cards
        });
    });


});

router.post('/card',(req,res)=>{

    var card         = new CardModel();
    card.title       = req.body.title ? req.body.title : card.title;
    card.description = req.body.description;
    card.duration    = req.body.duration;
    card.genre       = req.body.genre

    card.save(function (err) {
        res.json({
            message: 'New Card created!',
            data: card
        });
    });

})


//   exports.upload = multer({
//     storage: multerStorage,
//     fileFilter: multerFilter
//   });

  router.post('/profile', uploadImg,async(req, res, next)=> {


    console.log(req.file)



    
    // console.log(`INSERT INTO users(name, icon) VALUES ('${req.body.name}', '${req.file.filename}')`);
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  })


//   router.post('/pro', upload.single('icon'), function (req, res) {
//     // req.file is the name of your file in the form above, here 'uploaded_file'
//     // req.body will hold the text fields, if there were any 
//     console.log(req.file, req.body)
//  });


 






module.exports = router;