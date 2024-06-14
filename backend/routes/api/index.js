var express = require('express');
var router = express.Router();

const userDao = require('./userDao');
const groupDao = require('./groupDao');
const todoDao = require('./todoDao');

router.get('/api/user/duplicated', userDao.chkUserDuplicated);
router.post('/api/user/add', userDao.addUser);
router.post('/api/login', userDao.login);

router.get('/api/group/list', groupDao.getGroupList);
router.post('/api/group/add', groupDao.addGroup);
router.get('/api/group/detail', groupDao.getGroupDetail);
router.post('/api/group/modify', groupDao.setGroupDetail);
router.post('/api/group/delete', groupDao.removeGroup);
router.get('/api/group/category/list', groupDao.getCategoryList);
router.post('/api/group/category/add', groupDao.addCategory);
router.post('/api/group/category/modify', groupDao.setCategoryDetail);
router.post('/api/group/category/delete', groupDao.removeCategory);

router.get('/api/todo/list', todoDao.getTodoList);
router.post('/api/todo/add', todoDao.addTodo);
router.post('/api/todo/delete', todoDao.removeTodoItem);
router.post('/api/todo/modify', todoDao.setTodoItem);

module.exports = router;
