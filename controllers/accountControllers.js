const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../util/database');
const User = require('../models/user');


exports.signup = async (req, res) => {
    try {
        const { name, emailId, password } = req.body;
        // console.log(name, emailId, password);

        if (!name || !emailId || !password) {
            return res.status(400).json({ message: 'User name, email id, password should not be empty' });
        }

        const oldUser = await User.findOne({ where: { emailId } });
        if (oldUser) {
            console.log('user already exists');
            return res.status(400).json({ message: 'user already exists' })
        }

        const saltRoutes = 10;
        bcrypt.hash(password, saltRoutes, async (err, hash) => {
            if (err) {
                thrownew.error('error in bcrypt');
            }
            await User.create({ name, emailId, password: hash })
            res.status(200).json({ message: 'user signup sucessfull' });
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

function generateToken(id) {
    return jwt.sign({ userId: id }, 'secretKey');
}

exports.login = async (req, res) => {
    const { emailId, password } = req.body;

    try {
        const user = await User.findOne({ where: { emailId } });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.emailId },
            'your_secret_key',
            { expiresIn: '1h' }
        );

        return res.status(200).json({ token, message: 'Logged in successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
};