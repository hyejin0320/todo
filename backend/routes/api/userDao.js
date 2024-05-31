const express = require('express');
const router = express.Router();

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
    console.log(req);
    const { userId, password, userName } = req.body;
    console.log(req.query);
    console.log(userId, password, userName);
    const sql = 'INSERT INTO TB_USER VALUES (?, ?, ?, NULL, NOW())'
    connection.query(sql, [
        userId, password, userName
    ], (err, result) => {
        if(err) throw err;

        res.send({
            success: true,
            response: result,
        });
    });
};