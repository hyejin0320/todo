const connection = require('../../config/db');
const todoDao = require('./todoDao');
const userDao = require('./userDao');
const jwt = require('./../../utils/jwt');

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
                response: '1:그룹을 추가할 수 없습니다.',
            })
        }
    });
}

function getLastInsertedGroupSeq(req, res){
    const { userId } = req.body;
    const sql = 'SELECT GRP_SEQ FROM TB_GRP WHERE USER_ID=? ORDER BY REG_DT DESC LIMIT 1';
    connection.query(sql, [
        userId
    ], async (err, result) => {
        if(err) throw err;

        const userGrpRelData = {
            userId: userId,
            grpSeq: result[0].GRP_SEQ,
        };

        if(await insertUserGrpRel(userGrpRelData)){
            res.send({
                success: true,
                response: result[0].GRP_SEQ,
            });
        }else{
            res.send({
                success: false,
                response: '2:그룹을 추가할 수 없습니다.',
            });
        }
    });
}

function insertUserGrpRel(req){
    return new Promise((resolve, reject) => {
        const { userId, grpSeq } = req;
        const sql = 'INSERT INTO TB_USER_GRP_REL(USER_ID, GRP_SEQ) VALUES(?,?)'
        connection.query(sql, [
            userId, grpSeq
        ], (err, result) => {
            if(err) return reject(err);
    
            resolve(result.affectedRows > 0);
        });
    });
}

exports.getGroupList = (req, res) => {
    const { userId } = req.query;
    const sql = 'SELECT GRP.GRP_SEQ AS `key`, GRP.GRP_ICON AS grpIcon, GRP.GRP_NM AS grpNm, GRP.COLOR_TAG AS grpColor,  "false" AS selected FROM TB_GRP GRP INNER JOIN TB_USER_GRP_REL REL ON GRP.GRP_SEQ = REL.GRP_SEQ WHERE REL.USER_ID=?';
    connection.query(sql, [
        userId
    ], (err, result) => {
        if(err) throw err;

        //임시
        jwt.createToken(userId);

        console.log(result);
        res.send({
            success: true,
            response: {
                groupList: result,
            }
        });
    });
}

exports.getGroupDetail = (req, res) => {
    const { grpSeq } = req.query;
    const sql = 'SELECT * FROM TB_GRP WHERE GRP_SEQ=?';

    connection.query(sql, [
        grpSeq
    ], (err, result) => {
        if(err) throw err;

        const target = result[0];

        res.send({
            success: true,
            grpSeq: target.GRP_SEQ,
            grpNm: target.GRP_NM,
            regId: target.USER_ID,
            grpColor: target.COLOR_TAG,
            grpIcon: target.GRP_ICON,
            regDt: target.REG_DT,
        });
    });
}

exports.setGroupDetail = (req, res) => {
    const { grpSeq, grpNm, grpColor } = req.body;
    const sql = 'UPDATE TB_GRP SET GRP_NM=?, COLOR_TAG=? WHERE GRP_SEQ=?';
    console.log(grpColor)

    connection.query(sql, [
        grpNm, grpColor, grpSeq
    ], (err, result) => {
        if(err) throw err;

        if(result.affectedRows > 0){
            res.send({
                success: true,
            })
        }else{
            res.send({
                success: false,
                response: '그룹 내용을 변경할 수 없습니다.',
            })
        }
    });
}

exports.removeGroup = async (req, res) => {
    const { grpSeq } = req.body;

    if(await getGroupLength(grpSeq)){
        const sql = 'DELETE FROM TB_GRP WHERE GRP_SEQ=?';
        connection.query(sql, [
            grpSeq
        ], async (err, result) => {
            if(err) throw err;

            if(result.affectedRows > 0 && await removeUserGrpRel(grpSeq) && await todoDao.removeAllTodoItem(grpSeq)){
                res.send({
                    success: true,
                    message: '그룹을 삭제했습니다.',
                 });
            }else{
                res.send({
                   success: false,
                   message: '그룹을 삭제할 수 없습니다.',
                });
            }
        });
    }else{
        res.send({
            success: false,
            message: '마지막 그룹은 지울 수 없습니다.',
        });
    }
};

