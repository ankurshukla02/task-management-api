const { Task, User } = require('../models');
const responseMessage = require('../helpers/responseMessage');
const responseCode = require('../helpers/responseCode');

const create = async (user, data) => {
  return Task.create({ ...data, createdBy: user.id });
};

const list = async (user, query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const offset = (page - 1) * limit;

  const where = {};
  if (user.role === 'USER') {
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
  if (user.role === 'USER' && task.assignedTo !== user.id) {
    throw Object.assign(new Error(responseMessage.FORBIDDEN), { status: responseCode.FORBIDDEN });
  }
  return task;
};

const update = async (user, id, data) => {
  const task = await getById(user, id);
  // USER can only update status; strip everything else
  let allowedData = {};
  if (user.role === 'USER') {
    if (data.status) allowedData.status = data.status;
    if (data.description) allowedData.description = data.description; // Consider description as comment for users to update
  } else {
    allowedData = { ...data };
  }

  await task.update(allowedData);

  return task;
};

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
