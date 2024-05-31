var express = require('express');
var router = express.Router();

const userDao = require('./userDao');

router.get('/api/user/duplicated', userDao.chkUserDuplicated);
router.post('/api/user/add', userDao.addUser);

module.exports = router;
