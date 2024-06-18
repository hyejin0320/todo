const jwt = require('jsonwebtoken');
const primaryKey = '123';

exports.createToken = (userId) => {
    const token = jwt.sign({userId: userId}, primaryKey, {
        expiresIn: '1s',
    });
    console.log('token===================')
    console.log(token);
}

exports.verifyToken = (token) => {
    const verified = jwt.verify(token);
    
    console.log('token verify===================')
    console.log(verified)
}