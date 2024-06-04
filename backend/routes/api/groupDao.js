const connection = require('../../config/db');

exports.addGroup = (req, res) => {
    const { groupNm, userId, colorTag } = req.body;
    console.log(groupNm, userId, colorTag)
    const sql = 'INSERT INTO TB_GRP(GRP_NM, USER_ID, REG_DT, COLOR_TAG) VALUES(?,?,NOW(),?)';
    connection.query(sql, [
        groupNm, userId, colorTag
    ], (err, result) => {
        if(err) throw err;

        res.send({
            success: true,
            response: result,
        });
    });
}

exports.getGroupList = (req, res) => {
    console.log(req.query)
    const { userId } = req.query;
    console.log(userId)
    const sql = 'SELECT * FROM TB_GRP GRP INNER JOIN TB_USER_GRP_REL REL ON GRP.GRP_SEQ = REL.GRP_SEQ WHERE REL.USER_ID=?';
    connection.query(sql, [
        userId
    ], (err, result) => {
        if(err) throw err;

        res.send({
            success: true,
            response: {
                groupList: result,
            }
        });
    });
}