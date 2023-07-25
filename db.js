const mongoose = require('mongoose');
mongoose.connect(process.env.BDD,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((err) => console.log(err)
);