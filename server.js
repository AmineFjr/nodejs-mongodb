const express = require('express')
const userRoute = require('./routes/userRoute')
const postsRoutes = require('./routes/postsRoute')
const cors = require('cors')
const config = require('./config')
const app = express();
const formData = require('express-form-data')
const postsRoutes = require('./routes/postsRoute')
const mongoose = require('mongoose')

require('dotenv').config()

app.use(express.json())
app.use(cors(config.corsOptions))
app.use(formData.parse())

app.use('/api/posts', postsRoutes);
app.use('/api', userRoute)

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.w3ata7b.mongodb.net/${process.env.BDD}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connexion réussie !');
    app.listen(process.env.PORT || 3000);
}).catch((e) => {
    console.log('Connexion échouée !: ', e)
})

