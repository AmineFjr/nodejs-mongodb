const express = require('express')
const userRoute = require('./routes/userRoute')
const cors = require('cors')
const config = require('./config')
const app = express();
const mongodb = require("./db.js")
const dotEnv = require('dotenv').config()
const formData = require('express-form-data')
const User = require("./models/userModel")
const mongoose = require('mongoose')

app.use(express.json())
app.use(cors(config.corsOptions))
app.use(formData.parse())

app.use('/api', userRoute)

mongoose.connect(process.env.BDD, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((err) => console.log('Unable to connect to the database:', err)
);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT} ...`));