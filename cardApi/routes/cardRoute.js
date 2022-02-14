const express = require('express');
const router  = express.Router();


const cardController = require('../controllers/card');


router.get("/card",cardController.getAllCard);
router.post('/card',cardController.uploadImg,cardController.newCard);

router.get("/card/:title",cardController.getOneCard);
router.post("/card/:title",cardController.uploadImg,cardController.newComment);
router.delete("/card/:title",cardController.deleteOneCard);








module.exports=router;