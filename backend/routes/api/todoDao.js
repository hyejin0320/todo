const connection = require('../../config/db');

exports.getTodoList = (req, res) => {
    const { grpSeq } = req.query;
    const sql = 'SELECT * FROM TB_TODO WHERE GRP_SEQ=?';
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