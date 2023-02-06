require('dotenv').config();
const { users } = require('./users');
const { products } = require('./product');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const connectDB = require('./db');
require('colors');

connectDB();

const importData = async () => {
  await Product.deleteMany();
  await User.deleteMany();
  const createdUsers = await User.insertMany(users);

  const adminUser = createdUsers[0]._id;

  console.log(adminUser);

  const sampleProducts = products.map((product) => {
    return { user: adminUser, ...product };
  });

  console.log(sampleProducts);

  await Product.insertMany(sampleProducts);

  console.log('Data Imported!'.green.inverse);
  process.exit();
};

if (process.argv[2] === '--i') {
  importData();
}
