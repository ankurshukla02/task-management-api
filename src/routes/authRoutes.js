const router = require('express').Router();
const authController = require('../controllers/authController');
const validate = require('../middlewares/validationMiddleware');
const { loginSchema } = require('../validators/authValidation');

router.post('/login', validate(loginSchema), authController.login);

module.exports = router;