function getGroupLength(grpSeq){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT COUNT(GRP_SEQ) AS CNT FROM TB_GRP WHERE GRP_SEQ != ?';
        connection.query(sql, [
            grpSeq
        ], (err, result) => {
            if(err) return reject(err);
            resolve(result[0].CNT > 1);
        });
    });
};

function removeUserGrpRel(grpSeq){
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM TB_USER_GRP_REL WHERE GRP_SEQ=?'
        connection.query(sql, [
            grpSeq
        ], (err, result) => {
            if(err) return reject(err);
    
            resolve(result.affectedRows > 0);
        });
    });
}

exports.getCategoryList = (req, res) => {
    const { grpSeq } = req.query;
    const sql ='SELECT CATEGORY_SEQ AS `key`, CATEGORY_NM AS ctgNm, CATEGORY_COLOR AS ctgColor, REG_DT AS regDt, USER_ID AS userId, GRP_SEQ AS grpSeq FROM TB_CATEGORY WHERE GRP_SEQ=?';
    connection.query(sql, [
        grpSeq
    ], (err, result) => {
        if(err) throw err;

        res.send({
            success: true,
            ctgList: result,
        });
    });
}

exports.addCategory = (req, res) => {
    const { grpSeq, userId } = req.body;
    console.log(grpSeq, userId)
    const sql = 'INSERT INTO TB_CATEGORY(GRP_SEQ, USER_ID, REG_DT) VALUES(?,?,NOW())';
    connection.query(sql, [
        grpSeq, userId
    ], (err, result) => {
        if(err) throw err;

        if(result.affectedRows){
            getLastInsertedCategorySeq(req, res);
        }else{
            res.send({
                success: false,
                message: '카테고리를 추가할 수 없습니다.',
            });
        }
    });
}

function getLastInsertedCategorySeq(req, res){
    const { userId } = req.body;
    const sql = 'SELECT CATEGORY_SEQ FROM TB_CATEGORY WHERE USER_ID=? ORDER BY REG_DT DESC LIMIT 1';
    connection.query(sql, [
        userId
    ], async (err, result) => {
        if(err) throw err;

        console.log(result)
        res.send({
            success: true,
            response: result[0].CATEGORY_SEQ,
        });
    });
}

exports.setCategoryDetail = (req, res) => {
    const { ctgSeq, ctgNm } = req.body;
    const sql = 'UPDATE TB_CATEGORY SET CATEGORY_NM=? WHERE CATEGORY_SEQ=?';
    connection.query(sql, [
        ctgNm, ctgSeq
    ], (err, result) => {
        if(err) throw err;

        if(result.affectedRows > 0){
            res.send({
                success: true,
                ctgInfo: {
                    ctgSeq: ctgSeq,
                    ctgNm: ctgNm,
                } 
            })
        }else{
            res.send({
                success: false,
                response: '카테고리 명을 변경할 수 없습니다.',
            })
        }
    });
}

exports.removeCategory = (req, res) => {
    const { ctgSeq } = req.body;
    const sql = 'DELETE FROM TB_CATEGORY WHERE CATEGORY_SEQ=?';

    connection.query(sql, [
        ctgSeq,
    ], async (err, result) => {
        if(err) throw err;
        let isRemoveTodo = true;
        if(await todoDao.getTodoCountRelatedCategory(ctgSeq) > 0){
            isRemoveTodo = await todoDao.removeAllTodoRelatedCategory(ctgSeq)
        }
        console.log(isRemoveTodo)

        if(result.affectedRows > 0 && isRemoveTodo){
            res.send({
                success: true,
                ctgSeq: ctgSeq,
            });
        }else{
            res.send({
                success: false,
                message: '카테고리를 삭제할 수 없습니다.',
            });
        }
    })
}

exports.getUserListFromGroup = async (req, res) => {
    const { grpSeq } = req.query;

    const userList = await userDao.getUserListFromGroup(grpSeq);
    
    if(userList.length > 0){
        res.send({
            success: true,
            userList: userList,
        });
    }else{
        res.send({
            success: false,
            message: '맴버 목록을 불러올 수 없습니다.',
        });
    }
}