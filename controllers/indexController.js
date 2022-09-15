const userModel = require('../models/userSchema');

exports.homepage = function (req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
}


exports.signup = async (req, res) => {
   try {
    const { username, email, password } = req.body;
    const newUser = new userModel({ username, email, password });
    const CreatedUser = await newUser.save();
    res.status(200).json(CreatedUser);  
   } catch (error) {
         res.status(500).json(error.message);
   }
}

exports.signin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username }).select('+password').exec();
        const result = await user.comparePassword(password);
        res.status(200).json(result);
        } catch (error) {
        res.status(500).json(error.message);
    }
}

exports.createuser = (req, res) => {
    userModel.create({
        name: req.body.name,
        age: req.body.age
    }).then((user) => {
        res.json({ user });
    })
}
