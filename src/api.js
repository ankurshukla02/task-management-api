const router = require('express').Router();
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes.js');
const responseHandle = require('./helpers/responseHandle');
const responseCode = require('./helpers/responseCode.js');

// check service health
router.get('/', function (req, res) {
  return responseHandle.responseWithoutData(
    res,
    responseCode.OK,
    'Welcome to Task Management API!',
  );
});

router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;
