
const connection = require('../../config/db');

exports.chkUserDuplicated = (req, res) => {
    const { userId } = req.query;
    const sql = 'SELECT COUNT(USER_ID) AS cnt FROM TB_USER WHERE USER_ID=?';
    connection.query(sql, [
        userId
    ], (err, result) =>{
        if(err) throw err;
        res.send({
            success: true,
            response: result,
        });
    });
};

exports.addUser = (req, res) => {
    const { userId, password, userNm } = req.body;
    const sql = 'INSERT INTO TB_USER VALUES (?, ?, ?, NULL, NOW())'
    connection.query(sql, [
        userId, password, userNm
    ], (err, result) => {
        if(err) throw err;

        res.send({
            success: true,
            response: result,
        });
    });
};

exports.login = (req, res) => {
    const { userId, password } = req.body;
    const sql = 'SELECT USER_ID AS userId, USER_NM AS userNm FROM TB_USER WHERE USER_ID=? AND USER_PW=?';
    connection.query(sql, [
        userId, password
    ], (err, result) => {
        if(err) throw err;

        if(result.length > 0){
            res.send({
                success: true,
                response: result[0]
            });
        }else{
            res.send({
                success: false,
                response: {
                    errorCode: 401,
                    message: '이메일 혹은 비밀번호가 일치하지 않습니다.',
                },
            });
        }
    });
}

exports.getUserListFromGroup = (grpSeq) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT USER.USER_ID AS userId, USER.USER_NM AS userNm FROM TB_USER_GRP_REL REL LEFT JOIN TB_USER USER ON REL.USER_ID = USER.USER_ID WHERE REL.GRP_SEQ=?'
        connection.query(sql, [
            grpSeq,
        ], (err, result) => {
            if(err) throw reject(err);
    
            resolve(result);
        });
    });
}