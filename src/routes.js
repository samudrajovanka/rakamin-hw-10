const router = require('express').Router();

const movieRoute = require('./api/routes/movie.route');
const userRoute = require('./api/routes/user.route');

/**
 * api routes
 */
router.use('/api/movies', movieRoute);
router.use('/api/users', userRoute);

module.exports = router;
