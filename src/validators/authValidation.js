const { z } = require('zod');

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

module.exports = {
  loginSchema,
};
