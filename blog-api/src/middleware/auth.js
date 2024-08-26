const jwt = require('jsonwebtoken');
const JWT_SECRET = 'YOUR_JWT_SECRET';
const users = require('../db.json').users;

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Vui lòng đăng nhập để tiếp tục' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Bạn không có quyền truy cập' });
        }
        const userInDB = users.find(u => u.id === user.id);
        req.user = {
            ...user,
            role: userInDB ? userInDB.role : 'user'
        };
        next();
    });
};

module.exports = authenticateJWT;