require('dotenv').config({ override: true });
const app = require('./app');
const db = require('./models');

const PORT = process.env.PORT || 8000;

// Start the server after ensuring DB connection is successful
async function startServer() {
  try {
    await db.sequelize.authenticate();
    console.log('✅ MySQL Connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ DB Connection Failed:', error);
    process.exit(1);
  }
}

startServer();
