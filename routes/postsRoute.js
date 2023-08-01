const express = require('express');

const postsCtrl = require('../controllers/postsController');
const router = express.Router();
const auth = require('../middlewares/auth');

// Les différetes routes de nos requêtes

router.get('/', postsCtrl.getAllPosts);
router.post('/', auth , postsCtrl.creatPosts);
router.get('/:id', postsCtrl.getOnePosts);

router.put('/:id', auth ,  postsCtrl.modifyPosts);

router.delete('/:id' , postsCtrl.deletePosts);

router.post('/:id/like', postsCtrl.likePosts);


module.exports = router;