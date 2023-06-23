const dotEnv = require('dotenv').config()

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
const typeFile = {
    file:['application/pdf'],
    image: ['image/jpeg','image/png']
}

module.exports = {corsOptions, typeFile};