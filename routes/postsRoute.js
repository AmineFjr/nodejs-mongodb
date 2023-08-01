const express = require('express');

const postsCtrl = require('../controllers/postsController');
const router = express.Router();


// Les différetes routes de nos requêtes

router.get('/', postsCtrl.getAllPosts);
router.post('/', postsCtrl.creatPosts);
router.get('/:id', postsCtrl.getOnePosts);


module.exports = router;