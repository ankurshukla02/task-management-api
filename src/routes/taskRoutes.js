const router = require('express').Router();
const taskController = require('../controllers/taskController');
const auth = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validationMiddleware');
const taskValidation = require('../validators/taskValidation');
const role = require('../middlewares/roleMiddleware');

router.use(auth);

// CREATE
router.post(
  '/',
  role('ADMIN'),
  validate(taskValidation.createTaskSchema),
  taskController.create,
);

// LIST
router.get(
  '/',
  validate(taskValidation.listTaskSchema, 'query'),
  taskController.list,
);

// GET ONE
router.get(
  '/:id',
  validate(taskValidation.taskIdParamSchema, 'params'),
  taskController.getById,
);

// UPDATE
router.put(
  '/:id',
  validate(taskValidation.updateTaskSchema),
  taskController.update,
);

// DELETE
router.delete(
  '/:id',
  role('ADMIN'),
  validate(taskValidation.taskIdParamSchema, 'params'),
  taskController.remove,
);

module.exports = router;
