const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/userModel');

exports.createAccount = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const interests = req.body.interests;

    const checkUser = await User.findOne({ $or: [{ username: username }, { email: email }] });
    if (checkUser) return res.status(401).json({ 'message': 'please try different userDetails' });
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
        username: username,
        email: email,
        password: hashedPassword,
        interests: interests,
    })
    const savedUser = await user.save();
    const token = jwt.sign({
        id: savedUser.id,
    }, 'code');
    res.status(200).cookie('userToken', token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.status(201).json({ token: token })
}

exports.verifyUser = async (req, res, next) => {
    const userToken = req.cookies;
    // console.log('userToken' + userToken);
    console.log(req);
    const token = req.body.token;
    if (!token) return res.status(400).json({ message: 'token not found' });
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'code');
        if (!decodedToken) return res.status(400).json({ message: 'invalid user' });
    }
    catch (err) {
        console.log(err);
    }
    req.userId = decodedToken.id;
    console.log(req.userId);
    next();
}

exports.accountDetails = async (req, res, next) => {
    const userDetails = await User.findOne({ _id: req.userId }).populate('posts')
    res.status(200).json({ user: userDetails });
}

exports.loginUser = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    const findUser = await User.findOne({ username: username });
    if (!findUser) return res.status(404).json({ message: 'user not found' });
    const hashedPassword = await bcrypt.compare(password, findUser.password);
    console.log(hashedPassword);
    if (!hashedPassword) return res.status(404).json({ message: 'password or username incorrect' });
    const token = jwt.sign(
        {
            id: findUser.id
        },
        'code');

    return res.status(200).json({ message: 'success', token: token })
}