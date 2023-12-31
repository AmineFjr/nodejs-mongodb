const User = require('../models/userModel')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const ADMIN_ID = 3

async function login(req, res) {
    try {
        let userFind = await User.findOne({ email: req.body.email });
        if (userFind) {
            let password = req.body.password;
            let result = await updateToken({ userFind, password });
            res.status(200).json(result);
        } else {
            res.status(401).json({ error: 'User not found' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


async function create(req, res) {
    try {
        let email = req.body.email
        let password = req.body.password
        let username = req.body.username
        let token = "";
        let hash = await bcrypt.hash(password, 10)

        let user = new User({
            username: username,
            email: email,
            password: hash,
        });

        let userFind = await User.findOne({
            where: {
                email: email
            }
        })

        if (userFind) {
            res.status(401).json({ error: 'user already exist' });
        } else {
            let userSave = await user.save(user)
            res.status(200).json(userSave);
        }

    } catch (error) {
        if (error.code === 11000) {
            res.status(401).json({ error: 'Email already exists' });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

async function updateToken({ userFind, password }) {
    let isValid = await bcrypt.compare(password, userFind.password)
    if (isValid) {
        let token = await jwt.sign({ email: userFind.email }, 'secret_key');
        userFind.token = token
        await userFind.save()
        let isAdmin = false;
        return { email: userFind.email, token, isAdmin, id: userFind._id };
    }
    else {
        return { error: "Check Your Password, something is wrong" };
    }
}

async function logout(req, res) {
    let userFind = await User.findOne({ email: req.body.email });
    userFind.token = ""
    await userFind.save()
    res.status(200).json({ error: 'You are logout, now!' });
}


module.exports = { login, create, logout };
