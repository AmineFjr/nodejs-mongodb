// Importation du modèle Mongoose pour les posts
const Posts = require('../models/posts');

// Contrôleur pour créer une nouvelle publication
exports.creatPosts = (req, res) => {
    // Log du corps de la requête pour le débogage
    console.log(req.body);
    // Création d'un objet posts avec les données de la requête
    const postsObject = req.body;
    const posts = new Posts({
        ...postsObject,
    });
    // Sauvegarde de l'objet posts dans la base de données
    posts.save()
        .then(() => res.status(201).json({ message: 'Posts enregistrée !' })) // En cas de succès, envoi d'un statut 201 avec un message
        .catch(error => {
            console.error(error); // En cas d'erreur, log de l'erreur et envoi d'un statut 400 avec l'erreur
            res.status(400).json(error);
        })
};

// Contrôleur pour obtenir toutes les publications
exports.getAllPosts = (req, res) => {
    Posts.find() // Requête pour obtenir toutes les publications
        .then(posts => res.status(200).json(posts)) // En cas de succès, envoi d'un statut 200 avec les publications
        .catch(error => res.status(400).json(error)) // En cas d'erreur, envoi d'un statut 400 avec l'erreur
};

// Contrôleur pour obtenir une publication spécifique par ID
exports.getOnePosts = (req, res) => {
    Posts.findOne({ _id: req.params.id }) // Requête pour obtenir une publication spécifique
        .then(posts => {
            res.status(200).json(posts) // En cas de succès, envoi d'un statut 200 avec la publication
        })
        .catch((error) => res.status(500).json({ error })); // En cas d'erreur, envoi d'un statut 500 avec l'erreur
}

// Contrôleur pour modifier une publication
exports.modifyPosts = (req, res) => {
    const postsObject = req.body ;
    Posts.updateOne({ _id: req.params.id }, {...postsObject, _id: req.params.id }) // Mise à jour de la publication
        .then(() => res.status(200).json({ message: 'Objet modifié !' })) // En cas de succès, envoi d'un statut 200 avec un message
        .catch(error => res.status(400).json({ error })); // En cas d'erreur, envoi d'un statut 400 avec l'erreur
};

// Contrôleur pour supprimer une publication
exports.deletePosts = (req, res) => {
    Posts.findOne({ _id: req.params.id }) // Recherche de la publication
        .then(posts => {
            Posts.deleteOne({ _id: req.params.id }) // Suppression de la publication
                .then(() => res.status(200).json({ message: 'Objet supprimé !' })) // En cas de succès, envoi d'un statut 200 avec un message
                .catch(error => res.status(400).json({ error })); // En cas d'erreur, envoi d'un statut 400 avec l'erreur
        })
        .catch(error => res.status(500).json({ error })); // En cas d'erreur lors de la recherche, envoi d'un statut 500 avec l'erreur
};

// Contrôleur pour aimer ou ne pas aimer une publication
exports.likePosts = (req, res) => {
    // Si l'utilisateur aime la publication
    if (req.body.like === 1) {
        // Augmenter le nombre de likes et ajouter l'utilisateur à la liste des utilisateurs qui aiment
        Posts.findOneAndUpdate({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } })
            .then(() => res.status(200).json({ message: "Like ajouté !" })) // En cas de succès, envoi d'un statut 200 avec un message
            .catch((error) => res.status(400).json({ error })); // En cas d'erreur, envoi d'un statut 400 avec l'erreur

        // Si l'utilisateur n'aime pas la publication
    } else if (req.body.like === -1) {
        // Augmenter le nombre de dislikes et ajouter l'utilisateur à la liste des utilisateurs qui n'aiment pas
        Posts.findOneAndUpdate({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } })
            .then(() => res.status(200).json({ message: "Dislike ajouté !" })) // En cas de succès, envoi d'un statut 200 avec un message
            .catch((error) => res.status(400).json({ error })); // En cas d'erreur, envoi d'un statut 400 avec l'erreur

        // Si l'utilisateur annule son choix
    } else {
        Posts.findOne({ _id: req.params.id }).then((resultat) => {
            // Si l'utilisateur avait précédemment aimé la publication
            if (resultat.usersLiked.includes(req.body.userId)) {
                // Diminuer le nombre de likes et retirer l'utilisateur de la liste des utilisateurs qui aiment
                Posts.findOneAndUpdate({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } })
                    .then(() => res.status(200).json({ message: "like retiré !" })) // En cas de succès, envoi d'un statut 200 avec un message
                    .catch((error) => res.status(400).json({ error })); // En cas d'erreur, envoi d'un statut 400 avec l'erreur
                // Si l'utilisateur avait précédemment n'aimait pas la publication
            } else if (resultat.usersDisliked.includes(req.body.userId)) {
                // Diminuer le nombre de dislikes et retirer l'utilisateur de la liste des utilisateurs qui n'aiment pas
                Posts.findOneAndUpdate({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } })
                    .then(() => res.status(200).json({ message: "dislike retiré !" })) // En cas de succès, envoi d'un statut 200 avec un message
                    .catch((error) => res.status(400).json({ error })); // En cas d'erreur, envoi d'un statut 400 avec l'erreur
            }
        });
    }
};
