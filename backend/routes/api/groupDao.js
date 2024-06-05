const connection = require('../../config/db');

exports.addGroup = (req, res) => {
    const { grpNm, userId, grpColor } = req.body;
    const sql = 'INSERT INTO TB_GRP(GRP_NM, USER_ID, REG_DT, COLOR_TAG) VALUES(?,?,NOW(),?);';
    connection.query(sql, [
        grpNm, userId, grpColor
    ], (err, result) => {
        if(err) throw err;

        if(result.affectedRows > 0){
            getLastInsertedGroupSeq(req, res);
        }else{
            res.send({
                success: false,
                response: '그룹을 추가할 수 없습니다.',
            })
        }
    });
}

function getLastInsertedGroupSeq(req, res){
    const { userId } = req.body;
    const sql = 'SELECT GRP_SEQ FROM TB_GRP WHERE USER_ID=? ORDER BY REG_DT DESC LIMIT 1';
    connection.query(sql, [
        userId
    ], (err, result) => {
        if(err) throw err;

        const userGrpRelData = {
            userId: userId,
            grpSeq: result[0].GRP_SEQ,
        };
        if(insertUserGrpRel(userGrpRelData, res)){
            res.send({
                success: true,
                response: result[0].GRP_SEQ,
            });
        }else{
            res.send({
                success: false,
                response: '그룹을 추가할 수 없습니다.',
            });
        }
    });
}

function insertUserGrpRel(req, res){
    const { userId, grpSeq } = req;
    const sql = 'INSERT INTO TB_USER_GRP_REL(USER_ID, GRP_SEQ) VALUES(?,?)'
    connection.query(sql, [
        userId, grpSeq
    ], (err, result) => {
        if(err) throw err;

        return result.affectedRows > 0;
    });
}

exports.getGroupList = (req, res) => {
    console.log(req.query)
    const { userId } = req.query;
    console.log(userId)
    const sql = 'SELECT GRP.GRP_SEQ AS `key`, GRP.GRP_ICON AS grpIcon, GRP.GRP_NM AS grpNm, GRP.COLOR_TAG AS grpColor,  "false" AS selected FROM TB_GRP GRP INNER JOIN TB_USER_GRP_REL REL ON GRP.GRP_SEQ = REL.GRP_SEQ WHERE REL.USER_ID=?';
    connection.query(sql, [
        userId
    ], (err, result) => {
        if(err) throw err;

        console.log(result);
        res.send({
            success: true,
            response: {
                groupList: result,
            }
        });
    });
}