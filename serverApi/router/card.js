const express = require('express');
const router  = express.Router();


const cardController = require('../controller/cardController');

router.post("/card", cardController.uploadImg,cardController.newCard);
router.get('/card', cardController.getAllCard);
// router.post('/card', cardController.newCard);
router.delete('/card', cardController.deleteAllCard);

router.get('/card/:title', cardController.getOneCard);
router.patch('/card/:title', cardController.newComment);
router.delete('/card/:title', cardController.deleteOneCard);

module.exports = router;