const mongoose = require('mongoose');
const DB = process.env.DATA_BASE;

const connectDB = async () => {
  const conn = await mongoose.connect(DB);

  console.log(
    `MongoDB running on ${conn.connection.host} on ${conn.connection.db.databaseName} database`
      .cyan.underline
  );
};

module.exports = connectDB;
