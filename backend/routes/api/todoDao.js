const connection = require('../../config/db');

exports.getTodoList = (req, res) => {
    const { grpSeq } = req.query;
    console.log(grpSeq);
    const sql = 'SELECT TODO.GRP_SEQ AS grpSeq, TODO.REG_DT AS regDt, TODO.TODO_COLOR AS bgColor, TODO.TODO_ISCOMP AS isComp, TODO.TODO_SEQ AS `key`, TODO.TODO_TEXT AS text, TODO.CHECKOUT_LINE AS chkoutLine, TODO.USER_ID AS userId, TODO.CATEGORY_SEQ AS ctgSeq, CTG.CATEGORY_NM AS ctgNm, CTG.CATEGORY_COLOR AS ctgColor FROM tb_todo TODO LEFT JOIN tb_category CTG ON TODO.CATEGORY_SEQ = CTG.CATEGORY_SEQ WHERE TODO.GRP_SEQ=? ORDER BY TODO.REG_DT DESC';
    connection.query(sql, [
        grpSeq
    ], (err, result) => {
        if(err) throw err;

        res.send({
            success: true,
            todoList: result, 
        });
    });
}

exports.addTodo = (req, res) => {
    const { userId, grpSeq } = req.body;
    console.log(userId,grpSeq)
    const sql = 'INSERT INTO TB_TODO (USER_ID, GRP_SEQ, REG_DT) VALUES (?, ?, NOW())';
    connection.query(sql, [
        userId, grpSeq
    ],  async (err, result) => {
        if(err) throw err;

        if(result.affectedRows > 0){
            const todoSeq = await getLastInsertedTodoSeq(userId, grpSeq);
            const todoInfo = await getTodoDeatil(todoSeq);
            res.send({
                success: true,
                todoInfo: todoInfo,
            })
        }else{
            res.send({
                success: false,
                message: '새로운 TODO를 추가할 수 없습니다.',
            });
        }
    });
}

function getTodoDeatil(todoSeq){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT GRP_SEQ AS grpSeq, REG_DT AS regDt, TODO_COLOR AS bgColor, TODO_ISCOMP AS isComp, TODO_SEQ AS `key`, TODO_TEXT AS text, CHECKOUT_LINE AS chkoutLine, CATEGORY_SEQ AS ctgSeq, USER_ID AS userId FROM TB_TODO WHERE TODO_SEQ=?';
        connection.query(sql, [
            todoSeq
        ], (err, result) => {
            if(err) return reject(err);

            resolve(result[0]);
        });
    });
}

function getLastInsertedTodoSeq(userId, grpSeq){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT TODO_SEQ FROM tb_todo WHERE USER_ID=? AND GRP_SEQ=? ORDER BY REG_DT DESC LIMIT 1';
        connection.query(sql, [
            userId, grpSeq
        ], async (err, result) => {
            if(err) return reject(err);
    
            resolve(result[0].TODO_SEQ);
        });
    });
}

exports.removeTodoItem = (req, res) => {
    const { todoSeq } = req.body;
    const sql = 'DELETE FROM TB_TODO WHERE TODO_SEQ=?';
    connection.query(sql, [
        todoSeq
    ], (err, result) => {
        if(err) throw err;

        if(result.affectedRows > 0){
            res.send({
                success: true,
                message: 'TODO가 삭제되었습니다.',
            }); 
        }else{
            res.send({
                success: false,
                message: 'TODO를 삭제할 수 없습니다.',
            }); 
        }
    });
};

exports.setTodoItem = (req, res) => {
    const { todoSeq, todoText } = req.body;
    const sql = 'UPDATE TB_TODO SET TODO_TEXT=? WHERE TODO_SEQ=?';
    connection.query(sql, [
        todoText, todoSeq
    ], (err, result) => {
        if(err) throw err;

        if(result.affectedRows > 0){
            res.send({
                success: true,
                message: '성공',
            });
        }else{
            res.send({
                success: false,
                message: '실패',
            });
        }
    })
};

exports.removeAllTodoItem = (grpSeq) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM TB_TODO WHERE GRP_SEQ=?';
        connection.query(sql, [
            grpSeq
        ], (err, result) => {
            if(err) throw err;
    
            resolve(result.affectedRows > 0);
        });
    });
};