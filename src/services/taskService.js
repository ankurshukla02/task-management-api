const { Task, User } = require('../models');
const responseMessage = require('../helpers/responseMessage');
const responseCode = require('../helpers/responseCode');

/**
 * Checks if the user has a 'USER' role. This is used to determine access permissions for tasks.
 * @param {Object} user 
 * @returns 
 */
const isUser = (user) => user?.role === 'USER';

/**
 * Filters task data based on user role and operation type (create or update). This helps prevent mass-assignment vulnerabilities by only allowing certain fields to be set or updated by users. Admins can set all fields, while regular users can only update status and description of their own tasks.
 * @param {Object} user 
 * @param {Object} data 
 * @param {Object} param2 
 * @returns 
 */
const getAllowedTaskData = (user, data, { forUpdate = false } = {}) => {
  // Prevent mass-assignment by whitelisting allowed fields.
  // Users can only update their own task status and leave comments via description.
  if (forUpdate && isUser(user)) {
    const allowedData = {};
    if (data.status !== undefined) allowedData.status = data.status;
    if (data.description !== undefined) allowedData.description = data.description;
    return allowedData;
  }

  return {
    title: data.title,
    description: data.description,
    status: data.status,
    priority: data.priority,
    assignedTo: data.assignedTo,
    dueDate: data.dueDate,
  };
};

/**
 * Creates a new task.
 * @param {Object} user 
 * @param {Object} data 
 * @returns {Promise<Task>}
 */
const create = async (user, data) => {
  const allowedData = getAllowedTaskData(user, data);
  return Task.create({ ...allowedData, createdBy: user.id });
};

/**
 * Lists tasks with pagination and filtering. Users can only see their own tasks, while admins can see all tasks.
 * @param {Object} user 
 * @param {Object} query 
 * @returns {Promise<Object>}
 */
const list = async (user, query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const offset = (page - 1) * limit;

  const where = {};
  if (isUser(user)) {
    where.assignedTo = user.id;
  }
  if (query.status) where.status = query.status;
  if (query.priority) where.priority = query.priority;

  const { count, rows } = await Task.findAndCountAll({
    where,
    limit,
    offset,
    order: [['createdAt', 'DESC']],
    include: [
      { model: User, as: 'assignee', attributes: ['id', 'name', 'email'] },
      { model: User, as: 'creator', attributes: ['id', 'name', 'email'] },
    ],
  });

  return {
    total: count,
    page,
    totalPages: Math.ceil(count / limit),
    data: rows,
  };
};

/**
 * Gets a task by ID. Users can only access their own tasks, while admins can access all tasks.
 * @param {Object} user 
 * @param {string} id 
 * @returns {Promise<Task>}
 */
const getById = async (user, id) => {
  const task = await Task.findOne({
    where: { id },
    include: [
      { model: User, as: 'assignee', attributes: ['id', 'name', 'email'] },
      { model: User, as: 'creator', attributes: ['id', 'name', 'email'] },
    ],
  });
  if (!task) {
    throw Object.assign(new Error('Task not found'), {
      status: responseCode.NOT_FOUND,
    });
  }
  if (isUser(user) && task.assignedTo !== user.id) {
    throw Object.assign(new Error(responseMessage.FORBIDDEN), { status: responseCode.FORBIDDEN });
  }
  return task;
};

/**
 * Updates a task. Users can only update their own task status and description.
 * @param {Object} user 
 * @param {string} id 
 * @param {Object} data 
 * @returns {Promise<Task>}
 */
const update = async (user, id, data) => {
  const task = await getById(user, id);
  const allowedData = getAllowedTaskData(user, data, { forUpdate: true });

  await task.update(allowedData);

  return task;
};

/**
 * Removes a task. Only admins can remove tasks.
 * @param {string} id 
 * @returns {Promise<void>}
 */
const remove = async (id) => {
  const task = await Task.findByPk(id);
  if (!task) {
    throw Object.assign(new Error(responseMessage.NOT_FOUND), {
      status: responseCode.NOT_FOUND,
    });
  }
  return task.destroy();
};

module.exports = { create, list, getById, update, remove };
