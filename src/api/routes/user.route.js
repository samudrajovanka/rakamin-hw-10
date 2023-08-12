const router = require('express').Router();

const UserController = require('../controllers/user.controller');

router.post('/', UserController.create);
router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.put('/:id', UserController.updateById);
router.delete('/:id', UserController.deleteById);

module.exports = router;
