const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

async function checkAuth(req, res, next)
{
    const token = req.headers.authorization;
    if(!token)
    {
        return res.status(401).json({error:'NEED_TOKEN'});
    }
    const decodedToken = jwt.verify(token, 'secret_key');
    const email = decodedToken.email;

    req.body.email = email
    req.query.email = email

    try{
        const user = await User.findOne({
            where:{
                email:email
            }
        })
        if (user.token !== token)
        {
            return res.status(401).json({error:'INVALID_TOKEN'});
        }
    }catch (e) {
        console.log(e)
    }
    next();
}
async function checkAdmin(req, res, next){
    next();
}

module.exports = {checkAuth, checkAdmin};