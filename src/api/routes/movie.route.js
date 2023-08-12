const router = require('express').Router();

const MovieController = require('../controllers/movie.controller');
const { uploadFile } = require('../middlewares');

router.get('/', MovieController.getAll);
router.get('/:id', MovieController.getById);
router.post('/', uploadFile('image')('single', ['image']), MovieController.create);
router.put('/:id', uploadFile('image')('single', ['image']), MovieController.updateById);
router.delete('/:id', MovieController.deleteById);

module.exports = router;
