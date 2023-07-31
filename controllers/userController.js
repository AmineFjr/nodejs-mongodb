const User = require('../models/userModel')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const ADMIN_ID = 3

async function login(req, res) {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let userFind = await User.findOne({
            where: {
                email: email
            }
        });

        if (!userFind) {
            res.status(401).json({ error: 'User not found' });
        } else {
            const result = await updateToken({ userFind, password });
            res.status(200).json(result);
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
        let isTeacher = req.body.isTeacher
        let token = "";
        let hash = await bcrypt.hash(password, 10)

        let user = new User({
            username: username,
            email: email,
            password: hash,
            isTeacher: isTeacher
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
        const token = await jwt.sign({ email: userFind.email }, 'secret_key');
        userFind.token = token
        const userSave = await userFind.save()

        const isAdmin = userFind.groupId === ADMIN_ID;
        return { email: userFind.email, token, isAdmin, error: false };
    }
    else {
        return { error: true };
    }
}

async function logout(req, res) {
    const email = req.body.email;
    const userFind = await User.findOne({
        where: {
            email: email
        }
    })
    userFind.token = null
    const userSave = await userFind.save()
    res.status(200).json({ error: false });
}


module.exports = { login, create };
