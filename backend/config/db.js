const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '111111',
    database: 'todo',
});

connection.connect((err) => {
    if(err){
        console.error('connection errror', err);
        return;
    }
    console.log('connection successs');
});



module.exports = connection; //모듈 등록