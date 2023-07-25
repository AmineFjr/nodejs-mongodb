const User = require('../models/userModel')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const ADMIN_ID = 3

async function login(req, res)
{
    const email = req.body.email;
    const password = req.body.password;
    const userFind = await User.findOne({
        where: {
            email: email
        }
    })
    if (!userFind){
        const result = await createUser({email, password})
        res.status(200).json(result);
    } else {
        const result = await updateToken({userFind, password})
        res.status(200).json(result);
    }
}

async function createUser({email, password})
{
    const hash = await bcrypt.hash(password,10)
    let user = new User({
        email: email,
        password: hash,
    });
    const token = await jwt.sign({email: user.email}, 'secret_key');
    user.token = token
    const userSave = await user.save(user)
    if(!userSave){
        return {error: true};
    }
    return {email: userSave.email, token, error:false};
}

async function updateToken({userFind, password})
{
    let isValid = await bcrypt.compare(password, userFind.password)
    if(isValid) {
        const token = await jwt.sign({email: userFind.email}, 'secret_key');
        userFind.token = token
        const userSave = await userFind.save()

        const isAdmin = userFind.groupId === ADMIN_ID;
        return {email: userFind.email, token,isAdmin,error:false};
    }
    else {
        return {error: true};
    }
}

async function logout(req,res){
    const email = req.body.email;
    const userFind = await User.findOne({
        where: {
            email: email
        }
    })
    userFind.token = null
    const userSave = await userFind.save()
    res.status(200).json({error:false});
}


module.exports = {login, logout, createUser};
