const taskService = require('../services/taskService');
const responseHandle = require('../helpers/responseHandle');

/**
 * Creates a new task.
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<Object>}
 */
const create = async (req, res) => {
  try {
    const data = await taskService.create(req.user, req.body);
    return responseHandle.handleData(res, data, 201);
  } catch (error) {
    return responseHandle.handleError(res, error);
  }
};

/**
 * Lists tasks with pagination and filtering.
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<Object>}
 */
const list = async (req, res) => {
  try {
    const data = await taskService.list(req.user, req.query);
    return responseHandle.handleData(res, data);
  } catch (error) {
    return responseHandle.handleError(res, error);
  }
};

/**
 * Gets a task by ID.
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<Object>}
 */
const getById = async (req, res) => {
  try {
    const data = await taskService.getById(req.user, req.params.id);
    return responseHandle.handleData(res, data);
  } catch (error) {
    return responseHandle.handleError(res, error);
  }
};

/**
 * Updates a task by ID.
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<Object>}
 */
const update = async (req, res) => {
  try {
    const data = await taskService.update(req.user, req.params.id, req.body);
    return responseHandle.handleData(res, data);
  } catch (error) {
    return responseHandle.handleError(res, error);
  }
};

/**
 * Removes a task by ID.
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Promise<void>}
 */
const remove = async (req, res) => {
  try {
    await taskService.remove(req.params.id);
    return responseHandle.handleOK(res);
  } catch (error) {
    return responseHandle.handleError(res, error);
  }
};

module.exports = { create, list, getById, update, remove };
