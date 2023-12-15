const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

//middleware function to handle jwt authorization
const requireAuth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({
            status: 'FAILED',
            message: 'Unauthorized'
        })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.user = decode.user;
        next();

    }
    catch (error) {
        console.log(error.message);
        return res.status(401).json({
            status: 'FAILED',
            message: 'Unauthorized'
        })
    }
}

module.exports = requireAuth;