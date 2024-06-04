var express = require('express');
var router = express.Router();

const userDao = require('./userDao');
const groupDao = require('./groupDao');

router.get('/api/user/duplicated', userDao.chkUserDuplicated);
router.post('/api/user/add', userDao.addUser);
router.post('/api/login', userDao.login);

router.get('/api/group/list', groupDao.getGroupList);
router.post('/api/group/add', groupDao.addGroup);

module.exports = router;
