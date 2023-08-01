const Posts = require('../models/posts');

// Requête pour l'ajout d'une nouvelle posts
exports.creatPosts = (req, res) => {
    console.log(req.body);
    const postsObject = req.body;
    console.log(postsObject);
    const posts = new Posts({
        ...postsObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.body.imageUrl}`
    });
    posts.save()
        .then(() => res.status(201).json({ message: 'Posts enregistrée !' }))
        .catch(error => res.status(400).json(error))

};

// Requête pour récupérer toutes les posts depuis MongoDb
exports.getAllPosts = (req, res) => {
    Posts.find()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json(error))

};

// Réquête pour récuperer une posts spécifique grâce à son id
exports.getOnePosts = (req, res) => {
    Posts.findOne({ _id: req.params.id })
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch((error) => res.status(500).json({ error }));
}

