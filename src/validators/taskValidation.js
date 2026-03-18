const { z } = require('zod');

const createTaskSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  assignedTo: z.string().uuid().optional(),
  dueDate: z.string().datetime().optional(),
});

const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  assignedTo: z.string().uuid().optional(),
  dueDate: z.string().datetime().optional(),
});

const listTaskSchema = z.object({
  page: z.string().regex(/^\d+$/).optional(),
  limit: z.string().regex(/^\d+$/).optional(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
});

const taskIdParamSchema = z.object({
  id: z.string().uuid('Task ID must be a valid UUID'),
});

module.exports = { createTaskSchema, updateTaskSchema, listTaskSchema, taskIdParamSchema };